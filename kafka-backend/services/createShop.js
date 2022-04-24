const User = require("../schema/userModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("In create shop ");
  const doc = await User.findByIdAndUpdate(msg.user.user_id, {
    shop_name: msg.body.shop_name,
  });
  //res.send(doc);
  callback(null, doc);
}

exports.handle_request = handle_request;
