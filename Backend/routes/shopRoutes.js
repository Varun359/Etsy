const mysql = require("mysql");
var connection = require("../database");

const auth = require("../middlewares/auth");
const express = require("express");
const {
  checkShopName,
  createShop,
} = require("../controllers/shopController.js");

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

// const upload = multer({ dest: "uploads/" });
// const upload = multer({ storage: storage }).single("pro");

const router = express.Router();

router.route("/checkShop").get(auth, checkShopName);
router.route("/createShop").post(
  auth,
  async (req, res, next) => {
    try {
      await upload.single("shopImage");
      next();
    } catch (err) {
      console.log(err);
      res.send("failed!");
    }
  },
  createShop
);

module.exports = router;
