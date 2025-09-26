import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import CampaignRoutes from "./routes/CampaignRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for local frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api/campaign", CampaignRoutes);
app.use("/api/payment", PaymentRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database. Server not started.", error);
    process.exit(1);
  });



