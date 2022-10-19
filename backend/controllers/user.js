const db = require("../config/db");
const { validPassword } = require("../utils/check");
const { generateAccessToken } = require("../utils/token");

//Model
const User = db.user;

// user register
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await User.findOne({ where: { email: email } });
  if (isUserExist) {
    return res.status(400).json({
      message: "email already exist",
    });
  }
  const user = await User.create({ email, password });
  user.password = undefined;
  return res.status(200).json(user);
};

// user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  //Check for presence of email and password

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required",
    });
  }

  //Get user from db
  const user = await User.findOne({ where: { email: email } });

  //If user not found in db
  if (!user) {
    return res.status(400).json({
      message: "Your are not registered with us",
    });
  }
  //match the password

  const isPasswardCorrect = await validPassword(user.password, password);

  //If password does not match
  if (!isPasswardCorrect) {
    return res.status(400).json({
      message: "Email or Password does not match or exist",
    });
  }

  const token = generateAccessToken(user.email);

  return res.status(200).json({
    token,
  });
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  const user = req.user;
  console.log(user);
  res.json(user);
};
