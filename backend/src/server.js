import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as Campaignrouter } from "./routes/CampaignRoutes.js";
import { router as AuthRouter } from "./routes/AuthRoutes.js";
import { router as UserRouter } from "./routes/UserRoute.js";
import { router as ChatRouter } from "./routes/ChatRoutes.js";
// import { router as PaymentRouter } from "./routes/PaymentRoute.js";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
app.use("/user", UserRouter);
app.use("/chat", ChatRouter);
// app.use("/payment", PaymentRouter);
