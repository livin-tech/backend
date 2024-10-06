import * as dotenv from "dotenv";
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import path from "node:path";
import cors from "cors";
import express from "express";

import { connectToDatabase } from "./database/data-source";
import apiRouter from "./routes";

// Load environment variables from .env file as early as possible
dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// API routes
app.use("/api", apiRouter);

// Connect to the database and then start the server
connectToDatabase()
  .then(() => {
    const port = process.env.PORT || 10000;
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/api`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
