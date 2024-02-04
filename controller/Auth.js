const { User } = require("../model/User");

exports.createUser = async (req, res)=>{
    const user = new User(req.body);
    try {
        const doc = await user.save();
        // console.log('------Categories------',categories);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}