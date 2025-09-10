import mongoose from "mongoose";
export const connectDB=async()=>{
    try {
        // await mongoose.connect("mongodb+srv://mardavjain07_db_user:JAV6w7j7uF4HzrUg@cluster0.plh6e9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await mongoose.connect(process.env.Mongo_uri);
        console.log("Database connected Successfully")
    } catch (error) {
        console.log("Error connecting to database:", error.message);
        process.exit(1);
    }
};