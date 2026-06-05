import captainModel from "../models/captian.model.js"
import { getDistanceTimeService } from "../services/maps.service.js"


const getRouteMode = (vehicleType) => {
    if (vehicleType === "bike") {
        return "motorcycle"
    }

    if (vehicleType === "auto") {
        return "scooter"
    }

    return "drive"
}

export const getCaptainToPickupRouteController = async (req, res) => {
    try {
        const captainId = req.captainId

        const {
            currentLat,
            currentLng,
            pickupLat,
            pickupLng,
            vehicleType,
        } = req.query

        if (!currentLat || !currentLng || !pickupLat || !pickupLng) {
            return res.status(400).json({
                message: "Current location and pickup location are required",
            })
        }

        await captainModel.findByIdAndUpdate(captainId, {
            $set: {
                location: {
                    type: "Point",
                    coordinates: [Number(currentLng), Number(currentLat)],
                },
            },
        })

        const mode = getRouteMode(vehicleType)

        const routeData = await getDistanceTimeService({
            pickupLat: currentLat,
            pickupLng: currentLng,
            destinationLat: pickupLat,
            destinationLng: pickupLng,
            mode,
        })

        return res.status(200).json({
            message: "Captain pickup route fetched successfully",
            distanceKm: routeData.distanceKm,
            durationMin: routeData.durationMin,
            routeCoordinates: routeData.routeCoordinates,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}