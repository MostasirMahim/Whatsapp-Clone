import { Server } from "socket.io";
import http from "http";
import e from "express";
import cors from "cors";

//Create Express Server
const app = e();
app.use(cors());

//Create HTTP Server With Express
const server = http.createServer(app);

//Create Socket Server With HTTP & Set CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://whatsup-mmco.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Export reciver Socket Id To Send Msg
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

//Collect All Socket Users ID
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
