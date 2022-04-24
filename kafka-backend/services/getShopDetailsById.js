const User = require("../schema/userModel");
const Item = require("../schema/itemModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const doc = await User.find({
    _id: mongoose.Types.ObjectId(msg.params.user_id),
  });

  //doc ? res.send(doc) : res.send("No Document");
  callback(null, doc);
}

exports.handle_request = handle_request;
