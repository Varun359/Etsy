const Cart = require("../schema/cartModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("add to the cart");
  const documents = await Cart.find({
    item: mongoose.Types.ObjectId(msg.body.item_id),
  });
  if (documents.length === 0) {
    const doc = await Cart.create({
      item: mongoose.Types.ObjectId(msg.body.item_id),
      user: mongoose.Types.ObjectId(msg.user.user_id),
      quantity: msg.body.quantity,
    });
  }

  callback(null, "Item added to the cart");
}

exports.handle_request = handle_request;
