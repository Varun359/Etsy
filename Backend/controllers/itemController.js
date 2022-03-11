const mysql = require("mysql");
const { rawListeners } = require("../database");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

exports.getShopItems = asyncErrorHandler(async (req, res) => {
  console.log(req.user);
  var getItemsSql =
    "select item_name,item_price,item_desc,item_quantity,item_category from etsy.items,etsy.shops where etsy.items.shop_id = (select shop_id from etsy.users, etsy.shops where etsy.users.user_id=" +
    mysql.escape(req.user.user_id) +
    ")";

  console.log("inside Get Shop Items page");
  console.log(getItemsSql);
  connection.query(getItemsSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      //    res.send({ shop_name: result[0].shop_name });
      res.end("success");
    }
  });
});

exports.insertIntoShop = asyncErrorHandler(async (req, res) => {
  console.log("inside insert into shop page");
  var insertItemsSql =
    "insert into etsy.items (item_name,item_category, item_desc, item_price,item_quantity,shop_id) values (" +
    mysql.escape(req.body.item_name) +
    "," +
    mysql.escape(req.body.item_category) +
    "," +
    mysql.escape(req.body.item_desc) +
    "," +
    mysql.escape(req.body.item_price) +
    "," +
    mysql.escape(req.body.item_quantity) +
    "," +
    mysql.escape(req.body.shop_id) +
    ")";
  console.log(insertItemsSql);
  connection.query(insertItemsSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      //    res.send({ shop_name: result[0].shop_name });
      res.send("Item added to the shop successfully");
    }
  });
});

// exports.changeItem = asyncErrorHandler(async(req,res) =>{
//     console.log("inside change Item api");
//     var changeItem =
//       "update etsy.items set is_changed = false where etsy.items.shop_id = (select shop_id " ;
// })
