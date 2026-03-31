const express = require("express");
const router = express.Router();
const { changepassword} = require("../controllers/forgetpasswordController");
const {authMiddleware,authorizeRoles} = require("../middleware/authMiddleware");

router.post("/changepassword", changepassword);
module.exports = router;
