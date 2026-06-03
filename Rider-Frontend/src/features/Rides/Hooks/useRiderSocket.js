import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../../../services/socket.service";


export const useRiderSocket = () => {

  const [socketstate,setSocketstate] = useState(null)
  
  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      setSocketstate(socketstate)
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setSocketstate(null)
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return {socketstate}
};