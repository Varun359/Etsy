const auth = require("../middlewares/auth");
let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });

const express = require("express");

const {
  addItemToCart,
  getCartItems,
  addMultipleItemsToCart,
  deleteCartItems,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/AddToCart").post(checkAuth, addItemToCart);
router.route("/cartItems").get(checkAuth, getCartItems);
router.route("/addAllCartItems").post(checkAuth, addMultipleItemsToCart);
router.route("/deleteCartItems").get(checkAuth, deleteCartItems);
module.exports = router;
