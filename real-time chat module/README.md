**Real-Time Chat Application**

This is a real-time chat application built using Node.js, Express, Socket.IO, and MongoDB. It supports live messaging and stores chat history in MongoDB for persistence.

**Features**

1. Real-Time Messaging: Enables instant communication between users using WebSockets.
2. Message Persistence: Messages are stored in MongoDB, ensuring chat history is saved.
3. Chat History: Displays all previous messages when a user connects.
4. Responsive Design: Optimized for various screen sizes (frontend-specific).

**Technologies Used**
Backend: Node.js, Express.js, Socket.IO
Database: MongoDB
Frontend: React (with Socket.IO Client)
Styling: Tailwind CSS
Package Manager: npm

**Installation**

Prerequisites

Ensure you have the following installed:
1. Node.js
2. MongoDB 

Steps to Run the Application

1. Clone the Repository

git clone https://github.com/Ashi-Jain07/Chat-App
cd Chat-App

2. Backend Setup

Navigate to the backend folder:
cd NodeJs
Install dependencies: npm install
Start the backend server: npm start

3. Frontend Setup

Navigate to the frontend folder:
cd real-time chat module
Install dependencies: npm install
Start the development server: npm run dev

4. Access the Application

Open your browser and navigate to http://localhost:3000.

**API Endpoints**

1. Fetch Chat History

URL: /api/chats
Method: GET
Response: Returns an array of chat messages sorted by timestamp.

2. Socket.IO Events

Client-Side Events
sendMessage: Emitted when a user sends a message.
receiveMessage: Listens for new messages broadcasted by the server.

Server-Side Events
sendMessage: Listens for messages from clients.
receiveMessage: Broadcasts messages to all connected clients.

**Future Enhancements**
1. User Authentication: Add user login and registration.
2. Private Chats: Implement one-on-one messaging.
3. Typing Indicator: Show when a user is typing.
4. Notifications: Real-time notifications for new messages.