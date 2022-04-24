const Cart = require("../schema/cartModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const documents = await Cart.find({
    user: mongoose.Types.ObjectId(msg.user.user_id),
  }).populate("item user");

  let data = [];
  if (documents.length) {
    for (let doc of documents) {
      data.push({
        user_id: doc.user._id,
        item_id: doc.item._id,
        item_name: doc.item.item_name,
        item_price: parseFloat(doc.item.item_price),
        item_desc: doc.item.item_desc,
        item_quantity: doc.item.item_quantity,
        quantity: doc.quantity,
        item_category: doc.item.item_category,
        item_image: doc.item.item_image ? doc.item.item_image : null,
        sales_count: doc.item.sales_count,
        shop_name: doc.user.shop_name,
        quantity: doc.quantity,
        gift: doc.gift ? doc.gift : null,
        give_gift: doc.give_gift ? doc.give_gift : false,
      });
    }
  }
  // console.log(documents);
  callback(null, data);
}

exports.handle_request = handle_request;
