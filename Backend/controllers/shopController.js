const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { changeUser } = require("../database");
const User = require("../models/userModel");
const Item = require("../models/itemModel");
const { default: mongoose } = require("mongoose");
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
  const is_occupied = await User.findOne({ shop_name: req.body.shop_name });
  let check = false;
  if (is_occupied) check = true;
  res.send(check);
});

//update shop imame
exports.updateShop = asyncErrorHandler(async (req, res) => {
  console.log("entered in shop image");
  var imageName = `${Date.now()}_${req.files.shopImage.name}`;
  req.files.shopImage.mv(`../Backend/images/${imageName}`);

  const doc = await User.findByIdAndUpdate(req.user.user_id, {
    shop_image: imageName,
  });
  console.log(doc);
  res.send(doc);
});

//change shop name
exports.changeShopName = asyncErrorHandler(async (req, res) => {
  const doc = await User.findByIdAndUpdate(req.user.user_id, {
    shop_name: req.body.shop_name,
  });
  console.log(doc);
  res.send(doc);
});

//get items from the shop
exports.getShopItems = asyncErrorHandler(async (req, res) => {
  const doc = await Item.find({
    user: mongoose.Types.ObjectId(req.user.user_id),
  }).populate("user");
  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        _id: item._id,
        item_name: item.item_name,
        item_price: parseFloat(item.item_price),
        item_desc: item.item_desc,
        item_quantity: item.item_quantity,
        item_category: item.item_category,
        item_image: item.item_image ? item.item_image : null,
        shop_name: item.user.shop_name,
      });
    }
  }
  console.log(doc);
  res.send(data);
});

//get items from the shop by Id with params
exports.getShopItemsById = asyncErrorHandler(async (req, res) => {
  const doc = await Item.find({
    user: mongoose.Types.ObjectId(req.params.user_id),
  }).populate("user");
  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        _id: item._id,
        item_name: item.item_name,
        item_price: parseFloat(item.item_price),
        item_desc: item.item_desc,
        item_quantity: item.item_quantity,
        item_category: item.item_category,
        item_image: item.item_image ? item.item_image : null,
        shop_name: item.user.shop_name,
      });
    }
  }
  console.log(doc);
  res.send(data);
});

//add items to the shop
exports.insertIntoShop = asyncErrorHandler(async (req, res) => {
  console.log(req.user.user_id);
  const doc = await Item.create({
    item_name: req.body.itemName,
    item_category: req.body.category,
    item_desc: req.body.itemDesc,
    item_price: req.body.price,
    item_quantity: req.body.quantity,
    user: mongoose.Types.ObjectId(req.user.user_id),
  });

  res.send("Item added to the shop successfully");
});

//edit an item in shop
exports.editShopItem = asyncErrorHandler(async (req, res) => {
  console.log("req.user");
  //console.log(req.query);
  console.log(req.params.item_id);
  const doc = await Item.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.item_id),
    {
      item_name: req.body.item_name,
      item_category: req.body.item_category,
      item_desc: req.body.item_desc,
      item_price: req.body.item_price,
      item_quantity: req.body.item_quantity,
    }
  );
  console.log(doc);
  res.send(doc);
});

//get shop details by Id
exports.getShopDetails = asyncErrorHandler(async (req, res) => {
  const doc = await User.find({ _id: req.user.user_id });
  console.log(doc);
  let data = {
    shop_name: doc[0].shop_name ? doc[0].shop_name : null,
    shop_image: doc[0].shop_image ? doc[0].shop_image : null,
    user_image: doc[0].user_image ? doc[0].user_image : null,
  };
  res.send(data);
});

//get shop details by id
exports.getShopDetailsById = asyncErrorHandler(async (req, res) => {
  const doc = await User.find({
    _id: mongoose.Types.ObjectId(req.params.user_id),
  });

  doc ? res.send(doc) : res.send("No Document");
});

//create shop
exports.createShop = asyncErrorHandler(async (req, res) => {
  console.log("Inside Create Shop", req.user.user_id);
  const doc = await User.findByIdAndUpdate(req.user.user_id, {
    shop_name: req.body.shop_name,
  });
  res.send(doc);
});
