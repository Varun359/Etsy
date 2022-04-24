const userFavorites = require("../schema/userFavoritesModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside add item to favorites");
  const doc = await userFavorites.create({
    user: mongoose.Types.ObjectId(msg.user.user_id),
    item: mongoose.Types.ObjectId(msg.params.item_id),
  });
  console.log("Added Items to favorites");

  data = {
    msg: "Added Items to favoritessss",
  };
  callback(null, data);
}

exports.handle_request = handle_request;
