const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const searchTerm = new RegExp(msg.params.search, "i");
  const doc = await Item.find({
    $or: [
      {
        item_name: { $regex: searchTerm },
      },
      {
        item_category: { $regex: searchTerm },
      },
      {
        item_desc: { $regex: searchTerm },
      },
    ],
  });
  console.log(msg.params);
  callback(null, doc);
}

exports.handle_request = handle_request;
