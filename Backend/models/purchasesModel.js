const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
    required: true,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  quantity_buyed: {
    type: Number,
  },
  price_buyed: {
    type: String,
  },
  item_name: {
    type: String,
  },
  item_image: {
    type: String,
  },
  shop_name: {
    type: String,
  },
});

module.exports = mongoose.model("purchase", purchaseSchema);
