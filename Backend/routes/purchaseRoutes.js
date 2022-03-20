const auth = require("../middlewares/auth");
const express = require("express");

const {
  purchasingItems,
  getPreviousOrders,
} = require("../controllers/purchaseController");
const router = express.Router();

router.route("/purchasingItems").post(auth, purchasingItems);
router.route("/orders").get(auth, getPreviousOrders);
module.exports = router;
