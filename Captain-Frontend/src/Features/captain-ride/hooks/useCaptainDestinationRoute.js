import { useEffect, useRef, useState } from "react"
import { getCaptainToDestinationRouteService } from "../services/captainRide.service"


const MIN_DISTANCE_TO_CALL_ROUTE_API = 25

const getDistanceInMeters = (lat1, lng1, lat2, lng2) => {
    const R = 6371000

    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

export const useCaptainDestinationRoute = ({ stage, currentRide }) => {
    const [captainDestinationLocation, setCaptainDestinationLocation] = useState(null)
    const [captainDestinationRoute, setCaptainDestinationRoute] = useState([])
    const [destinationRouteInfo, setDestinationRouteInfo] = useState({
        distanceKm: 0,
        durationMin: 0,
    })
    const [destinationInstruction, setDestinationInstruction] = useState(null)

    const isRunningRef = useRef(false)
    const lastRouteApiLocationRef = useRef(null)

    useEffect(() => {
        if (stage !== "navigating") {
            setCaptainDestinationLocation(null)
            setCaptainDestinationRoute([])
            setDestinationRouteInfo({
                distanceKm: 0,
                durationMin: 0,
            })
            setDestinationInstruction(null)

            isRunningRef.current = false
            lastRouteApiLocationRef.current = null

            return
        }

        if (!currentRide?.destination?.lat || !currentRide?.destination?.lng) return
        if (!navigator.geolocation) return

        let watchId

        const callRouteApi = async (currentLat, currentLng) => {
            if (isRunningRef.current) return

            try {
                isRunningRef.current = true

                const data = await getCaptainToDestinationRouteService({
                    currentLat,
                    currentLng,
                    destinationLat: currentRide.destination.lat,
                    destinationLng: currentRide.destination.lng,
                    vehicleType: currentRide.vehicle?.type,
                })

                setCaptainDestinationRoute(data.routeCoordinates || [])

                setDestinationRouteInfo({
                    distanceKm: data.distanceKm || 0,
                    durationMin: data.durationMin || 0,
                })

                setDestinationInstruction(data.instructions?.[0] || null)

                lastRouteApiLocationRef.current = {
                    lat: currentLat,
                    lng: currentLng,
                }
            } catch (error) {
                console.log(error.response?.data?.message || error.message)
            } finally {
                isRunningRef.current = false
            }
        }

        const handleLocationChange = (position) => {
            const currentLat = position.coords.latitude
            const currentLng = position.coords.longitude

            setCaptainDestinationLocation({
                lat: currentLat,
                lng: currentLng,
            })

            const lastRouteApiLocation = lastRouteApiLocationRef.current

            if (!lastRouteApiLocation) {
                callRouteApi(currentLat, currentLng)
                return
            }

            const distanceMoved = getDistanceInMeters(
                lastRouteApiLocation.lat,
                lastRouteApiLocation.lng,
                currentLat,
                currentLng
            )

            if (distanceMoved >= MIN_DISTANCE_TO_CALL_ROUTE_API) {
                callRouteApi(currentLat, currentLng)
            }
        }

        watchId = navigator.geolocation.watchPosition(
            handleLocationChange,
            () => {
                console.log("Unable to watch captain destination location")
            },
            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 12000,
            }
        )

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, [stage, currentRide?._id])

    return {
        captainDestinationLocation,
        captainDestinationRoute,
        destinationRouteInfo,
        destinationInstruction,
    }
}