const express = require("express");
const router = express.Router();
const { login ,signup} = require("../controllers/authController");
const {authMiddleware,authorizeRoles} = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup",authMiddleware,authorizeRoles("Admin"), signup);


module.exports = router;
