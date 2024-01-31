// Controller are the actions on model (basically the crud operations are performed here)
const {Product} = require("../model/Product");

exports.createProduct = async (req,res)=>{
    // this product we have to get from API body
    const product = new Product(req.body);
    console.log(product);
    try {
        const doc = await product.save();
        res.status(201).json(doc)
        console.log(doc);

    } catch (error) {
        res.status(400).json(error)
        console.log("create product error", error);
    }
}