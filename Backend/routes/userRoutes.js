const auth = require("../middlewares/auth");

let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });

const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  checkToken,
  updateProfile,
} = require("../controllers/userController.js");
const mysql = require("mysql");
var connection = require("../database");
var User = require("../models/userModel");
const router = express.Router();

const multer = require("multer");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "../frontend/images");
  },
  filename: (req, file, callBack) => {
    console.log(file);
    return callBack(
      null,
      `${path
        .basename(file.originalname)
        .replace(".", "_")
        .replace(" ", "_")}_${file.fieldname}_${Date.now()}_${path.extname(
        file.originalname
      )}`
    );
  },
});
const upload = multer({
  storage: storage,
});

// register -> create account x, y, z (.env) <--> jwt1 ttl -> 24hr
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(checkAuth, getUserDetails);
router.route("/updateProfile").post(checkAuth, updateProfile);

router.route("/updateProfileImage/:user_id").post(
  auth,
  async (req, res, next) => {
    try {
      await upload.single("UserImage");
      next();
    } catch (err) {
      console.log(err);
      res.send("failed!");
    }
  },
  async (req, res, next) => {
    var userId = req.params.user_id;
    console.log(req);

    var imageName = null;
    if (req.files.length !== 0) {
      imageName = `${Date.now()}_${req.files.UserImage.name}`;
      req.files.UserImage.mv(`./images/${imageName}`);

      const doc = await User.findByIdAndUpdate(userId, {
        user_image: imageName,
      });

      res.json({
        imageName,
      });
      //         var updateImageSql =
      //             "update etsy.users set user_image = " +
      //             mysql.escape(imageName) +
      //             " where user_id = " +
      //             mysql.escape(userId);
      //         console.log(updateImageSql);
      //         connection.query(updateImageSql, (err, result) => {
      //             if (err) {
      //                 res.send("Error while connecting database");
      //             } else {
      //                 console.log(result);
      //                 res.json({
      //                     imageName,
      //                 });
      //             }
      //          });
    } else {
      res.send("please select an image");
    }
  }
);

module.exports = router;
