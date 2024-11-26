import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());


//MongoDB Connection
mongoose.connect("mongodb://localhost:27017");
const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB Connection Error:", err));

// Chat Schema
const chatSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Chat = mongoose.model("Chat", chatSchema);


// API Route to fetch chat history
app.get("/api/chats", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// WebSocket Implementation
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Receive message from client
  socket.on("sendMessage", async (data) => {
    try {
      const chat = new Chat(data);
      await chat.save(); // Save message to MongoDB
      io.emit("receiveMessage", data); // Broadcast message to all connected clients
    } catch (error) {
      console.error("Error saving message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Start Server
const PORT = process.env.PORT || 5100;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));