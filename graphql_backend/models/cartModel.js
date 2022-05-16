const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    //default: "",
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: "Item",
    required: true,
    //default: "",
  },
  quantity: {
    type: Number,
    // default: "",
  },
  gift: {
    type: String,
    // default: "",
  },
  give_gift: {
    type: Boolean,
    // default: false,
  },
});

module.exports = mongoose.model("cart", cartSchema);
