const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");

const { createProduct } = require("./controller/Product");
const productsRouters = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const { User } = require("./model/User");

const server = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var crypto = require("crypto");
const { isAuth, sanitizeUser } = require("./services/common");

const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRET_KEY = "SECRETKEY";
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

// --------- middleware ------------
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // dont have session if modified
    saveUninitialized: false, //  dont create session until something stored
  })
);
server.use(passport.authenticate("session"));
// server.use(passport.initialize());

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body

// isAuth is middleware function similar as JWT token
server.use("/products", isAuth(), productsRouters.router); // why .router bcz it exports as object
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), orderRouter.router);

// ----------------------

// Password Strategies 'local'
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ email: username }).exec();
        // console.log({user});
        if (!user) {
          return done(null, false, { message: "Invalid email" });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            done(null, {token}); // this will send to serelizer
          }
        );
      } catch (error) {
        return done(error); // Pass the error to Passport
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      console.log("jwt_payload:", jwt_payload);         // jwt_payload.sub is undefined here
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serilizer--", { user }); // this user came from localStrategy or jwtStrategy after success based on which strategy calls serilizer
  process.nextTick(function () {
    return cb(null, { id: user.id }); // this object passes to de-serilizer
  });
});

// this changes session variable req.user on being called from authorised request. Note: deserilizer only runs after serilizer creates session variable.
passport.deserializeUser(function (user, cb) {
  // the user here is object got from serilizer
  console.log("de-serilizer --", { user });
  process.nextTick(function () {
    return cb(null, user); //
  });
});

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}
main();
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("Server started");
});
