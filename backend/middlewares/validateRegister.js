const { checkPassword, checkEmail } = require("../utils/check");

const validateRegister = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Please enter a email",
    });
  }

  if (!checkEmail(req.body.email)) {
    return res.status(400).send({
      message: "Please enter valid email address",
    });
  }

  //Min 8 letter password, with at least a symbol, upper and lower case letters and a number
  if (!req.body.password) {
    return res.status(400).send({
      message: "Please enter a password",
    });
  }
  // password (repeat) does not match
  if (!checkPassword(req.body.password)) {
    return res.status(400).send({
      message: "Please enter valid password with @, small letter and capital letter",
    });
  }
  next();
};

module.exports = validateRegister;
