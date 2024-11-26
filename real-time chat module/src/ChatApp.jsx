import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5100");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Listen for real-time messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Clean up on component unmount
    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5100/api/chats")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching chats:", err));
  }, []);

  const sendMessage = () => {
    if (input && username) {
      const messageData = {
        sender: username,
        message: input,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", messageData); // Send message to backend
      setInput(""); // Clear the input field
    }
  };

  return (
    <div className="p-5 flex justify-around relative top-40">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-center mb-10">Real-Time Chat</h1>

        <div className="mb-5 w-2/5" >
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mr-2.5 w-64 h-10 border border-black rounded-md p-1 text-xl shadow-black shadow-md"
          />
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-2.5 w-64 h-10 border border-black rounded-md p-1 text-xl shadow-black shadow-md"
          /> <br />
          <button className="mt-5 border border-black p-2 bg-slate-200 rounded-md" onClick={sendMessage}>Send</button>
        </div>
      </div>
      <div className="border border-black p-2.5 h-72 overflow-y-scroll w-2/5">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            <span>{msg.message}</span>
            <small className="float-right text-white">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;