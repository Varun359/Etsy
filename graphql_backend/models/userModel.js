const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    //required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    //required: [true, "Please Enter Your Email"],
    //unique: true,
  },

  password: {
    type: String,
    //required: [true, "Please Enter Your Password"],
    //minLength: [8, "Password should have atleast 8 chars"],
    //select: false,
  },
  //   avatar: {
  //     public_id: {
  //       type: String,
  //     },
  //     url: {
  //       type: String,
  //     },
  //   },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  address: {
    type: String,
  },
  about: {
    type: String,
  },
  DOB: {
    type: String,
  },
  shop_name: {
    type: String,
  },
  user_image: {
    type: String,
  },
  shop_image: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
