const User = require("../schema/userModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("In get shop details");
  const doc = await User.find({ _id: msg.user.user_id });
  console.log(doc);
  let data = {
    shop_name: doc[0].shop_name ? doc[0].shop_name : null,
    shop_image: doc[0].shop_image ? doc[0].shop_image : null,
    user_image: doc[0].user_image ? doc[0].user_image : null,
  };
  callback(null, data);
}

exports.handle_request = handle_request;
