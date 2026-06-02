import { validationResult } from "express-validator";
import rideModel from "../Models/ride.model.js";

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