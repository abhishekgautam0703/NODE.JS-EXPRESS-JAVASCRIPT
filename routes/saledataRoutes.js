const express = require("express");
const router = express.Router();
const { searchbydate,searchbyInvoice,updateSale} = require("../controllers/saledataController");
const auth = require("../middleware/authMiddleware");
router.post("/search", searchbyInvoice);
router.post("/update",updateSale);
router.post("/searchbydate",searchbydate);
module.exports = router;
