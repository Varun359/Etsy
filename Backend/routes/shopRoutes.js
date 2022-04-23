const mysql = require("mysql");
var connection = require("../database");
const User = require("../models/userModel");
const auth = require("../middlewares/auth");

let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });

const express = require("express");
const {
  checkShopName,
  updateShop,
  changeShopName,
  getShopItems,
  insertIntoShop,
  editShopItem,
  getShopDetails,
  createShop,
  getShopItemsById,
  getShopDetailsById,
} = require("../controllers/shopController.js");

const multer = require("multer");
const { get } = require("./itemRoutes");
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

// const upload = multer({ dest: "uploads/" });
// const upload = multer({ storage: storage }).single("pro");

const router = express.Router();
//get shop items by shop id.
router.route("/shopItems").get(checkAuth, getShopItems);
router.route("/shopItems/:user_id").get(checkAuth, getShopItemsById);
router.route("/insertItems").post(checkAuth, insertIntoShop);
router.route("/checkShop").post(checkAuth, checkShopName);
router.route("/changeShopName").get(checkAuth, changeShopName);
router.route("/editShopItem/:item_id").post(checkAuth, editShopItem);
router.route("/shopDetails").get(checkAuth, getShopDetails);
router.route("/shopDetailsById/:user_id").get(checkAuth, getShopDetailsById);
router.route("/createShop").post(checkAuth, createShop);
// router.route("/updateShop").post(
//   checkAuth,
//   async (req, res, next) => {
//     try {
//       await upload.single("shopImage");
//       next();
//     } catch (err) {
//       console.log(err);
//       res.send("failed!");
//     }
//   },
//   updateShop
// );

router.route("/updateShopImage").post(checkAuth, async (req, res, next) => {
  const newData = {
    shop_image: req.body.imageUrl,
  };
  console.log(req.body.imageUrl);
  await User.findByIdAndUpdate(req.user.user_id, newData);

  res.send(newData);
});

module.exports = router;
