const { default: mongoose } = require("mongoose");
const mysql = require("mysql");
const { rawListeners } = require("../database");
var connection = require("../database");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const userFavorites = require("../models/userFavoritesModel");
const Item = require("../models/itemModel");

//get favorites from the shop
exports.getFavoriteItems = asyncErrorHandler(async (req, res) => {
  console.log("Inside get favorite Items");
  const documents = await userFavorites
    .find({ user: mongoose.Types.ObjectId(req.user.user_id) })
    .populate("item user");
  console.log(documents);
  let data = [];
  if (documents.length) {
    for (let doc of documents) {
      data.push({
        user_id: doc.user._id,
        item_id: doc.item._id,
        item_name: doc.item.item_name,
        item_price: parseFloat(doc.item.item_price),
        item_desc: doc.item.item_desc,
        item_quantity: doc.item.item_quantity,
        item_category: doc.item.item_category,
        item_image: doc.item.item_image ? doc.item.item_image : null,
        // sales_count: doc.item.sales_count,
        //shop_name: doc.user.shop_name,
      });
    }
  }
  console.log(documents);
  res.send(data);
});

//get all items
exports.getAllItems = asyncErrorHandler(async (req, res) => {
  console.log("inside get all items");
  const doc = await Item.find().populate("user");
  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        user_id: item.user._id,
        item_name: item.item_name,
        item_price: parseFloat(item.item_price),
        item_desc: item.item_desc,
        item_quantity: item.item_quantity,
        item_category: item.item_category,
        item_image: item.item_image ? item.item_image : null,
        // sales_count: item.sales_count,
        // shop_name: item.user.shop_name,
      });
    }
  }

  console.log(doc);
  res.send(data);
});

//add favorites
exports.addFavorites = asyncErrorHandler(async (req, res) => {
  const doc = await userFavorites.create({
    user: mongoose.Types.ObjectId(req.user.user_id),
    item: mongoose.Types.ObjectId(req.params.item_id),
  });

  res.send(doc ? doc : "No document");
});

//Remove Favorites
exports.removeFavorites = asyncErrorHandler(async (req, res) => {
  const doc = await userFavorites.remove({
    user: mongoose.Types.ObjectId(req.user.user_id),
    item: mongoose.Types.ObjectId(req.params.item_id),
  });
  console.log(doc);
  res.send("Item Removed from favories");
});

//get elements by id with favorites
exports.getAllItemsById = asyncErrorHandler(async (req, res) => {
  console.log("Inside get all elements by id with favs");
  var fav_data = [];
  var un_fav = [];
  const fav_documents = await userFavorites.find({
    user: mongoose.Types.ObjectId(req.user.user_id),
  });
  let items = [];
  fav_documents.map((doc) => items.push(doc.item.toString()));

  const all_fav = await Item.find().lean();

  if (all_fav.length) {
    for (let doc of all_fav) {
      if (items.includes(doc._id.toString())) {
        fav_data.push({
          user_id: doc.user,
          item_id: doc._id,
          item_name: doc.item_name,
          item_price: parseFloat(doc.item_price),
          item_desc: doc.item_desc,
          item_quantity: doc.item_quantity,
          item_category: doc.item_category,
          item_image: doc.item_image ? doc.item_image : null,
          sales_count: doc.sales_count,
          is_Favorite: true,
          //is_Favorite: items.includes(doc._id.toString()) ? true : false,
        });
      } else {
        un_fav.push({
          user_id: doc.user,
          item_id: doc._id,
          item_name: doc.item_name,
          item_price: parseFloat(doc.item_price),
          item_desc: doc.item_desc,
          item_quantity: doc.item_quantity,
          item_category: doc.item_category,
          item_image: doc.item_image ? doc.item_image : null,
          sales_count: doc.sales_count,
          is_Favorite: false,
          // is_Favorite: items.includes(doc._id.toString()) ? true : false,
        });
      }
    }
  }
  fav_data = [...fav_data, ...un_fav];
  console.log(all_fav);

  res.send(fav_data);
});

//Search Items
exports.searchItems = asyncErrorHandler(async (req, res) => {
  const searchTerm = new RegExp(req.params.search, "i");
  const doc = await Item.find({
    $or: [
      {
        item_name: { $regex: searchTerm },
      },
      {
        item_category: { $regex: searchTerm },
      },
      {
        item_desc: { $regex: searchTerm },
      },
    ],
  });
  console.log(req.params);
  if (doc?.length === 0) res.send("No search Results");
  else if (doc?.length === 1) {
    const fav_documents = await userFavorites.find({
      user: mongoose.Types.ObjectId(doc[0].item_id),
    });
  } else res.send(doc);
  //res.send(doc?.length ? doc : "No Search Results");
});

//Search Favorites
exports.searchFavoriteItems = asyncErrorHandler(async (req, res) => {
  const search_term = new RegExp(req.params.search, "i");
  const doc = await userFavorites.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(req.user.user_id),
      },
    },
    {
      $lookup: {
        from: "items",
        localField: "item",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: {
        path: "$item",
      },
    },
    {
      $match: {
        $or: [
          {
            "item.item_name": search_term,
          },
          {
            "item.item_category": search_term,
          },
          {
            "item.item_desc": search_term,
          },
        ],
      },
    },
  ]);
  console.log(doc);

  let data = [];
  if (doc.length) {
    for (let item of doc) {
      data.push({
        user_id: item.user._id,
        item_name: item.item.item_name,
        item_price: parseFloat(item.item.item_price),
        item_desc: item.item.item_desc,
        item_quantity: item.item.item_quantity,
        item_category: item.item.item_category,
        item_image: item.item.item_image ? item.item.item_image : null,
      });
    }
  }

  console.log(data);
  res.send(data?.length ? data : "0");
  // res.send(doc?.length ? doc : "No Search Results");
});

//get item details by item id
exports.getItemDetails = asyncErrorHandler(async (req, res) => {
  const doc = await Item.findById(req.params.item_id).populate("user");
  let data = {
    item_id: doc._id,
    item_name: doc.item_name,
    item_price: parseFloat(doc.item_price),
    item_desc: doc.item_desc,
    item_quantity: doc.item_quantity,
    item_category: doc.item_category,
    item_image: doc.item_image ? doc.item_image : null,
    sales_count: doc.sales_count,
    shop_name: doc.user.shop_name,
    user_id: doc.user._id,
  };
  console.log(data);
  console.log(doc);
  res.send(data);
});
