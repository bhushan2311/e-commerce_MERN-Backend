const passport = require("passport");

exports.isAuth = (req,res,done)=>{
    return passport.authenticate('jwt');
};

// removes all unnecessary user info i.e pass,salt,address,orders
exports.sanitizeUser = (user)=>{
    return {id:user.id};
}

// extractating cookie passed from frontend ()
exports.cookieExtractor = function(req){
    var token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    // console.log("common.js -- ",token);
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2E0MjZkOWFhMzcwYWEyMDIxNDQxMCIsImlhdCI6MTcwOTEzNTExNn0.upFTzCeGZuC3HmAgq7PqaakguVCx6n06uYWp35gIHnI";
    return token;
};