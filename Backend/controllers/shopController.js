const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Check shop name
exports.checkShopName = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("inside Shop Check name");

  var shopCheckSql =
    "select shop_name from etsy.shops where user_id=" +
    mysql.escape(req.user.user_id);

  connection.query(shopCheckSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send({ shop_name: result[0].shop_name });
    }
  });
});

//update shop name
exports.createShop = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("body", req.body);
  console.log("inside Create Shop");
  console.log(req.file);
  var createShopSql =
    "insert into etsy.shops (shop_name,user_id) values (" +
    mysql.escape(req.body.shop_name) +
    "," +
    mysql.escape(req.user.user_id) +
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
