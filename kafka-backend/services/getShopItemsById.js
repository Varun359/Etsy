const User = require("../schema/userModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log(msg.params.user_id);
  const doc = await Item.find({
    user: mongoose.Types.ObjectId(msg.params.user_id),
  }).populate("user");
  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        _id: item._id,
        item_name: item.item_name,
        item_price: parseFloat(item.item_price),
        item_desc: item.item_desc,
        item_quantity: item.item_quantity,
        item_category: item.item_category,
        item_image: item.item_image ? item.item_image : null,
        shop_name: item.user.shop_name,
      });
    }
  }
  console.log(doc);
  callback(null, data);
}

exports.handle_request = handle_request;
