const mysql = require("mysql");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const { put } = require("../routes/userRoutes");

//purchasing items
exports.purchasingItems = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  console.log("inside purchasing items");

  console.log(req.body.dateOfPurchase);
  //console.log(req.body.items[0].item_id);

  var insertOrderSql =
    "insert into etsy.orders (dateOfPurchase) values (" +
    mysql.escape(req.body.dateOfPurchase) +
    ")";

  connection.query(insertOrderSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      let order_id = result.insertId;
      console.log(order_id);
      console.log("Orders table updated");

      var listOfItems;
      var putPurchaseSql =
        "insert into etsy.purchases (order_id,item_id,quantity_buyed,price_buyed,shop_name,item_name,item_image,user_id) values ";

      items = req.body.items;
      items.forEach((item, index) => {
        console.log(item.item_id);
        console.log(item.quantity);
        if (index != 0) {
          listOfItems =
            listOfItems +
            ",(" +
            mysql.escape(order_id) +
            "," +
            mysql.escape(item.item_id) +
            "," +
            mysql.escape(item.quantity) +
            "," +
            mysql.escape(item.item_price) +
            "," +
            mysql.escape(item.shop_name) +
            "," +
            mysql.escape(item.item_name) +
            "," +
            mysql.escape(item.item_image) +
            "," +
            mysql.escape(req.user.user_id) +
            ")";
        } else {
          listOfItems =
            "(" +
            mysql.escape(order_id) +
            "," +
            mysql.escape(item.item_id) +
            "," +
            mysql.escape(item.quantity) +
            "," +
            mysql.escape(item.item_price) +
            "," +
            mysql.escape(item.shop_name) +
            "," +
            mysql.escape(item.item_name) +
            "," +
            mysql.escape(item.item_image) +
            "," +
            mysql.escape(req.user.user_id) +
            ")";
        }
        var updateQuantitySql =
          "update etsy.items set item_quantity = item_quantity-" +
          mysql.escape(item.quantity) +
          " where item_id=" +
          mysql.escape(item.item_id);
        console.log(updateQuantitySql);
        connection.query(updateQuantitySql, (err, result) => {
          if (err) {
            res.send("Error while connecting database");
          } else {
            console.log("items table updated");
          }
        });
      });
      putPurchaseSql = putPurchaseSql + listOfItems;
      connection.query(putPurchaseSql, (err, result) => {
        if (err) {
          res.send("Error while connecting database");
        } else {
          console.log("puchases table updated");
        }
      });
      // console.log(putPurchaseSql);
    }
    res.end();
  });
});

//get previous orders
exports.getPreviousOrders = asyncErrorHandler(async (req, res) => {
  console.log("inside get previous orders");
  var getItemByIdSql =
    "select distinct * from etsy.purchases P,etsy.orders O where P.order_id=O.order_id and P.user_id =" +
    mysql.escape(req.user.user_id);
  console.log(getItemByIdSql);
  connection.query(getItemByIdSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
