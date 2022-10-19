const bcrypt = require("bcryptjs");

//Min 8 letter password, with at least a symbol, upper and lower case letters and a number

exports.checkPassword = (password) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

exports.checkEmail = (email) => {
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email.toLowerCase());
};

exports.validPassword = async (userPassword, password) => {
  return await bcrypt.compare(password, userPassword);
};
