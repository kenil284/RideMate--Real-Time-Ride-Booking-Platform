import { useEffect, useRef, useState } from "react"
import { getCaptainToPickupRouteService } from "../services/captainRide.service"

const CHECK_LOCATION_TIME = 15000 // 15 seconds
const MIN_DISTANCE_TO_CALL_API = 25 // meters

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

export const useCaptainPickupRoute = ({ stage, currentRide }) => {
    const [captainCurrentLocation, setCaptainCurrentLocation] = useState(null)
    const [captainRoute, setCaptainRoute] = useState([])
    const [routeInfo, setRouteInfo] = useState({
        distanceKm: 0,
        durationMin: 0,
    })

    const isRunningRef = useRef(false)
    const lastApiLocationRef = useRef(null)
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
            lastApiLocationRef.current = null
            lastRouteRef.current = []

            return
        }

        if (!currentRide?.pickup?.lat || !currentRide?.pickup?.lng) return
        if (!navigator.geolocation) return

        let intervalId
        let routeRefreshTimer1
        let routeRefreshTimer2

        const callRouteApi = async (currentLat, currentLng, isFirstTime = false) => {
            if (isRunningRef.current) return

            try {
                isRunningRef.current = true

                const data = await getCaptainToPickupRouteService({
                    currentLat,
                    currentLng,
                    pickupLat: currentRide.pickup.lat,
                    pickupLng: currentRide.pickup.lng,
                    vehicleType: currentRide.vehicle?.type,
                })

                const route = data.routeCoordinates || data.route || []

                lastRouteRef.current = route
                setCaptainRoute([...route])

                setRouteInfo({
                    distanceKm: data.distanceKm || 0,
                    durationMin: data.durationMin || 0,
                })

                lastApiLocationRef.current = {
                    lat: currentLat,
                    lng: currentLng,
                }

                console.log("Captain pickup route updated")
                console.log("Captain route:", route)

                // only for first render map issue
                // this does not call backend again
                if (isFirstTime) {
                    routeRefreshTimer1 = setTimeout(() => {
                        setCaptainRoute([...lastRouteRef.current])
                    }, 1500)

                    routeRefreshTimer2 = setTimeout(() => {
                        setCaptainRoute([...lastRouteRef.current])
                    }, 3000)
                }
            } catch (error) {
                console.log(error.response?.data?.message || error.message)
            } finally {
                isRunningRef.current = false
            }
        }

        const updateCaptainRoute = (isFirstTime = false) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLat = position.coords.latitude
                    const currentLng = position.coords.longitude

                    setCaptainCurrentLocation({
                        lat: currentLat,
                        lng: currentLng,
                    })

                    // first time always call backend
                    if (isFirstTime) {
                        callRouteApi(currentLat, currentLng, true)
                        return
                    }

                    const lastApiLocation = lastApiLocationRef.current

                    if (!lastApiLocation) {
                        callRouteApi(currentLat, currentLng, true)
                        return
                    }

                    const distanceMoved = getDistanceInMeters(
                        lastApiLocation.lat,
                        lastApiLocation.lng,
                        currentLat,
                        currentLng
                    )

                    if (distanceMoved >= MIN_DISTANCE_TO_CALL_API) {
                        callRouteApi(currentLat, currentLng)
                    } else {
                        console.log("Captain not moved enough, no backend request")
                    }
                },
                () => {
                    console.log("Unable to get captain current location")
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                    timeout: 12000,
                }
            )
        }

        // first time immediate backend request
        updateCaptainRoute(true)

        // after that only check every 15 sec
        intervalId = setInterval(() => {
            updateCaptainRoute(false)
        }, CHECK_LOCATION_TIME)

        return () => {
            clearInterval(intervalId)
            clearTimeout(routeRefreshTimer1)
            clearTimeout(routeRefreshTimer2)
        }
    }, [stage, currentRide?._id])

    return {
        captainCurrentLocation,
        captainRoute,
        routeInfo,
    }
}