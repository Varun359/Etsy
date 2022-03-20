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
      console.log(result.length);
      var check = false;
      result.forEach((shop) => {
        console.log(shop.shop_name);
        if (shop.shop_name === req.body.shop_name) {
          check = true;
        }
      });
      res.send(check);
      //res.send({ shop_name: result[0].shop_name });
    }
  });
});

//update shop name
exports.updateShop = asyncErrorHandler(async (req, res) => {
  console.log("inside Create Shop");
  console.log("body", req.body);
  console.log(req.files);
  var imageName = `${Date.now()}_${req.files.shopImage.name}`;
  req.files.shopImage.mv(`../frontend/images/${imageName}`);

  var updateShopSql =
    "update etsy.users set shop_image = " +
    mysql.escape(imageName) +
    "where user_id=" +
    mysql.escape(req.user.user_id);

  console.log(updateShopSql);
  connection.query(updateShopSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Shop Updated");
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
    "select distinct item_id,item_name,item_price,item_desc,item_quantity,item_category,item_image,shop_name from etsy.items,etsy.users where etsy.users.user_id=etsy.items.user_id and etsy.users.user_id=" +
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

//get items from the shop by Id with params
exports.getShopItemsById = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getItemsSql =
    "select distinct item_id,item_name,item_price,item_desc,item_quantity,item_category,item_image,shop_name from etsy.items,etsy.users where etsy.users.user_id=etsy.items.user_id and etsy.users.user_id=" +
    mysql.escape(req.params.user_id);

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
  console.log(req.body);
  var insertItemsSql =
    "insert into etsy.items (item_name,item_category, item_desc, item_price,item_quantity,user_id) values (" +
    mysql.escape(req.body.itemName) +
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

//get shop details by Id
exports.getShopDetails = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getShopDetailsSql =
    "select shop_name,shop_image,user_image from etsy.users where etsy.users.user_id=" +
    mysql.escape(req.user.user_id);

  console.log("inside Get Shop details by Id");
  console.log(getShopDetailsSql);
  connection.query(getShopDetailsSql, (err, result) => {
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

//get shop details by id
exports.getShopDetailsById = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getShopDetailsByIdSql =
    "select * from etsy.users where etsy.users.user_id=" +
    mysql.escape(req.params.user_id);

  console.log("inside Get Shop details by Id");
  console.log(getShopDetailsByIdSql);
  connection.query(getShopDetailsByIdSql, (err, result) => {
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
//create shop
exports.createShop = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getShopDetailsSql =
    "update etsy.users set shop_name=" +
    mysql.escape(req.body.shop_name) +
    "where etsy.users.user_id=" +
    mysql.escape(req.user.user_id);

  console.log("inside Get Shop details by Id");
  console.log(getShopDetailsSql);
  connection.query(getShopDetailsSql, (err, result) => {
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
