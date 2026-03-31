// controllers/stockController.js
const pool = require("../config/db");

exports.getStock = async (req, res) => {
  try {
    const q = req.query.q;
    let rows;
    if (q) {
      const [r] = await pool.query("SELECT * FROM stock WHERE item_name LIKE ? ORDER BY item_name", [`%${q}%`]);
      rows = r;
    } else {
      const [r] = await pool.query("SELECT * FROM stock ORDER BY item_name");
      rows = r;
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
