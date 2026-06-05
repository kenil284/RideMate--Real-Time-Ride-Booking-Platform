import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../../../services/socket.service";
import { useContext } from "react";
import { userContext } from "../../../Context/UserContextProvider";


export const useRiderSocket = ({ setRideData, setStage }) => {

  const { openalert } = useContext(userContext)

  const [socketstate, setSocketstate] = useState(null)

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      setSocketstate(socketstate)
    });

    socket.on("disconnect", () => {
      setSocketstate(null)
    });

    socket.on("no-captain-found", ({ ride }) => {
      openalert("Error", "Sorry, no captain available right now")
      setStage("confirm")
    })

    socket.on("ride-accepted", ({ ride }) => {
  
      setRideData((prev) => ({
        ...prev,
        ...ride,

        rideId: ride._id,

        vehicle: {
          ...prev.vehicle,
          ...ride.vehicle,
        },
      }))

      setStage("waiting")
    })



    return () => {
      disconnectSocket();
    };
  }, []);

  return { socketstate }
};