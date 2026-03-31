const express = require("express");
const router = express.Router();
const { searchbydate,searchPurchaseInvoice ,updatePurchase} = require("../controllers/purchasedataController");
const auth = require("../middleware/authMiddleware");
router.post("/search", searchPurchaseInvoice);
router.post("/update",updatePurchase);
router.post("/searchbydate",searchbydate);
module.exports = router;
