const auth = require("../middlewares/auth");
const express = require("express");

const {
  addItemToCart,
  getCartItems,
  addMultipleItemsToCart,
  deleteCartItems,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/AddToCart").post(auth, addItemToCart);
router.route("/cartItems").get(auth, getCartItems);
router.route("/addAllCartItems").post(auth, addMultipleItemsToCart);
router.route("/deleteCartItems").get(auth, deleteCartItems);
module.exports = router;
