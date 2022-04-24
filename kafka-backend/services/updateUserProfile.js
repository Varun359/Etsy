var User = require("../schema/userModel");
const { default: mongoose } = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside Update user profile");
  console.log("This is the msg body", msg.body);
  const newData = {
    first_name: msg.body.first_name,
    gender: msg.body.gender,
    city: msg.body.city,
    phone_no: msg.body.phone_no,
    address: msg.body.address,
    country: msg.body.country,
    email: msg.body.email,
    DOB: msg.body.date,
    about: msg.body.about,
  };

  await User.findByIdAndUpdate(msg.user.user_id, newData);

  //   res.status(200).json({
  //     success: true,
  //   });
  callback(null, "User Profile Updated");
}

exports.handle_request = handle_request;
