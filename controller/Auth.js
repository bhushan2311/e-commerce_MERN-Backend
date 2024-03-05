const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const checkUserEmail = await User.findOne({ email: req.body.email });
    if (!checkUserEmail) {
      // if email doesnt exist then create user
      var salt = crypto.randomBytes(16);

      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) {
            return next(err);
          } else {
            const user = new User({
              ...req.body,
              password: hashedPassword,
              salt,
            });
            const doc = await user.save();

            // to create the session (will call serializer)
            req.login(sanitizeUser(doc), (err) => {   // sanitizeUser(doc) passing to serilizer 
              if (err) {
                res.status(400).json(err);
              } else {
                const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECRET_KEY);
                // console.log('-----token-------', token);      // reaching here successfully when creating user
                res.cookie("jwt", token, {                     // added token in cookie which longs for 1 hour(3600000ms) for sending it to frontend
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true,
                  })
                  .status(200)
                  .json(token);
              }
            });
          }
        }
      );
    } else {
      res.status(400).json({ message: "Email already exist!!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res.cookie("jwt", req.user.token, {            // added token in cookie which longs for 1 hour(3600000ms) for sending it to frontend
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(200)
    .json(req.user.token);     // this req.user comes from serilizer called by localStrategy
};

exports.logout = async (req, res) => {
  res.cookie("jwt", null, {            
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200)
};

exports.checkAuth = async (req, res) => {
  if(res.json){
    // console.log("Auth.js");     // jwt_payload: { id: '65ca426d9aa370aa20214410', iat: 1709135116 }
    res.status(200).json(req.user);
  }
  else{
    res.sendStatus(401);
  }
};
