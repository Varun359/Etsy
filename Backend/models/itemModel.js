const { Double, Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
  },
  item_desc: {
    type: String,
  },
  item_price: {
    type: String,
  },
  item_category: {
    type: String,
  },
  item_quantity: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  item_image: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);
