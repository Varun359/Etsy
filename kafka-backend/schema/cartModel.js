const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
  },
  gift: {
    type: String,
  },
  give_gift: {
    type: Boolean,
  },
});

module.exports = mongoose.model("cart", cartSchema);
