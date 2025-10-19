import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import garbageReportRouter from "./routers/garbageReportRouter.js";
import aiRecomandRouter from "./routers/aiRecomandRouter.js";
import chatRouter from "./routers/chatRouter.js";
import Chat from "./models/Chat.js";
import User from "./models/User.js";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

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
app.use("/api/ask", aiRecomandRouter);
app.use("/api/chat", chatRouter);

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
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, specify your frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins with their user ID
  socket.on("join", async (userId) => {
    try {
      socket.userId = userId;
      socket.join(userId);

      // Update user online status
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
        lastSeen: new Date(),
      });

      // Broadcast online status to all connected users
      socket.broadcast.emit("user_online", { userId });

      console.log(`User ${userId} is now online`);
    } catch (error) {
      console.error("Error on user join:", error);
    }
  });

  // Handle sending messages
  socket.on("send_message", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      // Save message to database
      const newMessage = new Chat({
        sender: senderId,
        receiver: receiverId,
        message,
      });
      await newMessage.save();

      // Populate sender info
      await newMessage.populate("sender", "username");

      // Send to receiver if online
      socket.to(receiverId).emit("receive_message", newMessage);

      // Send back to sender for confirmation
      socket.emit("message_sent", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("message_error", { error: "Failed to send message" });
    }
  });

  // Handle typing indicators
  socket.on("typing", (data) => {
    const { receiverId, isTyping } = data;
    socket.to(receiverId).emit("user_typing", {
      userId: socket.userId,
      isTyping,
    });
  });

  // Handle marking messages as seen
  socket.on("mark_seen", async (data) => {
    try {
      const { senderId, receiverId } = data;

      await Chat.updateMany(
        { sender: senderId, receiver: receiverId, isSeen: false },
        { isSeen: true, seenAt: new Date() }
      );

      // Notify sender that messages were seen
      socket.to(senderId).emit("messages_seen", { receiverId });
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    try {
      if (socket.userId) {
        // Update user offline status
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date(),
        });

        // Broadcast offline status
        socket.broadcast.emit("user_offline", {
          userId: socket.userId,
          lastSeen: new Date(),
        });

        console.log(`User ${socket.userId} disconnected`);
      }
    } catch (error) {
      console.error("Error on disconnect:", error);
    }
  });
});




const API_KEY = "dXrL4HMBC13Lv7qfYQ9TluYqAKnQwUomJMDhyTkV0NEreG44VPYNO1pn17OVCs0F";

// Example collectors (you can later store these in MongoDB)
const collectors = [
  {
    id: "C001",
    name: "Collector A",
    start: { lat: 6.843, lon: 79.865 },
    end: { lat: 6.921, lon: 79.857 },
  },
  {
    id: "C002",
    name: "Collector B",
    start: { lat: 6.835, lon: 79.845 },
    end: { lat: 6.905, lon: 79.865 },
  },
  {
    id: "C003",
    name: "Collector C",
    start: { lat: 6.830, lon: 79.870 },
    end: { lat: 6.920, lon: 79.880 },
  },
];

// Utility function to call DistanceMatrix API
async function getDrivingDistance(origin, destination) {
  const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin.lat},${origin.lon}&destinations=${destination.lat},${destination.lon}&key=${API_KEY}`;

  try {
    const res = await axios.get(url);

    // Log full API response for debugging
    console.log("Full DistanceMatrix response:", res.data);

    const element = res.data.rows[0].elements[0];

    if (element.status !== "OK") return { distance: Infinity, element };

    // Return distance and element so you can inspect
    return { distance: element.distance.value, element };
  } catch (err) {
    console.error("Error calling Distance Matrix API:", err.message);
    return { distance: Infinity, element: null };
  }
}
app.post("/assign", async (req, res) => {
  const { lat, lon } = req.body;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon are required" });
  }

  let nearestCollector = null;
  let minDistance = Infinity;

  for (const collector of collectors) {
    const toStart = await getDrivingDistance({ lat, lon }, collector.start);
    const toEnd = await getDrivingDistance({ lat, lon }, collector.end);

    // Print full Distance Matrix element for inspection
    console.log(`Distance to collector ${collector.name} start:`, toStart.element);
    console.log(`Distance to collector ${collector.name} end:`, toEnd.element);

    const shortest = Math.min(toStart.distance, toEnd.distance);

    if (shortest < minDistance) {
      minDistance = shortest;
      nearestCollector = collector;
    }
  }

  if (nearestCollector) {
    res.json({
      message: `Nearest collector assigned: ${nearestCollector.name}`,
      collector: nearestCollector,
      distance_meters: minDistance,
    });
  } else {
    res.status(404).json({ error: "No collector found" });
  }
});





server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
