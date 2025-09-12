import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
// import cors from "cors";
import CampaignRoutes from "./routes/CampaignRoutes.js";

const app = express();
const port = process.env.PORT|| 3000;

dotenv.config();

app.use(express.json());
connectDB()

app.use("/api/campaign", CampaignRoutes);


connectDB().then(() => {

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
    console.error("Failed to connect to database. Server not started.", error);
    process.exit(1);
});


