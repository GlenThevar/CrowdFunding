import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
console.log("Loaded ENV:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

import CampaignRoutes from "./routes/CampaignRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";

const app = express();
const port = process.env.PORT|| 3000;



app.use(express.json());

connectDB()

app.use("/api/campaign", CampaignRoutes);
app.use("/api/payment",PaymentRoutes);


connectDB().then(() => {

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
    console.error("Failed to connect to database. Server not started.", error);
    process.exit(1);
});



