const auth = require("../middlewares/auth");
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

router.route("/favoriteItems").get(auth, getFavoriteItems);
router.route("/allItems").get(getAllItems);
router.route("/allItemsById").get(auth, getAllItemsById);
router.route("/addFavorites/:item_id").post(auth, addFavorites);
router.route("/removeFavorites/:item_id").post(auth, removeFavorites);
router.route("/searchItems/:search").get(auth, searchItems);
router.route("/searchFavoriteItems/:search").get(auth, searchFavoriteItems);
router.route("/itemDetails/:item_id").get(auth, getItemDetails);
module.exports = router;
