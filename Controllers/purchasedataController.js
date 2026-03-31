const pool = require("../config/db");

exports.searchPurchaseInvoice = async (req, res) => {

  try {

    const { invoice } = req.body;
   

    const [rows] = await pool.query(
      "SELECT * FROM purchase WHERE Invoice_No = ?",
      [invoice]
    );

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.updatePurchase = async (req, res) => {

  try {

    const {
      date,
      company,
      invoice,
      invoice_date,
      total_qty,
      amount,
      item,
      brand,
      serial,
      price,
      qty,
      desc
    } = req.body;

    // OLD QUANTITY
    const [oldData] = await pool.query(
      `SELECT Quantity FROM purchase WHERE Invoice_No=? AND Item_Name=?`,
      [invoice, item]
    );

    const oldQty = oldData[0].Quantity;

    const diff = qty - oldQty;

    // UPDATE PURCHASE
    await pool.query(
      `UPDATE purchase SET
        Date=?,
        Company_Name=?,
        Invoice_Date=?,
        Total_Quantity=?,
        Invoice_Amount=?,
        Brand_Name=?,
        Serail_No=?,
        Unit_Price=?,
        Quantity=?,
        Description=?
        WHERE Invoice_No=? And Item_Name=?`,
      [
        date,
        company,
        invoice_date,
        total_qty,
        amount,
        brand,
        serial,
        price,
        qty,
        desc,
        invoice,
        item
      ]
    );

    // UPDATE STOCK
    await pool.query(
      `UPDATE Stock 
       SET quantity = quantity + ?
       WHERE Item_Name=?`,
      [diff, item]
    );

    res.json({
      success: true,
      message: "Purchase Updated & Stock Adjusted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

};

exports.searchbydate = async (req, res) => {
  try {
    const { from, to } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM purchase where date between  ? and  ?",
      [from, to]
    );


    res.json({
      success: true,
      data: rows
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }


};