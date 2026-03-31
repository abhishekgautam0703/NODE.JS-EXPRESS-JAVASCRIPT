const pool = require("../config/db");
exports.searchbyItem = async (req, res) => {

  try {

    const { item } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM stock WHERE Item_Name = ?",
      [item]
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
exports.updateStock = async (req, res) => {

  try {

    const {
      id,
      item,
      brand,
      qty,
      price,
      desc
    } = req.body;

    // OLD QUANTITY
    const [oldData] = await pool.query(
      `SELECT Quantity FROM Stock WHERE  Item_Name=?`,
      [item]
    );

    const oldQty = oldData[0].Quantity;

    const diff = qty - oldQty;

    // UPDATE PURCHASE
    await pool.query(
      `UPDATE stock SET
      id=?,
        Brand_Name=?,
        Quantity=?,
        Description=?,
        Unit_Price=?
        WHERE Item_Name=?`,
      [
        id,
        brand,
        qty,
        desc,
        price,
        item
      ]
    );

    res.json({
      success: true,
      message: " Stock Updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

};
exports.loadstockdata = async (req, res) => {

  try {


    const [rows] = await pool.query(
      "SELECT * FROM stock"
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