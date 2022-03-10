const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController.js");
//const loginUser = require("../controllers/loginController.js");
// loginUser,
//   logoutUser,
//   getUserDetails,
//   updateProfile,

//const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//router.route("/logout").get(logoutUser);

//router.route("/me").get(isAuthenticatedUser, getUserDetails);

//router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
