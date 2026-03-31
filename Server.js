const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'views')));
app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/purchase', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'purchase.html'));
});
app.get('/sales', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sales.html'));
});
app.get('/stock', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'stock.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
app.get('/PurchaseData', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'PurchaseData.html'));
});
app.get('/SaleData', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'SaleData.html'));
});
app.get('/Inventory', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Inventory.html'));
});
app.get('/forgetpassword',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','Forget_password.html'));
})


// Routes
const authRoutes = require("./routes/authRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const purchasedataRoutes=require("./routes/purchasedataRoutes");
const saledataRoutes=require("./routes/saledataRoutes");
const InventorydataRoutes=require("./routes/InventorydataRoutes");
const forgetpasswordRoutes=require("./routes/forgetpasswordRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/purchase",purchasedataRoutes);
app.use("/api/sale",saledataRoutes);
app.use("/api/Inventory",InventorydataRoutes);
app.use("/api/forget",forgetpasswordRoutes);


//app.listen(3002, () => {
  //  console.log('Server running on http://localhost:3002');
//});
app.listen(3002, "0.0.0.0", () => {
    console.log("Server running on port 3002");
});
