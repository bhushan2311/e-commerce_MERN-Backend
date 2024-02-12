const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");

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
            req.login(sanitizeUser(doc), (err) => {
              if (err) {
                res.status(400).json(err);
              } else {
                // console.log('------------',categories);
                res.status(200).json(sanitizeUser(doc));
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
  res.json(req.user);
};

exports.checkUser = async (req, res) => {
  res.json(req.user);
};
