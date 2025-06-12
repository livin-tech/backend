import dotenv from "dotenv";
import mongoose from "mongoose";

import { config } from "@/config";

// Load environment variables from .env file
dotenv.config();

// Fallback MongoDB URI for local development
const FALLBACK_MONGO_URI = "mongodb://localhost:27017/liviin_db";

export const connectToDatabase = async () => {
  const mongoURI = config.mongodb.uri || FALLBACK_MONGO_URI;
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
