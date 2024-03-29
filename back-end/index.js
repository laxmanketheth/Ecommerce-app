const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const dotenv = require('dotenv');
const userRoute = require("./routes/user"); 
const authRoute = require("./routes/auth"); 
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe")
const cors = require("cors")

dotenv.config();

app.use(cors(
    {
        origin: "https://ecommerce-app-frontend-tau.vercel.app",
        methods: ["POST","PUT", "GET", "DELETE"],
        credentials: true
    }
));

mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("DB Connection Successful"))
        .catch((err)=>console.log(err));

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute); 

app.listen(8080,()=>{
    console.log("listening to port 8080");
})