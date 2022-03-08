const express = require("express");
const mysql = require("mysql");
var connection = require("../database");

const router = express.Router();

router.post("/login", (req, res) => {
  console.log("inside login");
  var loginSql =
    "select email,password from etsy.users where email=" +
    mysql.escape(req.body.email) +
    "and password =" +
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
});

module.exports = router;
