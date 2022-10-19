require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (email) => {
  return jwt.sign(email, process.env.TOKEN_SECRET);
};
