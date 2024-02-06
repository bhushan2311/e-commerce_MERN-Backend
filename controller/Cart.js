const { Cart } = require("../model/Cart");

// 'http://localhost:8080/cart?user='
exports.fetchCartByUser = async (req,res)=>{
    const {user} = req.query;           // yeilds user id of which is passed in url
    // console.log('ha wala user---',user);
    try {
        const cartItem = await Cart.find({user:user}).populate('product');
        // console.log('------cartItem------',cartItem);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.addToCart = async (req, res)=>{
    const cart = new Cart(req.body);
    try {
        const doc = await cart.save();
        const result = await doc.populate('product')
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}

