const express = require("express");
const router = express.Router();
const { getStock } = require("../controllers/stockController");
const {authMiddleware} = require("../middleware/authMiddleware");

// GET /api/stock        -> returns all stock
// GET /api/stock?q=abc  -> optional search by item_name substring
router.get("/", authMiddleware, getStock);

module.exports = router;
