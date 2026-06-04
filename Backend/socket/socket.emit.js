import { getCaptainSocket } from "./socket.js";

export const sendRideRequestToCaptains = (captains, ride) => {
  const captainSocket = getCaptainSocket();

  captains.forEach((captain) => {
    captainSocket.to(captain._id.toString()).emit("new-ride-request", {
      ride,
    });
  });
};