const auth = require("../middlewares/auth");
const express = require("express");

const {
  addItemToCart,
  getCartItems,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/AddToCart").post(auth, addItemToCart);
router.route("/cartItems").get(auth, getCartItems);

module.exports = router;
