const express = require("express");
const mysql = require("mysql");
var connection = require("./database");
const bcrypt = require("bcrypt");

const asyncErrorHandler = require("./middlewares/asyncErrorHandler");
//const sendToken = require("../utils/sendToken");

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  console.log("inside login");

  var passQuery =
    "select password from etsy.users where email=" +
    mysql.escape(req.body.email);

  connection.query(passQuery, (err, result) => {
    if (err) {
      res.writeHead(503, {
        "Content-Type": "text/plain",
      });
      console.log("cannot connect to database");
    } else {
      console.log(result[0]);
      console.log(result[0].password);
    }
  });

  if (
    bcrypt.compare(
      req.body.password,
      "$2b$10$JsfxJv/WE9.cbh307k9XzebZttuaAeXpjmYJIOny6qUX2OeRBgcNC"
    )
  ) {
    var loginSql =
      "select email,password from etsy.users where email=" +
      mysql.escape(req.body.email) +
      "and password = " +
      mysql.escape(
        "$2b$10$JsfxJv/WE9.cbh307k9XzebZttuaAeXpjmYJIOny6qUX2OeRBgcNC"
      );

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
          console.log("user ", req.session);
          req.session.user = req.body.email;

          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Succesfully logged in");
        } else {
          res.status(403).json("Incorrect email or password");
          res.end();
        }
      }
    });
    console.log(req.body);
  } else {
    console.log("hiii");
    res.status(403).json("Incorrect email or password");
  }
});
