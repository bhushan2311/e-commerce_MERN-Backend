const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const checkUserEmail = await User.findOne({ email: req.body.email });
    if (!checkUserEmail) {
      const user = new User(req.body);
      const doc = await user.save();
      // console.log('------Categories------',categories);
      res.status(200).json({id:doc.id});
    }
    else{
        res.status(400).json({message:"Email already exist!!"});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email }
    );
    
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
    } 
    else if (user.password === req.body.password) {

      res.status(201).json({id:user.id, email:user.email});
      // console.log("auth user here--",user);
    } 
    else {
      res.status(400).json({ message: "invalid password" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
