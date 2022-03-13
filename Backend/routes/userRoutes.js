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

const multer = require("multer");

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
router.route("/profile").get(auth, getUserDetails);
router.route("/updateProfile").post(
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
  updateProfile
);

module.exports = router;
