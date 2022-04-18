const { default: mongoose } = require("mongoose");
const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Cart = require("../models/cartModel");
//add item to cart
exports.addItemToCart = asyncErrorHandler(async (req, res) => {
  console.log("add to the cart");
  const documents = await Cart.find({
    item: mongoose.Types.ObjectId(req.body.item_id),
  });
  if (documents.length === 0) {
    const doc = await Cart.create({
      item: mongoose.Types.ObjectId(req.body.item_id),
      user: mongoose.Types.ObjectId(req.user.user_id),
      quantity: req.body.quantity,
    });
  }
  res.send(documents);
});

exports.addMultipleItemsToCart = asyncErrorHandler(async (req, res) => {
  console.log("Inside add multiple Items to the cart");
  let items = [];
  // console.log(req.body);
  for (let item of req.body) {
    console.log(item);
    items.push({
      item: item.item_id,
      user: item.user_id,
      quantity: item.quantity,
      // price_buyed: parseFloat(item.quantity * item.item_price),
      // shop_name: item.shop_name,
      // item_name: item.item_name,
      // item_image: item.item_image,
    });
    //console.log(items);
  }
  console.log("Items in the backend", items);

  for (let item of items) {
    console.log("item ::: ", item);
    console.log("Item.item", item.item);
    const documents = await Cart.find({
      item: mongoose.Types.ObjectId(item.item),
    });
    console.log("Item.user", typeof item.item);
    if (documents.length === 0) {
      const doc = await Cart.create({
        item: mongoose.Types.ObjectId(item.item),
        user: mongoose.Types.ObjectId(item.user),
        quantity: item.quantity,
      });
    } else {
      const doc = await Cart.findOneAndUpdate(
        { item: mongoose.Types.ObjectId(item.item) },
        item
      );
    }
  }
  res.send("Cart Modified");
});

//Delete Cart Items
exports.deleteCartItems = asyncErrorHandler(async (req, res) => {
  let deletedCart = await Cart.deleteMany({
    user: mongoose.Types.ObjectId(req.user.user_id),
  });
  res.send("items deleted from the cart");
});
//get all cart items
exports.getCartItems = asyncErrorHandler(async (req, res) => {
  const documents = await Cart.find({
    user: mongoose.Types.ObjectId(req.user.user_id),
  }).populate("item user");

  let data = [];
  if (documents.length) {
    for (let doc of documents) {
      data.push({
        user_id: doc.user._id,
        item_id: doc.item._id,
        item_name: doc.item.item_name,
        item_price: parseFloat(doc.item.item_price),
        item_desc: doc.item.item_desc,
        item_quantity: doc.item.item_quantity,
        quantity: doc.quantity,
        item_category: doc.item.item_category,
        item_image: doc.item.item_image ? doc.item.item_image : null,
        sales_count: doc.item.sales_count,
        shop_name: doc.user.shop_name,
        quantity: doc.quantity,
        gift: doc.gift ? doc.gift : null,
        give_gift: doc.give_gift ? doc.give_gift : false,
      });
    }
  }
  console.log(documents);
  res.send(data);
});
