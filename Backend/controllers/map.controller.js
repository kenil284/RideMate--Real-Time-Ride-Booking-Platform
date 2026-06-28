import captainModel from "../models/captain.model.js"
import { getDistanceTimeService } from "../services/maps.service.js"
import { sendCaptainLocationToRider } from "../socket/socket.emit.js"
import rideModel from "../models/ride.model.js";


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
            rideId,
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

        if (rideId) {
            const ride = await rideModel.findOne({
                _id: rideId,
                captain: captainId,
                status: {
                    $in: ["accepted", "arrived", "started"],
                },
            })
                .select("rider")



            if (ride) {
                sendCaptainLocationToRider({
                    riderId: ride.rider,
                    rideId: ride._id,
                    lat: currentLat,
                    lng: currentLng,
                    distanceKm: routeData.distanceKm,
                    durationMin: routeData.durationMin,
                    routeCoordinates: routeData.routeCoordinates,
                    
                })
            }
        }


        return res.status(200).json({
            message: "Captain pickup route fetched successfully",
            distanceKm: routeData.distanceKm,
            durationMin: routeData.durationMin,
            routeCoordinates: routeData.routeCoordinates,
            instructions: routeData.instructions,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}