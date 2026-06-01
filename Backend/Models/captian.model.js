// Models/captain.model.js

import mongoose from "mongoose";

const captainSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: [true, "First name is required"],
                trim: true,
                minlength: [3, "First name must be at least 3 characters"],
            },
            lastname: {
                type: String,
                trim: true,
                minlength: [3, "Last name must be at least 3 characters"],
            },
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
        vehicle: {
            vehicleName: {
                type: String,
                required: [true, "Vehicle name is required"],
                trim: true,
            },
            color: {
                type: String,
                required: [true, "Vehicle color is required"],
                trim: true,
            },

            plate: {
                type: String,
                required: [true, "Vehicle plate number is required"],
                unique: true,
                uppercase: true,
                trim: true,
            },

            capacity: {
                type: Number,
                required: [true, "Vehicle capacity is required"],
                min: [1, "Capacity must be at least 1"],
            },

            vehicleType: {
                type: String,
                required: [true, "Vehicle type is required"],
                enum: ["car", "bike", "auto"],
            },
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                default: undefined,
            },
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        totalRides: {
            type: Number,
            default: 0,
        },

        socketId: {
            type: String,
        },
        currentRide: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ride",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// For finding nearby captains
captainSchema.index({ location: "2dsphere" });

const captainModel = mongoose.model("Captain", captainSchema);

export default captainModel;