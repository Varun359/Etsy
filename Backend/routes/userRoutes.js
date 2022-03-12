const auth = require("../middlewares/auth");
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  checkToken,
  updateProfile,
} = require("../controllers/userController.js");

const router = express.Router();

// register -> create account x, y, z (.env) <--> jwt1 ttl -> 24hr
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(auth, getUserDetails);
router.route("/updateProfile").post(auth, updateProfile);

module.exports = router;
