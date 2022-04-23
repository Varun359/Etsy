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
// router.route("/uploadItemImage/:item_id").post(auth, async (req, res, next) => {
//   const newData = {
//     user_image: req.body.imageUrl,
//   };
//   console.log(req.body.imageUrl);
//   await Item.findByIdAndUpdate(req.user.user_id, newData);

//   // res.status(200).json({
//   //   success: true,
//   // });
//   res.send(newData);
// });

module.exports = router;
