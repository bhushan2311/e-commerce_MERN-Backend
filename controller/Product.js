// Controller are the actions on model (basically the crud operations are performed here)
const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  console.log(product);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
    // console.log(doc);
  } catch (error) {
    res.status(400).json(error);
    console.log("create product error", error);
  }
};

exports.fetchProductById = async (req,res)=>{
    // console.log(req.params);
    const {id} = req.params;
    // console.log("----------",id);
    try {
        const productbyId = await Product.findById(id); 
        console.log(productbyId);
        res.status(200).json(productbyId);
    } catch (error) {
        res.status(400).json(error);
    }
}

//  API Key after filter =>
// http://localhost:8080/products?category=smartphones&_sort=rating&_order=desc&_page=1&_limit=10

exports.fetchAllProducts = async (req, res) => {
  // filter = {category: ["smartphone", "Laptops"], brand:["apple"]}
  // sort = {_sort:"price", _order:"asc"}
  // pagination = {_page:1, _limit:10}    // _page=1&_limit=10

  let queryy = Product.find({});
  // query is the obj inside req obj which contains parameters in url e.g above url has param like category, _sort, _order
//   console.log("------", req.query); // output-{category: 'smartphones', _sort:'rating', _order:'desc', _page:'1', _limit:'10}

let totalProductsQuery = Product.find({});

  if (req.query.category) {
    queryy = queryy.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    queryy = queryy.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    queryy = queryy.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log({totalDocs});

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    queryy = queryy.skip(pageSize * (page - 1)).limit(pageSize);
  }

  
  try {
    const docs = await queryy.exec();
    res.set('X-Total-Count', totalDocs);        // as we are expecting in frontend to send total count in 'X-Total-Count' header.
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

/*
The skip() and limit() methods in Mongoose are used to specify the number of documents to skip and the number of documents to return, respectively. 
When a query is made, the skip() method will skip the first n documents specified and return the remaining documents. 
The limit() method will then return the first n documents from the remaining documents. 

- queryy.skip(pageSize * (page - 1)): 
This part of the code calculates the number of documents to skip based on the current page and the page size.
It skips (page - 1) * pageSize documents to get to the desired page. For example, if _page is 2 and _limit is 10, 
it skips 10 documents (results) to get to the second page.

- .limit(pageSize): 
This part limits the number of documents returned in the query to the specified page size. 
In our example, if _limit is 10, it limits the query results to 10 documents per page.
*/
