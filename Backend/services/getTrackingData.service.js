import { getDistanceTimeService } from "./maps.service.js"

export const getRouteMode = (vehicleType) => {
    switch (vehicleType) {
        case "car":
            return "drive"

        case "bike":
            return "motorcycle"

        case "auto":
            return "drive"

        default:
            return "drive"
    }
}

export const getTrackingData = async (ride) => {
    try {
        
    
    if (ride.status !== "started" || !ride.captain?.location?.coordinates) {
    return {
        captainLocation: null,
        routeCoordinates: [],
        durationMin: 0,
        distanceKm: 0,
    }
}
    const [lng, lat] = ride.captain.location.coordinates

    const route = await getDistanceTimeService({
            pickupLat: lat,
            pickupLng: lng,

            destinationLat:
                ride.destination.lat,

            destinationLng:
                ride.destination.lng,

            mode: getRouteMode(ride.vehicle?.type),
        })


    return {
        routeCoordinates:route.routeCoordinates,
        distanceKm:route.distanceKm,
        durationMin:route.durationMin,
        captainLocation: {
            lat,
            lng,
        },
    }
}
 catch (error) {
       console.log(error)
    }
}