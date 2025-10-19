import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

// Add this function to chatController.js
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    const newMessage = new Chat({
      sender,
      receiver,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get chat history between two users
export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentUserId } = req.body; // User sends their own ID

    const messages = await Chat.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat history",
      error: error.message,
    });
  }
};

// Get all users for chat (excluding current user)
export const getChatUsers = async (req, res) => {
  try {
    const { currentUserId } = req.body;

    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("username email isOnline lastSeen")
      .sort({ isOnline: -1, lastSeen: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Mark messages as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { senderId } = req.params;
    const { currentUserId } = req.body;

    await Chat.updateMany(
      { sender: senderId, receiver: currentUserId, isSeen: false },
      { isSeen: true, seenAt: new Date() }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking messages as seen",
      error: error.message,
    });
  }
};

// Get unread message count
export const getUnreadCount = async (req, res) => {
  try {
    const { currentUserId } = req.body;

    const unreadCount = await Chat.countDocuments({
      receiver: currentUserId,
      isSeen: false,
    });

    res.status(200).json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching unread count",
      error: error.message,
    });
  }
};

// Get users the current user has chatted with, ordered by last conversation
export const getChatContacts = async (req, res) => {
  try {
    const { currentUserId } = req.body;

    // Convert currentUserId to ObjectId for proper comparison
    const userId = new mongoose.Types.ObjectId(currentUserId);

    // Find all chats where current user is involved
    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    // Get unique user IDs that the current user has chatted with
    const contactIds = new Set();
    chats.forEach((chat) => {
      if (chat.sender.toString() === currentUserId) {
        contactIds.add(chat.receiver.toString());
      } else {
        contactIds.add(chat.sender.toString());
      }
    });

    // Get user details for contacts
    const users = await User.find({
      _id: { $in: Array.from(contactIds) },
    }).select("username email isOnline lastSeen");

    // For each contact, find the last message and timestamp
    const contactsWithDetails = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Chat.findOne({
          $or: [
            { sender: userId, receiver: user._id },
            { sender: user._id, receiver: userId },
          ],
        })
          .sort({ createdAt: -1 })
          .select("message createdAt");

        return {
          ...user.toObject(),
          lastMessageAt: lastMessage?.createdAt || null,
          lastMessage: lastMessage?.message || null,
        };
      })
    );

    // Sort by last message timestamp (most recent first)
    contactsWithDetails.sort((a, b) => {
      if (!a.lastMessageAt && !b.lastMessageAt) return 0;
      if (!a.lastMessageAt) return 1;
      if (!b.lastMessageAt) return -1;
      return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
    });

    res.status(200).json({
      success: true,
      contacts: contactsWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat contacts",
      error: error.message,
    });
  }
};
