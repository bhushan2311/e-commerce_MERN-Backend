const { User } = require("../model/User");

exports.fetchUserbyId = async (req, res)=>{
    const {id} = req.user;          // this req.user comes from serilizer called by jwtStrategy gives userId
    // console.log('------userId------',req.user);
    try {
        const user = await User.findById(id, 'name email id address orders');
        // console.log('------user------',user);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
        // console.log('------error------',error);
    }
}

exports.updateUser = async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new:true});
        // console.log('------Categories------',categories);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}