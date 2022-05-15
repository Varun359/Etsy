const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const { put } = require("../routes/userRoutes");
const Order = require("../models/orderModel");
const Purchase = require("../models/purchasesModel");
const { default: mongoose } = require("mongoose");
const Item = require("../models/itemModel");
const Cart = require("../models/cartModel");
exports.purchasingItems = asyncErrorHandler(async (req, res) => {
  console.log(req.body);
  const doc1 = await Order.create({ date: req.body.dateOfPurchase });

  console.log("req.body.itemsssss console", req.body.items);
  if (doc1) {
    let items = [];
    for (let item of req.body.items) {
      items.push({
        order: doc1._id,
        item: mongoose.Types.ObjectId(item.item_id),
        user: mongoose.Types.ObjectId(req.user.user_id),
        quantity_buyed: item.quantity,
        gift: item.gift ? item.gift : null,
        price_buyed: parseFloat(item.quantity * item.item_price),
        shop_name: item.shop_name,
        item_name: item.item_name,
        item_image: item.item_image,
      });
    }
    let purchaseDocuments = await Purchase.insertMany(items);

    //Removing quantity purchased from the items.
    for (let item of req.body.items) {
      let itemDocument = await Item.find({
        _id: mongoose.Types.ObjectId(item.item_id),
      });
      console.log(itemDocument);
      // if (itemDocument) {
      itemDocument[0].item_quantity =
        itemDocument[0].item_quantity - parseInt(item.quantity);
      await itemDocument[0].save();
      // }
    }

    let deletedCart = await Cart.deleteMany({
      user: mongoose.Types.ObjectId(req.user.user_id),
    });
    res.send("success");
  }
});

//get previous orders
exports.getPreviousOrders = asyncErrorHandler(async (req, res) => {
  var doc = await Purchase.find({
    user: mongoose.Types.ObjectId(req.user.user_id),
  })
    .populate("order")
    .lean();

  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        item_id: item.item,
        user_id: item.user,
        order_id: item.order._id,
        quantity_buyed: item.quantity_buyed,
        gift: item.gift,
        price_buyed: parseFloat(item.price_buyed),
        item_name: item.item_name,
        item_image: item.item_image,
        date: item.order.date,
        shop_name: item.shop_name,
      });
    }
  }
  console.log(doc);
  res.send(data);
});
