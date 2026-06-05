import { validationResult } from "express-validator";
import rideModel from "../Models/ride.model.js";
import { findNearbyCaptainsForRide } from "../services/captain.service.js";
import { removeRideRequestFromCaptains, sendNoCaptainFoundToUser, sendRideAcceptedToUser, sendRideExpiredToCaptains, sendRideRequestToCaptains } from "../socket/socket.emit.js";
import captainModel from "../models/captian.model.js";


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
        });

        const nearbyCaptains = await findNearbyCaptainsForRide(ride);

        // console.log(nearbyCaptains)

        sendRideRequestToCaptains(nearbyCaptains, ride);

        setTimeout(async () => {
            try {
                console.log("no captain found")
                const currentRide = await rideModel.findById(ride._id)

                if (!currentRide) return

                if (currentRide.status !== "looking") return

                currentRide.status = "no_captain_found"
                currentRide.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

                await currentRide.save()

                sendNoCaptainFoundToUser(currentRide.rider, currentRide)

                sendRideExpiredToCaptains(nearbyCaptains, currentRide)


            } catch (error) {
                console.log("no captain timeout error:", error.message)
            }
        }, 8000)

        return res.status(200).json({
            message: "Ride created successfully",
            ride,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to create ride",
        });
    }

}

export const getActiveRideController = async (req, res) => {
    try {
        const rider = req.userId;
        const activeRide = await rideModel.findOne({
            rider,
            status: {
                $in: ["looking", "accepted", "arrived", "started"],
            },
        })
            .populate("captain")
            .select("+otp")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Active ride fetched",
            activeRide: activeRide || null,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch active ride",
            error: error.message,
        });
    }
}

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

export const acceptRideController = async (req, res) => {
    try {
        const captainId = req.captainId
        const { rideId } = req.params

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

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
                    otp
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

        const populatedRide = await rideModel.findById(ride._id).populate("captain")

        sendRideAcceptedToUser(populatedRide.rider, populatedRide)

        removeRideRequestFromCaptains(populatedRide._id)

        return res.status(200).json({
            message: "Ride accepted successfully",
            ride: populatedRide,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to accept ride",
        })
    }
}