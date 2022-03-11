const auth = require("../middlewares/auth");
const express = require("express");
const {
  getShopItems,
  insertIntoShop,
} = require("../controllers/itemController");
const router = express.Router();

router.route("/shopItems").get(auth, getShopItems); //not working
router.route("/insertItems").post(auth, insertIntoShop);

module.exports = router;
