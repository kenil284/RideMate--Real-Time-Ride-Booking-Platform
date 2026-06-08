import { Server } from "socket.io";
import cookie from "cookie";
import { verifyAccessToken } from "../utils/jwt.util.js";
import captainModel from "../models/captain.model.js";
import userModel from "../models/user.model.js";


let captainSocket;
let userSocket;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.RIDER_FRONTEND_URL,
  process.env.CAPTAIN_FRONTEND_URL
]

export const initSocket = (server) => {
  const io = new Server(server, {
   cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    }
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


    // room name is captain collection _id
    socket.join(socket.captainId);



    socket.on("disconnect", async () => {

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


    // room name is user collection id
    socket.join(socket.userId);



    socket.on("disconnect", () => {


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

