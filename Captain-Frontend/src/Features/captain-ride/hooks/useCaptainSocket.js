import { useContext, useEffect, useState } from "react";
import { connectSocket } from "../../../services/socket.service";
import { playRideRequestSound } from "../services/notificationSound.service";
import { captainContext } from "../../../Context/CaptainContext";

export const useCaptainSocket = ({ setCurrentRide,setRequests, setStage }) => {
  const [socketstate, setSocketstate] = useState(null);

  const {openalert} = useContext(captainContext)

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {

      setSocketstate(socket);
    });

    socket.on("disconnect", () => {

      setSocketstate(null);
    });

    socket.on("new-ride-request", ({ ride }) => {


      playRideRequestSound();

      setRequests((prev) => [...prev, ride]);
      setStage("requests");
    });


    socket.on("ride-request-expired", ({ rideId }) => {


      setRequests((prev) => {
        const updatedRequests = prev.filter((ride) => ride._id !== rideId)

        if (updatedRequests.length === 0) {
          setStage("looking")
        }

        return updatedRequests
      })
    })


    socket.on("ride-accepted", ({ ride }) => {


      setRideData((prev) => ({
        ...prev,
        ...ride,
      }))

      setStage("waiting")
    })

    socket.on("ride-cancelled-by-rider", ({ ride }) => {

    setRequests([])
    setCurrentRide(null)
    setStage("looking")

    openalert("Info", "Rider cancelled the ride")
})

   

  }, [])

  return { socketstate };
};