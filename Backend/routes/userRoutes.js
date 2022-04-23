const auth = require("../middlewares/auth");

let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });
//const uploadS3 = require("../multer/saveImages");
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

//const multer = require("multer");
const { default: mongoose } = require("mongoose");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accesskeyId: "AKIAZSRVTBBNQ4X6YQX7",
  secretAccessKey: "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",
  region: "us-west-1",
});

const uploadS3 = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      acl: "public-read",
      metadata: function (req, file, cb) {
        console.log("hi");
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log("hi");
        console.log(`${Date.now()}_${req.files.UserImage.name}`);
        cb(null, `${Date.now()}_${req.files.UserImage.name}`);
      },
    }),
  });

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
  // async (req, res, next) => {
  //   try {
  //     await upload.single("UserImage");
  //     next();
  //   } catch (err) {
  //     console.log(err);
  //     res.send("failed!");
  //   }
  // },
  async (req, res, next) => {
    var userId = req.params.user_id;
    console.log(req.files.UserImage.name);

    var imageName = null;
    if (req.files.length !== 0) {
      imageName = `${Date.now()}_${req.files.UserImage.name}`;

      console.log(imageName);

      req.files.UserImage.mv(`./images/${imageName}`);

      const doc = await User.findByIdAndUpdate(userId, {
        user_image: imageName,
      });

      res.json({
        imageName,
      });
    } else {
      res.send("please select an image");
    }
  }
);

router.route("/uploadUserImage/:user_id").post(auth, async (req, res, next) => {
  const newData = {
    user_image: req.body.imageUrl,
  };
  console.log(req.body.imageUrl);
  await User.findByIdAndUpdate(req.params.user_id, newData);

  // res.status(200).json({
  //   success: true,
  // });
  res.send(newData);
});

module.exports = router;
