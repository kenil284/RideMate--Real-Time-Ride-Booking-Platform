import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    console.log("Socket initialized");
};

export const getIO = () => {
    return io;
};