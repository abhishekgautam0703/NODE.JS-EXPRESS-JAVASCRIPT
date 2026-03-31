const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.changepassword = async (req, res) => {
  const { username, password } = req.body;

  try{

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user into database
          await pool.query(
  "UPDATE users SET password = ? WHERE username = ?",
  [hashed, username]
);
    res.status(201).json({ message: "Password Change successfully" });
  } catch (error) {
    console.error("Forget Password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
