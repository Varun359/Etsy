const userFavorites = require("../schema/userFavoritesModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside remove Item from favorites");
  const doc = await userFavorites.remove({
    user: mongoose.Types.ObjectId(msg.user.user_id),
    item: mongoose.Types.ObjectId(msg.params.item_id),
  });
  console.log("Item Removed from favorites");

  data = {
    msg: "Item Removed from favories",
  };
  callback(null, data);
}

exports.handle_request = handle_request;
