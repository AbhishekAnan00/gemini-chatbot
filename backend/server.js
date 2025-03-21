import express from "express";
import cors from "cors";
import http from "http";
import { socketHandler } from "./socket/socketHandler.js";
import { Server } from "socket.io";
import ChatbotRoute from "./route/ChatbotRoute.js";
import dotenv from "dotenv";
import AuthRoute from "./route/AuthRoute.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", ChatbotRoute);
app.use("/auth",AuthRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
