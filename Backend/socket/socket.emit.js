import { getCaptainSocket, getUserSocket } from "./socket.js";

export const sendRideRequestToCaptains = (captains, ride) => {
  const captainSocket = getCaptainSocket();

  captains.forEach((captain) => {
    captainSocket.to(captain._id.toString()).emit("new-ride-request", {
      ride,
    });
  });
};

export const sendNoCaptainFoundToUser = (userId, ride) => {
  const userSocket = getUserSocket()


  userSocket.to(userId.toString()).emit("no-captain-found", {
    ride,
  })
}

export const sendRideExpiredToCaptains = (captains, ride) => {
  const captainSocket = getCaptainSocket()


  captains.forEach((captain) => {
    captainSocket.to(captain._id.toString()).emit("ride-request-expired", {
      rideId: ride._id,
    })
  })
}

export const sendRideAcceptedToUser = (userId, ride) => {
    const userSocket = getUserSocket()

    

    userSocket.to(userId.toString()).emit("ride-accepted", {
        ride,
    })
}

export const removeRideRequestFromCaptains = (rideId) => {
    const captainSocket = getCaptainSocket()

    captainSocket.emit("ride-request-expired", {
        rideId: rideId.toString(),
    })
}