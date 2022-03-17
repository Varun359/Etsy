const mysql = require("mysql");
var connection = require("../database");

const auth = require("../middlewares/auth");
const express = require("express");
const {
  checkShopName,
  createShop,
  changeShopName,
  getShopItems,
  insertIntoShop,
  editShopItem,
} = require("../controllers/shopController.js");

const multer = require("multer");
const { get } = require("./itemRoutes");

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
//get shop items by shop id.
router.route("/shopItems").get(auth, getShopItems);
router.route("/insertItems").post(auth, insertIntoShop);
router.route("/checkShop").get(auth, checkShopName);
router.route("/changeShopName").get(auth, changeShopName);
router.route("/editShopItem/:item_id").get(auth, editShopItem);
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
