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

export const sendCaptainLocationToRider = ({ riderId, rideId, lat, lng,distanceKm,durationMin, routeCoordinates }) => {
  const userSocket = getUserSocket()

  console.log("captain location updated")


  userSocket.to(riderId.toString()).emit("captain-location-updated", {
    rideId: rideId.toString(),
    lat: Number(lat),
    lng: Number(lng),
    distanceKm,
    durationMin,
    routeCoordinates,
  })
}

export const sendRideStartedToUser = (userId, ride) => {
    const userSocket = getUserSocket()

    userSocket.to(userId.toString()).emit("ride-started", {
        ride,
    })
}

export const sendRideCompletedToUser = (userId, ride) => {
    const userSocket = getUserSocket()

    userSocket.to(userId.toString()).emit("ride-completed", {
        ride,
    })
}