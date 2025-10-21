import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_uri);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Error connecting to database:", error.message);
    process.exit(1);
  }
};
