const express = require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');

const { createProduct } = require('./controller/Product');
const productsRouters = require('./routes/Products')
const brandsRouter = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');

const server = express();

// middleware
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use(express.json());  // to parse req.body
server.use('/products', productsRouters.router);        // why .router bcz it exports as object
server.use('/brands', brandsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/users', userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',cartRouter.router);

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