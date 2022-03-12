const mysql = require("mysql");
var connection = require("../database");

const auth = require("../middlewares/auth");
const express = require("express");
const {
  checkShopName,
  createShop,
} = require("../controllers/shopController.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/checkShop").get(auth, checkShopName);
//router.route("/createShop").post(auth, upload.single("pro"), createShop);

router.post("/createShop", upload.single("pro"), (req, res) => {
  console.log(req.user);
  console.log("body", req.body);
  console.log("inside Create Shop");
  console.log(req.file);
  var createShopSql =
    "insert into etsy.shops (shop_name,user_id) values (" +
    mysql.escape(req.body.shop_name) +
    "," +
    mysql.escape(req.body.user_id) +
    ")";
  console.log(createShopSql);
  connection.query(createShopSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("New Shop created");
    }
  });
});

module.exports = router;
