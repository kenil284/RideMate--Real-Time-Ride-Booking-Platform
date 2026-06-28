import { validationResult } from "express-validator";
import rideModel from "../models/ride.model.js";
import { findNearbyCaptainsForRide } from "../services/captain.service.js";
import { removeRideRequestFromCaptains, sendCaptainLocationToTracker, sendNoCaptainFoundToUser, sendRideAcceptedToUser, sendRideCancelledToCaptain, sendRideCancelledToUser, sendRideCompletedToUser, sendRideExpiredToCaptains, sendRideRequestToCaptains, sendRideStartedToUser } from "../socket/socket.emit.js";
import captainModel from "../models/captain.model.js";
import { getDistanceTimeService } from "../services/maps.service.js";
import { getTrackingData } from "../services/getTrackingData.service.js";
import crypto from "crypto"

/**
 * @name createRideController
 * @description Create a new ride request for the logged-in rider
 * @access Private
 */

export const createRideController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array(),
            });
        }


        const rider = req.userId;

        if (!rider) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const {
            pickup,
            destination,
            distanceKm,
            durationMin,
            vehicle,
            fare,
            paymentMethod,
        } = req.body;

        const activeRide = await rideModel.findOne({
            rider,
            status: {
                $in: ["looking", "accepted", "arrived", "started"],
            },
        });

        if (activeRide) {
            return res.status(400).json({
                message: "You already have an active ride",
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const ride = await rideModel.create({
            rider,
            pickup,
            destination,
            vehicle: {
                type: vehicle.type,
                name: vehicle.name || "",
                capacity: vehicle.capacity || 1,
                image: vehicle.image || "",
            },
            fare,
            distanceKm: distanceKm || 0,
            durationMin: durationMin || 0,
            paymentMethod: paymentMethod || "cash",
            status: "looking",
            otp
        });

        const nearbyCaptains = await findNearbyCaptainsForRide(ride);

        // console.log(nearbyCaptains)

        sendRideRequestToCaptains(nearbyCaptains, ride);

        setTimeout(async () => {
            try {

                const currentRide = await rideModel.findById(ride._id)

                if (!currentRide) return

                if (currentRide.status !== "looking") return

                currentRide.status = "no_captain_found"
                currentRide.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

                await currentRide.save()

                sendNoCaptainFoundToUser(currentRide.rider, currentRide)

                sendRideExpiredToCaptains(nearbyCaptains, currentRide)


            } catch (error) {

            }
        }, 8000)

        return res.status(200).json({
            message: "Ride created successfully",
            ride,
        });

    } catch (error) {

        return res.status(500).json({
            message: "Failed to create ride",
        });
    }

}



const getRouteMode = (vehicleType) => {
    if (vehicleType === "bike") {
        return "motorcycle"
    }

    if (vehicleType === "auto") {
        return "scooter"
    }

    return "drive"
}

/**
 * @name getActiveRideController
 * @description Get the current active ride of the logged-in rider
 * @access Private
 */
export const getActiveRideController = async (req, res) => {
    try {
        const rider = req.userId

        const activeRide = await rideModel
            .findOne({
                rider,
                status: {
                    $in: ["looking", "accepted", "arrived", "started"],
                },
            })
            .select("+otp")
            .populate("captain")
            .sort({ createdAt: -1 })

        if (!activeRide) {
            return res.status(200).json({
                message: "Active ride fetched",
                activeRide: null,
            })
        }

        const rideData = activeRide.toObject()

        if (
            ["accepted", "arrived"].includes(activeRide.status) &&
            activeRide.captain?.location?.coordinates?.length === 2 &&
            activeRide.pickup?.lat &&
            activeRide.pickup?.lng
        ) {
            const captainLng = activeRide.captain.location.coordinates[0]
            const captainLat = activeRide.captain.location.coordinates[1]

            const mode = getRouteMode(activeRide.vehicle?.type)

            const routeData = await getDistanceTimeService({
                pickupLat: captainLat,
                pickupLng: captainLng,
                destinationLat: activeRide.pickup.lat,
                destinationLng: activeRide.pickup.lng,
                mode,
            })

            rideData.captainToPickupRoute = routeData.routeCoordinates
            rideData.captainToPickupInfo = {
                distanceKm: routeData.distanceKm,
                durationMin: routeData.durationMin,
            }
        }

        return res.status(200).json({
            message: "Active ride fetched",
            activeRide: rideData,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch active ride",
            error: error.message,
        })
    }
}

/**
 * @name getCaptainActiveRideController
 * @description Get the current active ride of the logged-in captain
 * @access Private
 */

export const getCaptainActiveRideController = async (req, res) => {
    try {
        const captain = req.captainId

        const activeRide = await rideModel.findOne({
            captain,
            status: {
                $in: ["accepted", "arrived", "started"],
            },
        })
            .populate("rider")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Captain active ride fetched",
            activeRide: activeRide || null,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch captain active ride",
            error: error.message,
        })
    }
}

/**
 * @name acceptRideController
 * @description Accept an available ride request by captain
 * @access Private
 */

export const acceptRideController = async (req, res) => {
    try {
        const captainId = req.captainId
        const { rideId } = req.params



        const ride = await rideModel.findOneAndUpdate(
            {
                _id: rideId,
                status: "looking",
                captain: null,
            },
            {
                $set: {
                    captain: captainId,
                    status: "accepted",
                    acceptedAt: new Date(),
                    expiresAt: null,
                },
            },
            {
                new: true,
            }
        )

        if (!ride) {
            return res.status(400).json({
                message: "Ride already accepted or not available",
            })
        }

        await captainModel.findByIdAndUpdate(captainId, {
            $set: {
                isAvailable: false,
                currentRide: ride._id,
            },
        })

        const populatedRide = await rideModel.findById(ride._id).populate("captain").populate("rider").select("+otp")

        sendRideAcceptedToUser(populatedRide.rider._id, populatedRide)

        removeRideRequestFromCaptains(populatedRide._id)

        return res.status(200).json({
            message: "Ride accepted successfully",
            ride: populatedRide,
        })

    } catch (error) {

        return res.status(500).json({
            message: "Failed to accept ride",
        })
    }
}

/**
 * @name startRideController
 * @description Start a ride after verifying the rider OTP
 * @access Private
 */


export const startRideController = async (req, res) => {
    try {
        const captainId = req.captainId
        const { rideId } = req.params
        const { otp } = req.body

        if (!otp) {
            return res.status(400).json({
                message: "OTP is required",
            })
        }

        const ride = await rideModel.findOne({
            _id: rideId,
            captain: captainId,
            status: {
                $in: ["accepted", "arrived"],
            },
        })
            .select("+otp")

        if (!ride) {
            return res.status(400).json({
                message: "Ride not found or not ready to start",
            })
        }

        if (ride.otp !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP",
            })
        }

        ride.status = "started"
        ride.startedAt = new Date()
        ride.otp = ""

        if (!ride.arrivedAt) {
            ride.arrivedAt = new Date()
        }

        ride.trackingToken = crypto.randomBytes(24).toString("hex")

        await ride.save()

        console.log(ride)

        const startedRide = await rideModel.findById(ride._id)
            .populate("rider", "fullname phone")
            .populate("captain", "fullname phone vehicle location")

        sendRideStartedToUser(startedRide.rider._id, startedRide)

        return res.status(200).json({
            message: "Ride started successfully",
            ride: startedRide,
        })

    } catch (error) {

        return res.status(500).json({
            message: "Failed to start ride",
        })
    }
}

/**
 * @name getCaptainToDestinationRouteController
 * @description Get route from captain current location to ride destination
 * @access Private
 */

export const getCaptainToDestinationRouteController = async (req, res) => {
    try {
        const captainId = req.captainId

        const {
            currentLat,
            currentLng,
            destinationLat,
            destinationLng,
            vehicleType,
        } = req.query

        if (!currentLat || !currentLng || !destinationLat || !destinationLng) {
            return res.status(400).json({
                message: "Current location and destination location are required",
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

        const routeData = await getDistanceTimeService({
            pickupLat: currentLat,
            pickupLng: currentLng,
            destinationLat,
            destinationLng,
            mode: getRouteMode(vehicleType),
        })

        const ride = await rideModel.findOne({
            captain: captainId,
            status: "started"
        })

      

        if (ride?.trackingToken) {
            sendCaptainLocationToTracker({
                trackingToken: ride.trackingToken,
                rideId: ride._id,
                lat: currentLat,
                lng: currentLng,
                distanceKm: routeData.distanceKm,
                durationMin: routeData.durationMin,
                routeCoordinates: routeData.routeCoordinates,
            })

        }



        return res.status(200).json({
            message: "Captain destination route fetched successfully",
            distanceKm: routeData.distanceKm,
            durationMin: routeData.durationMin,
            routeCoordinates: routeData.routeCoordinates,
            instructions: routeData.instructions || [],
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

/**
 * @name completeRideController
 * @description Complete a started ride by captain
 * @access Private
 */
export const completeRideController = async (req, res) => {
    try {
        const captainId = req.captainId
        const { rideId } = req.params

        const ride = await rideModel.findOne({
            _id: rideId,
            captain: captainId,
            status: "started",
        })

        if (!ride) {
            return res.status(400).json({
                message: "Ride not found or not started",
            })
        }

        ride.status = "completed"
        ride.completedAt = new Date()
        ride.paymentStatus = "paid"

        await ride.save()

        await captainModel.findByIdAndUpdate(captainId, {
            $set: {
                currentRide: null,
            },
            $inc: {
                totalRides: 1,
            },
        })

        const completedRide = await rideModel.findById(ride._id).populate("rider")

        sendRideCompletedToUser(completedRide.rider._id, completedRide)

        return res.status(200).json({
            message: "Ride completed successfully",
            ride: completedRide,
        })

    } catch (error) {


        return res.status(500).json({
            message: "Failed to complete ride",
        })
    }
}

/**
 * @name cancelRideByUserController
 * @description Cancel a ride by the logged-in rider
 * @access Private
 */
export const cancelRideByUserController = async (req, res) => {
    try {
        const rider = req.userId
        const { rideId } = req.params

        const ride = await rideModel.findOne({
            _id: rideId,
            rider,
            status: {
                $in: ["looking", "accepted", "arrived"],
            },
        })

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be cancelled now",
            })
        }

        const previousStatus = ride.status
        const captainId = ride.captain

        ride.status = "cancelled"
        ride.cancelledBy = "rider"
        ride.cancelReason = "Cancelled by rider"
        ride.cancelledAt = new Date()
        ride.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await ride.save()

        if (captainId) {
            await captainModel.findByIdAndUpdate(captainId, {
                $set: {
                    isAvailable: false,
                    currentRide: null,
                },
            })
        }

        const cancelledRide = await rideModel.findById(ride._id).populate("rider").populate("captain")

        if (previousStatus === "looking") {
            removeRideRequestFromCaptains(ride._id)
        }

        if (captainId) {
            sendRideCancelledToCaptain(captainId, cancelledRide)
        }

        return res.status(200).json({
            message: "Ride cancelled successfully",
            ride: cancelledRide,
        })

    } catch (error) {

        return res.status(500).json({
            message: "Failed to cancel ride",
        })
    }
}

/**
 * @name cancelRideByCaptainController
 * @description Cancel a ride by the logged-in captain
 * @access Private
 */
export const cancelRideByCaptainController = async (req, res) => {
    try {
        const captainId = req.captainId
        const { rideId } = req.params


        const ride = await rideModel.findOne({
            _id: rideId,
            captain: captainId,
            status: {
                $in: ["accepted", "arrived"],
            },
        })

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be cancelled now",
            })
        }

        ride.status = "cancelled"
        ride.cancelledBy = "captain"
        ride.cancelReason = "Cancelled by captain"
        ride.cancelledAt = new Date()
        ride.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await ride.save()

        await captainModel.findByIdAndUpdate(captainId, {
            $set: {
                isAvailable: false,
                currentRide: null,
            },
        })

        const cancelledRide = await rideModel
            .findById(ride._id)
            .populate("rider")
            .populate("captain")

        sendRideCancelledToUser(cancelledRide.rider._id, cancelledRide)

        return res.status(200).json({
            message: "Ride cancelled successfully",
            ride: cancelledRide,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to cancel ride",
        })
    }
}




export const getTrackingController = async (req, res) => {
    try {
        const { token } = req.params

        if (!token) {
            return res.status(400).json({
                message: "Tracking token required"
            })
        }

        const ride = await rideModel.findOne({ trackingToken: token, status: "started" }).populate("captain")


    

        if (!ride) {
            return res.status(404).json({
                message: "Tracking unavailable"
            })
        }

        const tracking = await getTrackingData(ride)



        return res.status(200).json({
            ride,
            tracking,
        })
    }

    catch (error) {

        return res.status(500).json({
            
            message: error.message
        })
    }

}