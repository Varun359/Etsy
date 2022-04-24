var Item = require("../schema/itemModel");

async function handle_request(msg, callback) {
  console.log("inside get all items");
  const doc = await Item.find().populate("user");
  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        user_id: item.user._id,
        item_name: item.item_name,
        item_price: parseFloat(item.item_price),
        item_desc: item.item_desc,
        item_quantity: item.item_quantity,
        item_category: item.item_category,
        item_image: item.item_image ? item.item_image : null,
        sales_count: item.sales_count,
        shop_name: item.user.shop_name,
      });
    }
  }
  console.log(doc);
  callback(null, data);
}
exports.handle_request = handle_request;
