exports.isAuth = (req,res,done)=>{
    if(req.user){
        done();     // if user is authenticated then go next url which is being navigated after login successfully
    }
    else{
        res.send(401);
    }
};

// removes all unnecessary user info i.e pass,salt,address,orders
exports.sanitizeUser = (user)=>{
    return {id:user.id};
}