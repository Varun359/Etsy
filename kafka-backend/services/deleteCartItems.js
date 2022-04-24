const Cart = require("../schema/cartModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  let deletedCart = await Cart.deleteMany({
    user: mongoose.Types.ObjectId(msg.user.user_id),
  });
  callback(null, "items deleted from the cart");
}

exports.handle_request = handle_request;
