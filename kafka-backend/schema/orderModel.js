const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: {
    type: String,
  },
});
module.exports = mongoose.model("Order", OrderSchema);
