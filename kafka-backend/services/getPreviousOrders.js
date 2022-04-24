const Order = require("../schema/orderModel");
const Purchase = require("../schema/purchasesModel");
const Cart = require("../schema/cartModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  var doc = await Purchase.find({
    user: mongoose.Types.ObjectId(msg.user.user_id),
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
        price_buyed: parseFloat(item.price_buyed),
        gift: item.gift,
        item_name: item.item_name,
        item_image: item.item_image,
        date: item.order.date,
        shop_name: item.shop_name,
      });
    }
  }
  console.log(doc);

  callback(null, data);
}

exports.handle_request = handle_request;
