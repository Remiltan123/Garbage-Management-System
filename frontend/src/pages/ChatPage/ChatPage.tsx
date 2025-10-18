import { useState, useEffect } from "react";
import "./ChatPage.css";
import {
  getCurrentUser,
  getChatUsers,
  getChatHistory,
  sendMessage,
} from "../../utility/api";
import { FaCheck } from "react-icons/fa";

interface User {
  _id: string;
  username: string;
  email: string;
  isOnline: boolean;
  lastSeen: Date;
}

interface Message {
  _id: string;
  sender: { _id: string; username: string };
  receiver: { _id: string; username: string };
  message: string;
  isSeen: boolean;
  createdAt: string;
}

const ChatPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      fetchUsers(user.id);
    } else {
      // Handle not logged in, but since protected route, shouldn't happen
      console.error("No user found");
    }
  }, []);

  useEffect(() => {
    if (selectedUser && currentUser) {
      fetchMessages(selectedUser._id);
      const interval = setInterval(() => {
        fetchMessages(selectedUser._id);
      }, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [selectedUser, currentUser]);

  const fetchUsers = async (userId: string) => {
    const data = await getChatUsers(userId);
    if (data.success) {
      setUsers(data.users);
    }
  };

  const fetchMessages = async (userId: string) => {
    const data = await getChatHistory(userId, currentUser.id);
    if (data.success) {
      setMessages(data.messages);
    }
  };

  const sendMessageHandler = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    if (!currentUser || !currentUser.id) {
      alert("User not logged in");
      return;
    }
    const data = await sendMessage(
      currentUser.id,
      selectedUser._id,
      newMessage
    );
    if (data.success) {
      setNewMessage("");
      fetchMessages(selectedUser._id); // Refresh messages
    } else {
      alert(`Error sending message: ${data.message} - ${data.error}`);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="users-list">
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className={selectedUser?._id === user._id ? "active" : ""}
                onClick={() => setSelectedUser(user)}
              >
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <span
                    className={`status ${user.isOnline ? "online" : "offline"}`}
                  >
                    {user.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <h3>Chat with {selectedUser.username}</h3>
              </div>
              <div className="messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message ${
                      msg.sender._id === currentUser.id ? "sent" : "received"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <div className="message-footer">
                      <span className="timestamp">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                      {msg.sender._id === currentUser.id && (
                        <FaCheck
                          className={`tick ${msg.isSeen ? "seen" : "unseen"}`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessageHandler()}
                />
                <button onClick={sendMessageHandler}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
