const mysql = require("mysql");
const { rawListeners } = require("../database");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

//get items from the shop
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

//add items to the shop
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

//get favorites from the shop
exports.getFavoriteItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside get fevorites");
  var getFavoritesSql =
    "select item_name,item_category,item_desc,item_price,item_quantity,item_image,user_id,etsy.user_favorites.item_id from etsy.items,etsy.user_favorites where etsy.items.item_id = etsy.user_favorites.item_id and etsy.user_favorites.user_id=" +
    mysql.escape(req.user.user_id);

  console.log(getFavoritesSql);
  connection.query(getFavoritesSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//get all items
exports.getAllItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside get all items");
  var getAllItemsSql =
    "select item_id,item_name,item_category,item_desc,item_price,item_quantity,item_image,etsy.shops.shop_id,etsy.shops.shop_name from etsy.shops,etsy.items where etsy.shops.shop_id = etsy.items.shop_id";
  connection.query(getAllItemsSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//add favorites
exports.addFavorites = asyncErrorHandler(async (req, res) => {
  console.log("Inside add favorites ");
  var addFavoritesSQL =
    "insert into etsy.user_favorites (user_id,item_id) values (" +
    mysql.escape(req.user.user_id) +
    "," +
    mysql.escape(req.body.item_id) +
    ")";
  connection.query(addFavoritesSQL, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Item Added to user Favorites");
    }
  });
});

//Remove Favorites
exports.removeFavorites = asyncErrorHandler(async (req, res) => {
  console.log("Inside Remove favorites ");
  var removeFavoritesSQL =
    "DELETE FROM etsy.user_favorites WHERE etsy.user_favorites.user_id = " +
    mysql.escape(req.user.user_id) +
    " and etsy.user_favorites.item_id=" +
    mysql.escape(req.body.item_id);
  connection.query(removeFavoritesSQL, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send("Item Removed from user Favorites");
    }
  });
});
