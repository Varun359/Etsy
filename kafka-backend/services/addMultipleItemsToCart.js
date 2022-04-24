const Cart = require("../schema/cartModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside add multiple Items to the cart");
  let items = [];
  // console.log(req.body);
  for (let item of msg.body) {
    console.log(item);
    items.push({
      item: item.item_id,
      user: item.user_id,
      quantity: item.quantity,
      // price_buyed: parseFloat(item.quantity * item.item_price),
      // shop_name: item.shop_name,
      // item_name: item.item_name,
      // item_image: item.item_image,
    });
    //console.log(items);
  }
  console.log("Items in the backend", items);

  for (let item of items) {
    console.log("item ::: ", item);
    console.log("Item.item", item.item);
    const documents = await Cart.find({
      item: mongoose.Types.ObjectId(item.item),
    });
    console.log("Item.user", typeof item.item);
    if (documents.length === 0) {
      const doc = await Cart.create({
        item: mongoose.Types.ObjectId(item.item),
        user: mongoose.Types.ObjectId(item.user),
        quantity: item.quantity,
      });
    } else {
      const doc = await Cart.findOneAndUpdate(
        { item: mongoose.Types.ObjectId(item.item) },
        item
      );
    }
  }
  msg = {
    sent: "Cart Modified",
  };
  callback(null, msg);
}

exports.handle_request = handle_request;
