var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "my-etsy-database.cswb01pgt66k.us-west-1.rds.amazonaws.com",
  database: "etsy",
  user: "varun",
  password: "password",
});

module.exports = connection;
