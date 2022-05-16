const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
//const sendToken = require("../utils/sendToken");
// const ErrorHandler = require("../utils/errorHandler");
// const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  console.log("inside Register");

  const { first_name, email, password } = req.body;

  const user = await User.create({
    first_name,
    email,
    password,
  });
  if (!user) {
    console.log("User not created");
  } else {
    console.log(user);
    const token = jwt.sign({ user_id: user._id, email }, "secret123", {
      expiresIn: "3hr",
    });
    const data = {
      token: token,
      user_id: user._id,
      first_name: user.first_name,
      email: email,
    };
    res.cookie("cookie", data, {
      maxAge: 900000,
      httpOnly: false,
      path: "/",
    });

    console.log(data);
    res.user = data;
    console.log(res);
    res.send(data);
  }
});

//login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email And Password", 400));
  }

  const user = await User.findOne({ email: email, password: password });

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  } else {
    console.log(user);
    jwt.sign(
      { user_id: user._id, email },
      "secret123",
      { expiresIn: "3h" },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        console.log("I am in token");
        console.log(token);

        const data = {
          email: email,
          user_id: user._id,
          first_name: user.first_name,
          shop_name: user.shop_name ? user.shop_name : null,
          // user_image: user.user_image,
          // shop_image: user.shop_image,
          token: token,
          //shops: shops,
        };

        console.log(data);
        res.cookie("cookie", data, {
          maxAge: 9000000,
          httpOnly: false,
          path: "/",
        });
        res.send(data);
      }
    );
  }
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const { user_id } = req.user;
  console.log(req.user);
  console.log(user_id);
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(user_id) });

  console.log(user);
  res.send({
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
});

// Update User Profile ( should also show user profile)
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
  const newData = {
    first_name: req.body.first_name,
    gender: req.body.gender,
    city: req.body.city,
    phone_no: req.body.phone_no,
    address: req.body.address,
    country: req.body.country,
    email: req.body.email,
    DOB: req.body.date,
    about: req.body.about,
  };

  await User.findByIdAndUpdate(req.user.user_id, newData);

  res.status(200).json({
    success: true,
  });
});
