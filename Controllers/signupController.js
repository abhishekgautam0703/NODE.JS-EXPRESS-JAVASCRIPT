// Controller function for signup
exports.signupUser = async (req, res) => {
  const { username, role, password } = req.body;

  try {
    // Check if user already exists
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      'INSERT INTO users (username, role, password) VALUES (?, ?, ?)',
      [username, role, hashed]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
