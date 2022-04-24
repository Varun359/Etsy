const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const doc = await Item.findById(msg.params.item_id).populate("user");
  console.log(doc);
  let data = {
    item_id: doc._id,
    item_name: doc.item_name,
    item_price: parseFloat(doc.item_price),
    item_desc: doc.item_desc,
    item_quantity: doc.item_quantity,
    item_category: doc.item_category,
    item_image: doc.item_image ? doc.item_image : null,
    sales_count: doc.sales_count,
    shop_name: doc.user.shop_name,
  };

  callback(null, data);
}

exports.handle_request = handle_request;
