import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import garbageReportRouter from "./routers/garbageReportRouter.js";
import aiRecomandRouter from './routers/aiRecomandRouter.js'

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI).then(() => {
      console.log("MongoDB Connected");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();


app.get("/", (req, res) => {
  res.json({
    message: "Garbage Management System API",
    status: "Running",
    port: PORT,
  });
});


app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/garbage", garbageReportRouter);
app.use("/api/ask", aiRecomandRouter)

import { GoogleGenerativeAI } from "@google/generative-ai";

app.get("/api/list-models", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
