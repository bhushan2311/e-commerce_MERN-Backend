const express = require('express');
const { mongoose } = require('mongoose');
const { createProduct } = require('./controller/Product');
const productsRouters = require('./routes/Products')
const brandsRouter = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories');

const server = express();
const cors = require('cors');

// middleware
server.use(cors());
server.use(express.json());  // to parse req.body
server.use('/products', productsRouters.router);        // why .router bcz it exports as object
server.use('/brands', brandsRouter.router);
server.use('/categories', categoriesRouter.router);

async function main(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }
}
main();
server.get("/",(req,res)=>{
    res.json({status:"success"});
})






server.listen(8080, ()=>{
    console.log("Server started");
})