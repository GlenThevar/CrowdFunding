import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
// import cors from "cors";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT|| 3000;

app.use(express.json());
connectDB()

app.get('/', (req, res) => {
  res.send('Hello Mardav')
})

app.get('/about',(req,res)=>{
  res.status(200).send("Checking ");

})
app.use("/api/campaign", CampaignRoutes);
app.use("/api/users",userRoutes);


connectDB().then(() => {

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
    console.error("Failed to connect to database. Server not started.", error);
    process.exit(1);
});


