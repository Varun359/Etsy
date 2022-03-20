const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

//add item to cart
exports.addItemToCart = asyncErrorHandler(async (req, res) => {
  console.log("add to the cart");
  var addTocartSql =
    "insert into cart (item_id,user_id,quantity) values (" +
    mysql.escape(req.body.item_id) +
    "," +
    mysql.escape(req.user.user_id) +
    "," +
    mysql.escape(req.body.quantity) +
    ")";
  console.log(addTocartSql);
  connection.query(addTocartSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Item added to the cart");
    }
  });
});

//get all cart items
exports.getCartItems = asyncErrorHandler(async (req, res) => {
  console.log("get all cart items");
  var len = 0;
  var getItemToCartSql =
    "select distinct etsy.items.*,shop_name,quantity from etsy.items,etsy.cart where etsy.items.item_id=etsy.cart.item_id and etsy.cart.user_id=" +
    mysql.escape(req.user.user_id);
  console.log(getItemToCartSql);
  connection.query(getItemToCartSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      len = result.length;
      res.send(result);
    }
  });
});
