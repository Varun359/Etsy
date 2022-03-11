const auth = require("../middlewares/auth");
const express = require("express");
const {
  checkShopName,
  createShop,
} = require("../controllers/shopController.js");

const router = express.Router();

router.route("/checkShop").get(auth, checkShopName);
router.route("/createShop").post(auth, createShop);

module.exports = router;
