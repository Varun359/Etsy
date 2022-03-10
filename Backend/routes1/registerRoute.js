const express = require("express");
const mysql = require("mysql");
var connection = require("../database");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("inside create");

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

module.exports = router;
