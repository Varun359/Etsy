var User = require("../schema/userModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  const { user_id } = msg.user;

  const user = await User.findOne({ _id: mongoose.Types.ObjectId(user_id) });
  callback(null, {
    first_name: user.first_name,
    email: user.email,
    user_id: user._id,
    country: user.country ? user.country : null,
    about: user.about ? user.about : null,
    phone_no: user.phone_no ? user.phone_no : null,
    gender: user.gender ? user.gender : null,
    city: user.city ? user.city : null,
    address: user.address ? user.address : null,
    date: user.date ? user.date : null,
    shop_image: user.shop_image ? user.shop_image : null,
    shop_name: user.shop_name ? user.shop_name : null,
    user_image: user.user_image ? user.user_image : null,
    //  user_image: user.user_image,
  });
}

exports.handle_request = handle_request;
