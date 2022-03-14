const auth = require("../middlewares/auth");
const express = require("express");
const {
  getShopItems,
  insertIntoShop,
  getFavoriteItems,
  getAllItems,
  addFavorites,
  removeFavorites,
} = require("../controllers/itemController");
const router = express.Router();

router.route("/shopItems").get(auth, getShopItems); //not working
router.route("/insertItems").post(auth, insertIntoShop);
router.route("/favoriteItems").post(auth, getFavoriteItems);
router.route("/allItems").get(auth, getAllItems);
router.route("/addFavorites").post(auth, addFavorites);
router.route("/removeFavorites").post(auth, removeFavorites);

module.exports = router;
