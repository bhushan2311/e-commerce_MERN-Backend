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
// var crypto = require('crypto');

// middleware
server.use(session({
    secret: "keyboard cat",
    resave: false,      // dont have session if modified
    saveUninitialized: false,   //  dont create session until something stored
  })
);
server.use(passport.authenticate('session'));
// server.use(passport.initialize());

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", productsRouters.router); // why .router bcz it exports as object
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

// Password Strategies 'local'
passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const user = await User.findOne({ email: username });
            if (!user) {
              return done(null, false, { message: "Invalid email" });
            } else if (user.password === password) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Invalid password" });
            }
          } catch (error) {
            return done(error); // Pass the error to Passport
          }
    })
  );
  
  // this creates session variable req.user on being called from callacks
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, { id: user.id});
    });
  });
  
  // this changes session variable req.user on being called from authorised request
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
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
