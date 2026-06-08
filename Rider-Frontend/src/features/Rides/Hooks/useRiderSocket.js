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
      console.log("Ride accepted:", ride)

      setRideData((prev) => ({
        ...prev,
        ...ride,

        vehicle: {
          ...prev.vehicle,
          ...ride.vehicle,
        },

      }))

      setStage("waiting")
    })

    socket.on("captain-location-updated", ({ rideId, lat, lng, distanceKm, durationMin, routeCoordinates, }) => {

      setRideData((prev) => {
        if (prev._id !== rideId) return prev

        return {
          ...prev,

          captain: {
            ...prev.captain,
            location: {
              type: "Point",
              coordinates: [Number(lng), Number(lat)],
            },
          },

          captainToPickupRoute: routeCoordinates || [],

          captainToPickupInfo: {
            distanceKm: distanceKm || 0,
            durationMin: durationMin || 0,
          },
        }
      })
    })

    socket.on("ride-started", ({ ride }) => {

      setRideData((prev) => ({
        ...prev,
        ...ride,

        vehicle: {
          ...prev.vehicle,
          ...ride.vehicle,
        },
      }))

      setStage("riding")
    })

    socket.on("ride-completed", ({ ride }) => {
      console.log("Ride completed:", ride)

      setRideData((prev) => ({
        ...prev,

        _id: "",
        rider: null,
        captain: null,

        pickup: {
          address: "",
          lat: null,
          lng: null,
        },

        destination: {
          address: "",
          lat: null,
          lng: null,
        },

        distanceKm: 0,
        durationMin: 0,

        vehicle: {
          type: "",
          name: "",
          image: "",
          capacity: 1,
        },

        fare: 0,

        paymentMethod: "cash",
        paymentStatus: "pending",

        status: "",

        otp: "",

        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,

        captainToPickupRoute: [],
        captainToPickupInfo: {
          distanceKm: 0,
          durationMin: 0,
        },
      }))

      setStage("location")
    })

    socket.on("ride-cancelled-by-captain", ({ ride }) => {
  
    setRideData((prev) => ({
        ...prev,
        captain: null,
        status: "",
        otp: "",

        captainToPickupRoute: [],
        captainToPickupInfo: {
            distanceKm: 0,
            durationMin: 0,
        },
    }))
    openalert("Info","Ride Cancelled By Captain")

    setStage("confirm")
})

    return () => {
      disconnectSocket();
    };
  }, []);

  return { socketstate }
};

