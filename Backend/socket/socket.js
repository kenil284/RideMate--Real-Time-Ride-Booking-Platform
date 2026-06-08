import { Server } from "socket.io";
import cookie from "cookie";
import { verifyAccessToken } from "../utils/jwt.util.js";
import captainModel from "../models/captain.model.js";
import userModel from "../models/user.model.js";


let captainSocket;
let userSocket;

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  captainSocket = io.of("/captain");
  userSocket = io.of("/user");

  // auth middleware
  captainSocket.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.captainAccessToken;

      if (!token) {
        return next(new Error("Unauthorized captain"));
      }

      const decoded = verifyAccessToken(token);

      const captain = await captainModel.findById(decoded.userId);

      if (!captain) {
        return next(new Error("Captain not found"));
      }

      socket.captainId = captain._id.toString();

      next();
    } catch (error) {
      next(new Error("Unauthorized captain"));
    }
  });

  userSocket.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies.userAccessToken;

      if (!token) {
        return next(new Error("Unauthorized user"));
      }

      const decoded = verifyAccessToken(token);

      const user = await userModel.findById(decoded.userId);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.userId = user._id.toString();

      next();
    } catch (error) {
      next(new Error("Unauthorized user"));
    }
  });

  captainSocket.on("connection", (socket) => {
    console.log("Captain connected:", socket.captainId, socket.id);

    // room name is captain collection _id
    socket.join(socket.captainId);

    console.log("Captain joined room:", socket.captainId);

    socket.on("disconnect", async () => {
      console.log("Captain disconnected:", socket.captainId, socket.id);
      try {
        await captainModel.findByIdAndUpdate(socket.captainId, {
          $set: {
            isAvailable: false,
          },
        })
      } catch (error) {

      }
    })
  })


  userSocket.on("connection", (socket) => {
    console.log("User connected:", socket.userId, socket.id);

    // room name is user collection id
    socket.join(socket.userId);

    console.log("User joined room:", socket.userId);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.userId, socket.id);

    })
  })

  console.log("Socket initialized");
};

export const getCaptainSocket = () => {
  if (!captainSocket) {
    throw new Error("Captain socket not initialized");
  }

  return captainSocket;
};

export const getUserSocket = () => {
  if (!userSocket) {
    throw new Error("User socket not initialized");
  }

  return userSocket;
};

