const pool = require("../config/db");

exports.addSale = async (req, res) => {

  try {

    const { Sale, items } = req.body;

    const {
      date,
      Type,
      company,
      invoice_no,
      invoice_amount,
      quantity
    } = Sale;

    for (const item of items) {

      // ✅ INSERT INTO SALES TABLE
      await pool.query(
        `INSERT INTO sale
        (Invoice_Date,Type, Company_Name, Invoice_No,
         Invoice_Amount, Total_Quantity,
         Item_Name, Brand_Name, quantity,
         Unit_Price, Serail_No, Description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [
          date,
          Type,
          company,
          invoice_no,
          invoice_amount,
          quantity,
          item.item,
          item.brand,
          item.qty,
          item.price,
          item.serial,
          item.description
        ]
      );

      // ✅ CHECK STOCK
      const [stockRows] = await pool.query(
        "SELECT quantity FROM stock WHERE Item_Name = ?",
        [item.item]
      );

      // ❌ Item not in stock
      if (stockRows.length === 0) {
        return res.status(400).json({
          message: `Item ${item.item} not available in stock`
        });
      }

      const currentStock = stockRows[0].quantity;

      // ❌ Not enough stock
      if (currentStock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.item}`
        });
      }

      // ✅ SUBTRACT STOCK
      await pool.query(
        `UPDATE stock
         SET quantity = quantity - ?
         WHERE Item_Name = ?`,
        [item.qty, item.item]
      );
    }

    res.json({ message: "Sale saved & Stock Updated ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};