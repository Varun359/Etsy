const mysql = require("mysql");
var connection = require("../database");

const auth = require("../middlewares/auth");
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
router.route("/shopItems/:user_id").get(auth, getShopItemsById);
router.route("/insertItems").post(auth, insertIntoShop);
router.route("/checkShop").post(auth, checkShopName);
router.route("/changeShopName").get(auth, changeShopName);
router.route("/editShopItem/:item_id").post(auth, editShopItem);
router.route("/shopDetails").get(auth, getShopDetails);
router.route("/shopDetailsById/:user_id").get(auth, getShopDetailsById);
router.route("/createShop").post(auth, createShop);
router.route("/updateShop").post(
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
  updateShop
);

router.route("/updateShopImage").post(
  auth,
  async (req, res, next) => {
    try {
      await upload.single("ShopImage");
      next();
    } catch (err) {
      console.log(err);
      res.send("failed!");
    }
  },
  (req, res, next) => {
    var userId = req.user.user_id;
    console.log(req.files);

    var imageName = null;
    if (req.files.length !== 0) {
      imageName = `${Date.now()}_${req.files.ShopImage.name}`;
      req.files.ShopImage.mv(`./images/${imageName}`);
      var updateImageSql =
        "update etsy.users set shop_image = " +
        mysql.escape(imageName) +
        " where user_id = " +
        mysql.escape(userId);
      console.log(updateImageSql);
      connection.query(updateImageSql, (err, result) => {
        if (err) {
          res.send("Error while connecting database");
        } else {
          console.log(result);
          res.json({
            imageName,
          });
        }
      });
    } else {
      res.send("please select an image");
    }
  }
);

module.exports = router;
