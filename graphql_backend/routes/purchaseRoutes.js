const auth = require("../middlewares/auth");
const express = require("express");

let passport = require("passport");
require("../middlewares/passport")(passport);
let checkAuth = passport.authenticate("jwt", { session: false });

const {
  purchasingItems,
  getPreviousOrders,
} = require("../controllers/purchaseController");
const router = express.Router();

router.route("/purchasingItems").post(checkAuth, purchasingItems);
router.route("/orders").get(checkAuth, getPreviousOrders);
module.exports = router;
