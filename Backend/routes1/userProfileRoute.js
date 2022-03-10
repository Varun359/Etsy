const express = require("express");
const mysql = require("mysql");
var connection = require("../database");

const router = express.Router();

router.post("/user-profile", (req, res) => {
  console.log("inside user-profile");

  var userProfileSql =
    "select first_name,gender,city,phone_no,address,country from etsy.users where first_name=" +
    mysql.escape(req.body.firstname);

  console.log(userProfileSql);
  console.log("hi_from top");
  connection.query(userProfileSql, (err, result) => {
    if (err) {
      console.log("errr");
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error while retrieving user profile");
      console.log(err);
    } else {
      if (result.length == 1) {
        res.cookie("cookie", req.body.email, {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        console.log(result);
        console.log(result[0].first_name);
        console.log("user ", req.session);
        res.send(result[0]);
        /*res.writeHead(200, {
          "Content-Type": "text/plain",
        });*/
        res.end("User details Retrieved");
      }
    }
  });
  console.log("hi");
  console.log(req.body);
});

module.exports = router;
