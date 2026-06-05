import { useEffect, useState } from "react";
import { connectSocket } from "../../../services/socket.service";
import { playRideRequestSound } from "../services/notificationSound.service";

export const useCaptainSocket = ({ setRequests, setStage }) => {
  const [socketstate, setSocketstate] = useState(null);

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Captain socket connected:", socket.id);
      setSocketstate(socket);
    });

    socket.on("disconnect", () => {
      console.log("Captain socket disconnected");
      setSocketstate(null);
    });

    socket.on("new-ride-request", ({ ride }) => {


      playRideRequestSound();

      setRequests((prev) => [...prev, ride]);
      setStage("requests");
    });


    socket.on("ride-request-expired", ({ rideId }) => {

      console.log("ride request expired")
      setRequests((prev) => {
        const updatedRequests = prev.filter((ride) => ride._id !== rideId)

        if (updatedRequests.length === 0) {
          setStage("looking")
        }

        return updatedRequests
      })
    })


    socket.on("ride-accepted", ({ ride }) => {
      console.log("Ride accepted:", ride)

      setRideData((prev) => ({
        ...prev,
        ...ride,
      }))

      setStage("waiting")
    })
    
  }, [])

  return { socketstate };
};