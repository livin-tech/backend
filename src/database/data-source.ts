import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

export const connectToDatabase = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/liviin_db";

  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
