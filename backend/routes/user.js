const express = require("express");
const { login, signup, getUserProfile } = require("../controllers/user");
const validateRegister = require("../middlewares/validateRegister");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const router = express.Router();

router.route("/auth/user/signup").post(validateRegister, signup);
router.route("/auth/user/login").post(login);
router.route("/user/me").get(isLoggedIn, getUserProfile);

module.exports = router;
