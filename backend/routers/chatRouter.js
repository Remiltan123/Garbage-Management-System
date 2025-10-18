import express from "express";
import {
  getChatHistory,
  getChatUsers,
  markMessagesAsSeen,
  getUnreadCount,
} from "../controllers/chatController.js";

const router = express.Router();

// Get all users available for chat (POST with currentUserId in body)
router.post("/users", getChatUsers);

// Get chat history with a specific user (POST with currentUserId in body)
router.post("/history/:userId", getChatHistory);

// Mark messages as seen from a specific sender (POST with currentUserId in body)
router.post("/seen/:senderId", markMessagesAsSeen);

// Get unread message count (POST with currentUserId in body)
router.post("/unread-count", getUnreadCount);

export default router;
