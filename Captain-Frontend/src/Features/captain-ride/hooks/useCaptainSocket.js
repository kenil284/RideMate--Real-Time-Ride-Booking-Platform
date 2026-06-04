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
      console.log("New ride request received:", ride);

      playRideRequestSound();

      setRequests((prev) => [...prev, ride]);
      setStage("requests");
    });
  }, []);

  return { socketstate };
};