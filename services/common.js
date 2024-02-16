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
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2E0MjZkOWFhMzcwYWEyMDIxNDQxMCIsImlhdCI6MTcwODA5MjUzMn0.uW9SmCUpUcak8brOp6AHB7xd-2Dh2e7p4wrd_OXE6t8";
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2E0ZjA0NjgwNWM0MzU1ZjMwMTA0YiIsImlhdCI6MTcwODA5Mjk4MH0.ZglJaMswr4gdzcOzfllX6mhWSFfbgb6-GvDmAvCO0Pc";     // hardcoded for now
    return token;
};