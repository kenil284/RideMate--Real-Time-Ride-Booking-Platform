import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


import { getTrackingData } from "../services/tracking.service"
import { useTrackingSocket } from "../hooks/useTrackingSocket"
import Map2 from "../../Rides/component/Map2"

import TrackingHeader from "../components/TrackingHeader"
import TrackingBottomSheet from "../components/TrackingBottomSheet"


const LiveTrackingPage = () => {
    const { trackingToken } = useParams()

    const [loading, setLoading] = useState(true)

    const [rideData, setRideData] = useState(null)

    useEffect(() => {
        const loadTracking = async () => {
            try {
                const data = await getTrackingData(trackingToken)

                setRideData({
                    ...data.ride,

                    captainToPickupRoute:
                        data.tracking.routeCoordinates,

                    captain: {
                        ...data.ride.captain,

                        location: {
                            lat:
                                data.tracking.captainLocation.lat,

                            lng:
                                data.tracking.captainLocation.lng,
                        },
                    },
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        loadTracking()
    }, [trackingToken])

    console.log(rideData)

    useTrackingSocket({
        trackingToken,

        setTracking: (data) => {
            setRideData((prev) => ({
                ...prev,

                captainToPickupRoute:
                    data.routeCoordinates,

                captain: {
                    ...prev.captain,

                    location: {
                        lat: data.lat,
                        lng: data.lng,
                    },
                },
            }))
        },
    })

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
<div className="relative h-screen">

<Map2
routeCoordinates={rideData?.captainToPickupRoute || []}
currentLocation={rideData?.captain?.location}
pickup={rideData?.destination}
vehicleType={rideData?.vehicle?.type}
showVehicleMarker
/>


{/* TOP OVERLAY */}
  <TrackingHeader
    distance={`${rideData?.distanceKm || 0} km`}
    duration={`${rideData?.durationMin || 0} min`}
    destination={rideData?.destination?.address}
  />

{/* <TrackingBottomSheet
captain={rideData?.captain?.fullname?.firstname}
vehicle={rideData?.vehicle?.image}
distance={`${rideData?.distanceKm || 0} km`}
duration={`${rideData?.durationMin || 0} min`}
/> */}

<TrackingBottomSheet 
    rideData={rideData} 
  />

</div>
)
}

export default LiveTrackingPage