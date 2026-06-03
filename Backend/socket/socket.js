import { Server } from "socket.io";
import cookie from "cookie";
import { verifyAccessToken } from "../utils/jwt.util.js";
import captainModel from "../models/captian.model.js";
import userModel from "../models/user.model.js";



export const initSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  console.log("Socket initialized");

  const captainSocket = io.of("/captain");
  const userSocket = io.of("/user");

  captainSocket.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "")

      const token = cookies.captainAccessToken

      if (!token) {
        return next(new Error("Unauthorized captain"))
      }

      const decoded = verifyAccessToken(token)

      const captain = await captainModel.findById(decoded.userId)

      if (!captain) {
        return next(new Error("Captain not found"))
      }

      socket.captainId = captain._id

      next()

    } catch (error) {
      next(new Error("Unauthorized captain"))
    }
  });

  userSocket.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "")

      const token = cookies.userAccessToken

      if (!token) {
        return next(new Error("Unauthorized user"))
      }

      const decoded = verifyAccessToken(token);

      const user = await userModel.findById(decoded.userId)

      if (!user) {
        return next(new Error("User not found"))
      }

      socket.userId = user._id.toString()

      next();
    } catch (error) {
      next(new Error("Unauthorized user"))
    }
  });

  captainSocket.on("connection", (socket) => {
    console.log("Captain connected:", socket.captainId, socket.id)
  });

  userSocket.on("connection", (socket) => {
    console.log("User connected:", socket.userId, socket.id)
  });
};