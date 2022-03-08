const express = require("express");
const mysql = require("mysql");
var connection = require("../database");

const router = express.Router();

router.post("/create", (req, res) => {
  console.log("inside create");
  var createSql =
    "insert into etsy.users (email,first_name,password) values (" +
    mysql.escape(req.body.email) +
    " ," +
    mysql.escape(req.body.firstName) +
    " ," +
    mysql.escape(req.body.password) +
    " ) ";

  connection.query(createSql, (err, result) => {
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
});

module.exports = router;
