const mysql = require("mysql");
const { rawListeners } = require("../database");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");

// exports.changeItem = asyncErrorHandler(async(req,res) =>{
//     console.log("inside change Item api");
//     var changeItem =
//       "update etsy.items set is_changed = false where etsy.items.shop_id = (select shop_id " ;
// })

//get favorites from the shop
exports.getFavoriteItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside get fevorites");
  var getFavoritesSql =
    "select distinct item_name,item_category,item_desc,item_price,item_quantity,item_image,sales_count,etsy.items.user_id,etsy.user_favorites.item_id from etsy.items,etsy.user_favorites where etsy.items.item_id = etsy.user_favorites.item_id and etsy.user_favorites.user_id=" +
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
    " select item_id,item_name,item_category,item_desc,item_price,item_quantity,item_image,sales_count,etsy.users.user_id,etsy.users.shop_name from etsy.users,etsy.items where etsy.users.user_id = etsy.items.user_id";
  console.log(getAllItemsSql);
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
  var itemId = req.params.item_id;

  var addFavoritesSQL =
    "insert into etsy.user_favorites (user_id,item_id) values (" +
    mysql.escape(req.user.user_id) +
    "," +
    mysql.escape(itemId) +
    ")";
  connection.query(addFavoritesSQL, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.json({ message: "Item Added to user Favorites" });
    }
  });
});

//Remove Favorites
exports.removeFavorites = asyncErrorHandler(async (req, res) => {
  console.log("Inside Remove favorites ");
  var itemId = req.params.item_id;

  var removeFavoritesSQL =
    "DELETE FROM etsy.user_favorites WHERE etsy.user_favorites.user_id = " +
    mysql.escape(req.user.user_id) +
    " and etsy.user_favorites.item_id=" +
    mysql.escape(itemId);
  connection.query(removeFavoritesSQL, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.json({ message: "Item Removed from user Favorites" });
    }
  });
});

//get elements by id with favorites
exports.getAllItemsById = asyncErrorHandler(async (req, res) => {
  console.log("Inside get all elements by items");
  var resultData = [];
  var getAllItemsFavSql =
    "select * from etsy.items where item_id in (SELECT item_id FROM etsy.user_favorites where user_id =" +
    mysql.escape(req.user.user_id) +
    ")";
  connection.query(getAllItemsFavSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      result.map((item) => {
        item["is_favorite"] = true;
        resultData.push(item);
      });
    }
  });
  var getAllItemsNotFavSql =
    "select * from etsy.items where item_id not in (SELECT item_id FROM etsy.user_favorites where user_id =" +
    mysql.escape(req.user.user_id) +
    ")";
  connection.query(getAllItemsNotFavSql, (err, result) => {
    if (err) {
      res.send("Error while connecting database");
    } else {
      console.log(result);
      result.map((item) => {
        item["is_favorite"] = false;
        resultData.push(item);
      });
      res.send(resultData);
    }
  });
});

//Search Items
exports.searchItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside search items by search");
  var searchItemsSql =
    " select item_id,item_name,item_category,item_desc,item_price,item_quantity,item_image,sales_count from etsy.items where item_name like '%" +
    req.params.search +
    "%' or item_category like '%" +
    req.params.search +
    "%' or item_desc like '%" +
    req.params.search +
    "%'";
  console.log(searchItemsSql);
  connection.query(searchItemsSql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//Search Favorites
exports.searchFavoriteItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside favorite items by search");
  var searchFavItemsSql =
    "select distinct etsy.items.item_id,item_name,item_category,item_desc,item_price,item_quantity,item_image,sales_count from etsy.items,etsy.user_favorites where etsy.items.item_id=etsy.user_favorites.item_id and (item_name like '%" +
    req.params.search +
    "%' or item_desc like '%" +
    req.params.search +
    "%' or item_category like '%" +
    req.params.search +
    "%')";
  console.log(searchFavItemsSql);
  connection.query(searchFavItemsSql, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error while connecting database");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//get item details by item id
exports.getItemDetails = asyncErrorHandler(async (req, res) => {
  console.log("get item details by item id");
  var getItemByIdSql =
    "select etsy.items.*,etsy.users.shop_name from etsy.items,etsy.users where etsy.users.user_id=etsy.items.user_id and etsy.items.item_id=" +
    mysql.escape(req.params.item_id);
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
