const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { changeUser } = require("../database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ dest: "uploads/" });

//Check shop name
exports.checkShopName = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("inside Shop Check name");

  var shopCheckSql = "select shop_name from etsy.users";

  connection.query(shopCheckSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      //res.send({ shop_name: result[0].shop_name });
      res.send(result);
    }
  });
});

//update shop name
exports.createShop = asyncErrorHandler(async (req, res) => {
  console.log("inside Create Shop");
  console.log("body", req.body);
  console.log(req.files);
  var imageName = `${Date.now()}_${req.files.shopImage.name}`;
  req.files.shopImage.mv(`../frontend/images/${imageName}`);

  var createShopSql =
    "update etsy.users set shop_name = " +
    mysql.escape(req.body.shop_name) +
    ",shop_image =" +
    mysql.escape(imageName) +
    "where user_id=" +
    mysql.escape(req.user.user_id);

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

//change shop name
exports.changeShopName = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("inside change shop name");
  console.log(req.params);
  var changeShopSql =
    "update etsy.users set shop_name = " +
    mysql.escape(req.body.shop_name) +
    " where user_id =" +
    mysql.escape(req.user.user_id);
  console.log(changeShopSql);
  connection.query(changeShopSql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Shop name changed");
    }
  });
});

//get items from the shop
exports.getShopItems = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getItemsSql =
    "select distinct item_id,item_name,item_price,item_desc,item_quantity,item_category,item_image,shop_name,sales_count from etsy.items,etsy.users where etsy.users.user_id=" +
    mysql.escape(req.user.user_id);

  console.log("inside Get Shop Items page");
  console.log(getItemsSql);
  connection.query(getItemsSql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error while connecting database");
    } else {
      console.log(result);
      //    res.send({ shop_name: result[0].shop_name });
      res.send(result);
    }
  });
});

//add items to the shop
exports.insertIntoShop = asyncErrorHandler(async (req, res) => {
  console.log("inside insert into shop page");
  console.log(req);
  var insertItemsSql =
    "insert into etsy.items (item_name,item_category, item_desc, item_price,item_quantity,user_id) values (" +
    mysql.escape(req.body.shopName) +
    "," +
    mysql.escape(req.body.category) +
    "," +
    mysql.escape(req.body.itemDesc) +
    "," +
    mysql.escape(req.body.price) +
    "," +
    mysql.escape(req.body.quantity) +
    "," +
    mysql.escape(req.user.user_id) +
    ")";
  // where user_id = " +
  // mysql.escape(req.user.user_id);

  console.log(insertItemsSql);
  connection.query(insertItemsSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      //    res.send({ shop_name: result[0].shop_name });
      res.send("Item added to the shop successfully");
    }
  });
});

//edit an item in shop
exports.editShopItem = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("inside change shop name");
  console.log(req.params);
  var editShopItemSql =
    "update etsy.items set item_name = " +
    mysql.escape(req.body.item_name) +
    ",item_category=" +
    mysql.escape(req.body.item_category) +
    ",item_desc=" +
    mysql.escape(req.body.item_desc) +
    ",item_price=" +
    mysql.escape(req.body.item_price) +
    ",item_quantity =" +
    mysql.escape(req.body.item_quantity) +
    " where item_id=" +
    mysql.escape(req.params.item_id);
  //  +
  // " and user_id=" +
  // mysql.escape(req.user.user_id);

  console.log(editShopItemSql);
  connection.query(editShopItemSql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Item updated");
    }
  });
});
