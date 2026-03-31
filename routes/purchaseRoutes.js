const express = require("express");
const router = express.Router();
const { addPurchase } = require("../controllers/purchaseController");
const auth = require("../middleware/authMiddleware");

router.post("/", addPurchase);

module.exports = router;
