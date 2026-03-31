const pool = require("../config/db");
exports.addPurchase = async (req, res) => {

  try {

    const { purchase, items } = req.body;

    const {
      date,
      company,
      invoice_no,
      invoice_date,
      invoice_amount,
      quantity
    } = purchase;

    for (const item of items) {

      await pool.query(
        `INSERT INTO purchase
        (Date, Company_Name, Invoice_No, Invoice_Date,
         Invoice_Amount, Total_Quantity,
         Item_Name, Brand_Name, quantity,
         Unit_Price, Serail_No, Description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          date,
          company,
          invoice_no,
          invoice_date,
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

      const [stockRows] = await pool.query(
        "SELECT * FROM stock WHERE Item_Name = ?",
        [item.item]
      );

      if (stockRows.length > 0) {

        // item exists → increase quantity
        await pool.query(
          `UPDATE stock
           SET quantity = quantity + ?
           WHERE Item_Name = ?`,
          [item.qty, item.item]
        );

      } else {

        // item not exists → insert new
        await pool.query(
          `INSERT INTO stock
           (Item_Name, quantity, Description, Unit_Price,Brand_Name)
           VALUES (?, ?, ?, ?,?)`,
          [
            item.item,
            item.qty,
            item.description,
            item.price,
            item.brand
          ]
        );
      }
    }

    res.json({ message: "Purchase + Stock Updated ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};