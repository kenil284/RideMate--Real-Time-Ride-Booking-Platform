import { useEffect } from "react"
import { connectTrackingSocket } from "../services/tracking.socket"


export const useTrackingSocket = ({trackingToken,setTracking}) => {

  useEffect(() => {

    if (!trackingToken) return

    const socket = connectTrackingSocket()

    socket.on("connect", () => {
      socket.emit("join-tracking", trackingToken)
    })

    socket.on("captain-location-updated", (data) => {
      setTracking((prev) => ({
        ...prev,
        lat: data.lat,
        lng: data.lng,
        distanceKm: data.distanceKm,
        durationMin: data.durationMin,
        routeCoordinates: data.routeCoordinates,
      }))
    })

    socket.on("disconnect", () => {

    })

    return () => {

      socket.off("captain-location-updated")

      socket.disconnect()

    }

  }, [trackingToken, setTracking])

}