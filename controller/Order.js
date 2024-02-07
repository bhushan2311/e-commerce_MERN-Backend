const { Order } = require("../model/Order");


exports.createOrder = async (req, res)=>{
    const order = new Order(req.body);
    try {
        const doc = await order.save();
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json(error);
    }
}

// 'http://localhost:8080/orders?user='
exports.fetchOrdersByUser = async (req,res)=>{
    const {user} = req.query;           // yeilds user id of which is passed in url
    // console.log('ha wala user---',user);
    try {
        const order = await Order.find({user:user});
        // console.log('------order------',order);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}


// ------ Not necessary -------
/*
exports.deleteOrder = async (req, res)=>{
    const {id} = req.params;
    try {
        const doc = await Cart.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updateOrder = async (req,res)=>{
    const {id} = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(id,req.body,{
            new:true
        })
        const result = await cart.populate('product')
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
*/