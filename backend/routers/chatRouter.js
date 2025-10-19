import express from "express";
import {
  getChatHistory,
  getChatUsers,
  markMessagesAsSeen,
  getUnreadCount,
  sendMessage,
  getChatContacts,
} from "../controllers/chatController.js";

const router = express.Router();

// Add this line to the router
router.post("/send", sendMessage);

// Get all users available for chat (POST with currentUserId in body)
router.post("/users", getChatUsers);

// Get chat history with a specific user (POST with currentUserId in body)
router.post("/history/:userId", getChatHistory);

// Mark messages as seen from a specific sender (POST with currentUserId in body)
router.post("/seen/:senderId", markMessagesAsSeen);

// Get unread message count (POST with currentUserId in body)
router.post("/unread-count", getUnreadCount);

// Get chat contacts (users the current user has chatted with, ordered by last conversation)
router.post("/contacts", getChatContacts);

export default router;
