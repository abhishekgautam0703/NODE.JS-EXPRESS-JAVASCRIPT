const express = require("express");
const router = express.Router();
const { searchbyItem ,updateStock,loadstockdata} = require("../controllers/InventorydataController");
const auth = require("../middleware/authMiddleware");
router.post("/update",updateStock);
router.post("/search",searchbyItem);
router.post("/load",loadstockdata);
module.exports = router;
