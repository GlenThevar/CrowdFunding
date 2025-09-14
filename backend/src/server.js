import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

import { router as Campaignrouter } from "./routes/CampaignRoutes.js";
import { router as AuthRouter } from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

app.use("/campaigns", Campaignrouter);
app.use("/auth", AuthRouter);
