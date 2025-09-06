import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import CampaignRoutes from "./routes/CampaignRoutes.js";
dotenv.config();
const app = express();
const port = process.env.port|| 3000;


connectDB()

app.get('/', (req, res) => {
  res.send('Hello Mardav')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/about',(req,res)=>{
  res.status(200).send("Checking ");
})


