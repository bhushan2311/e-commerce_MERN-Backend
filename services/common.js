const passport = require("passport");

exports.isAuth = (req,res,done)=>{
    return passport.authenticate('jwt');
};

// removes all unnecessary user info i.e pass,salt,address,orders
exports.sanitizeUser = (user)=>{
    return {id:user.id};
}