import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

// Connect to database
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Garbage Management System API",
    status: "Running",
    port: PORT,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
