const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

//Model
const User = db.user;


//Middleware to validate user is loggedin
exports.isLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const userEmail = jwt.verify(token, process.env.TOKEN_SECRET);
      const data = await User.findOne({ where: { email: userEmail } });
      data.password = undefined;
      req.user = data;
      next();

    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};
