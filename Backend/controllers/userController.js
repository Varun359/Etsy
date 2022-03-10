const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const bcrypt = require("bcrypt");
//const User = require("../models/userModel");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
//const sendToken = require("../utils/sendToken");
// const ErrorHandler = require("../utils/errorHandler");
// const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
// Register User
exports.registerUser = asyncErrorHandler(async (req, res) => {
  console.log("inside Register");

  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // console.log(salt);
    // console.log(hashedPassword);

    var createSql =
      "insert into etsy.users (email,first_name,password) values (" +
      mysql.escape(req.body.email) +
      " ," +
      mysql.escape(req.body.firstName) +
      " ," +
      mysql.escape(req.body.password) +
      " ) ";

    connection.query(createSql, (err, result) => {
      console.log(err);
      if (err) {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Error while creating user");
        console.log(err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("User Registered Succesfully");
      }
    });
    console.log(req.body);
  } catch {
    console.log("error in catch");
    res.status(500).end();
  }
});

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  console.log("inside login");

  // var passQuery =
  //   "select password from etsy.users where email=" +
  //   mysql.escape(req.body.email);

  // connection.query(passQuery, (err, result) => {
  //   if (err) {
  //     res.writeHead(503, {
  //       "Content-Type": "text/plain",
  //     });
  //     console.log("cannot connect to database");
  //   } else {
  //     console.log(result[0]);
  //     console.log(result[0].password);
  //   }
  // });

  // if (
  //   bcrypt.compare(
  //     req.body.password,
  //     "$2b$10$JsfxJv/WE9.cbh307k9XzebZttuaAeXpjmYJIOny6qUX2OeRBgcNC"
  //   )
  // ) {

  var loginSql =
    "select * from etsy.users where email=" +
    mysql.escape(req.body.email) +
    "and password = " +
    mysql.escape(req.body.password);

  connection.query(loginSql, (err, result) => {
    if (err) {
      res.writeHead(503, {
        "Content-Type": "text/plain",
      });
      res.end("Error while connecting with database");
      console.log(err);
    } else {
      if (result.length == 1) {
        res.cookie("cookie", req.body.email, {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        console.log("Result", result[0]);
        console.log("user ", req.session);
        req.session.user = req.body.email;

        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        const user = result[0];
        jwt.sign({ user }, "secret123", { expiresIn: "1h" }, (err, token) => {
          if (err) {
            console.log(err);
          }
          console.log("I am in token");
          console.log(token);

          res.send(token);
        });
        res.end("Succesfully logged in");
      } else {
        res.status(403).json("Incorrect email or password");
        res.end();
      }
    }
  });
  console.log(req.body);
  // } else {
  //   console.log("hiii");
  //   res.status(403).json("Incorrect email or password");
  // }
});

// Logout User
// exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Logged Out",
//   });
// });

// // Get User Details
// exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// // Update User Profile
// exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   if (req.body.avatar !== "") {
//     const user = await User.findById(req.user.id);

//     const imageId = user.avatar.public_id;

//     await cloudinary.v2.uploader.destroy(imageId);

//     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });

//     newUserData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }

//   await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: true,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });
