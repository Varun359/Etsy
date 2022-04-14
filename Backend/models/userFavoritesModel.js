const mongoose = require("mongoose");

const userFavoritesSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("userFavorites", userFavoritesSchema);
