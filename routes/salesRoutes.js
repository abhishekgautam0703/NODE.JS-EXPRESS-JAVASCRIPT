const express = require("express");
const router = express.Router();
const { addSale } = require("../controllers/salesController");
const auth = require("../middleware/authMiddleware");

router.post("/", addSale);

module.exports = router;
