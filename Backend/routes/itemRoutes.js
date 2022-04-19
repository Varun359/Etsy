const auth = require("../middlewares/auth");

let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });

const express = require("express");
const {
  getFavoriteItems,
  getAllItems,
  addFavorites,
  removeFavorites,
  getAllItemsById,
  searchItems,
  searchFavoriteItems,
  getItemDetails,
} = require("../controllers/itemController");
const router = express.Router();

router.route("/favoriteItems").get(checkAuth, getFavoriteItems);
router.route("/allItems").get(getAllItems);
router.route("/allItemsById").get(checkAuth, getAllItemsById);
router.route("/addFavorites/:item_id").post(checkAuth, addFavorites);
router.route("/removeFavorites/:item_id").post(checkAuth, removeFavorites);
router.route("/searchItems/:search").get(checkAuth, searchItems);
router
  .route("/searchFavoriteItems/:search")
  .get(checkAuth, searchFavoriteItems);
router.route("/itemDetails/:item_id").get(checkAuth, getItemDetails);
module.exports = router;
