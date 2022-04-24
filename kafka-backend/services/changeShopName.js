const User = require("../schema/userModel");
const Item = require("../schema/itemModel");

async function handle_request(msg, callback) {
  console.log("Inside change shop name ");
  console.log(msg);

  const doc = await User.findByIdAndUpdate(msg.user.user_id, {
    shop_name: msg.body.shop_name,
  });
  console.log(doc);
  callback(null, "Shop name updated");
}

exports.handle_request = handle_request;
