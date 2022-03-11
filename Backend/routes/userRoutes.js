const auth = require("../middlewares/auth");
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  checkToken,
  updateProfile,
} = require("../controllers/userController.js");
//const loginUser = require("../controllers/loginController.js");
// loginUser,
//   logoutUser,
//   getUserDetails,
//   updateProfile,

//const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

// register -> create account x, y, z (.env) <--> jwt1 ttl -> 24hr
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(auth, getUserDetails);
router.route("/updateProfile").post(auth, updateProfile);
// router.route("/tokenIsValid").get(checkToken);

//router.route("/logout").get(logoutUser);

//router.route("/me").get(isAuthenticatedUser, getUserDetails);

//router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
