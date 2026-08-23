const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics");
const { verify, verifyAdmin } = require("../middleware/auth");

//get
route.get("/analytics", verify, analyticsController.myPurchases)

module.exports = router;