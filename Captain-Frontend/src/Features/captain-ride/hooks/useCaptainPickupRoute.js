import { useEffect, useRef, useState } from "react"
import { getCaptainToPickupRouteService } from "../services/captainRide.service"

const SEND_LOCATION_TIME = 8000
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

export const useCaptainPickupRoute = ({ stage, currentRide, onSendLocation }) => {
    const [captainCurrentLocation, setCaptainCurrentLocation] = useState(null)
    const [captainRoute, setCaptainRoute] = useState([])
    const [routeInfo, setRouteInfo] = useState({
        distanceKm: 0,
        durationMin: 0,
    })

    const [nextInstruction, setNextInstruction] = useState(null)


    const isRunningRef = useRef(false)
    const lastRouteApiLocationRef = useRef(null)
    const latestLocationRef = useRef(null)
    const lastRouteRef = useRef([])

    useEffect(() => {
        if (stage !== "accepted") {
            setCaptainCurrentLocation(null)
            setCaptainRoute([])
            setRouteInfo({
                distanceKm: 0,
                durationMin: 0,
            })

            isRunningRef.current = false
            lastRouteApiLocationRef.current = null
            latestLocationRef.current = null
            lastRouteRef.current = []

            return
        }

        if (!currentRide?.pickup?.lat || !currentRide?.pickup?.lng) return
        if (!navigator.geolocation) return

        let watchId
        let sendLocationInterval
        let routeRefreshTimer1
        let routeRefreshTimer2

        const callRouteApi = async (currentLat, currentLng, isFirstTime = false) => {
            if (isRunningRef.current) return

            try {
                isRunningRef.current = true

                const data = await getCaptainToPickupRouteService({
                    rideId: currentRide._id,
                    currentLat,
                    currentLng,
                    pickupLat: currentRide.pickup.lat,
                    pickupLng: currentRide.pickup.lng,
                    vehicleType: currentRide.vehicle?.type,
                })

                setNextInstruction(data.instructions?.[0] || null)

                const route = data.routeCoordinates || data.route || []

                lastRouteRef.current = route
                setCaptainRoute([...route])

                setRouteInfo({
                    distanceKm: data.distanceKm || 0,
                    durationMin: data.durationMin || 0,
                })

                lastRouteApiLocationRef.current = {
                    lat: currentLat,
                    lng: currentLng,
                }

                if (isFirstTime) {
                    routeRefreshTimer1 = setTimeout(() => {
                        setCaptainRoute([...lastRouteRef.current])
                    }, 1500)

                    routeRefreshTimer2 = setTimeout(() => {
                        setCaptainRoute([...lastRouteRef.current])
                    }, 3000)
                }
            } catch (error) {

            } finally {
                isRunningRef.current = false
            }
        }

        const handleLocationChange = (position) => {
            const currentLat = position.coords.latitude
            const currentLng = position.coords.longitude

            const newLocation = {
                lat: currentLat,
                lng: currentLng,
            }

            latestLocationRef.current = newLocation
            setCaptainCurrentLocation(newLocation)

            const lastRouteApiLocation = lastRouteApiLocationRef.current

            if (!lastRouteApiLocation) {
                callRouteApi(currentLat, currentLng, true)
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

            },
            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 12000,
            }
        )

        sendLocationInterval = setInterval(() => {
            if (!latestLocationRef.current) return

            if (onSendLocation) {
                onSendLocation({
                    rideId: currentRide._id,
                    lat: latestLocationRef.current.lat,
                    lng: latestLocationRef.current.lng,
                })
            }
        }, SEND_LOCATION_TIME)

        return () => {
            navigator.geolocation.clearWatch(watchId)
            clearInterval(sendLocationInterval)
            clearTimeout(routeRefreshTimer1)
            clearTimeout(routeRefreshTimer2)
        }
    }, [stage, currentRide?._id])

    return {
        captainCurrentLocation,
        captainRoute,
        routeInfo,
        nextInstruction
    }
}