const User = require("../schema/userModel");
const Item = require("../schema/itemModel");

async function handle_request(msg, callback) {
  console.log("Inside check Shop name");
  const is_occupied = await User.findOne({ shop_name: msg.shop_name });
  let check = false;
  if (is_occupied) check = true;
  callback(null, check);
}

exports.handle_request = handle_request;
