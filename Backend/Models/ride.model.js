import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            default: null,
        },
        lng: {
            type: Number,
            default: null,
        },
    },
    { _id: false }
);

const vehicleSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["bike", "auto", "car"],
            default: null,
        },
        name: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        capacity: {
            type: Number,
            default: 1,
        },
    },
    { _id: false }
);



const rideSchema = new mongoose.Schema(
    {
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captain",
            default: null,
            index: true,
        },

        pickup: {
            type: locationSchema,
            required: true,
        },

        destination: {
            type: locationSchema,
            required: true,
        },

        distanceKm: {
            type: Number,
            default: 0,
        },

        durationMin: {
            type: Number,
            default: 0,
        },

        vehicle: {
            type: vehicleSchema,
            default: null,
        },

        fare: {
            type: Number,
            default: 0
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "online"],
            default: "cash",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        status: {
            type: String,
            enum: [
                "looking",
                "accepted",
                "arrived",
                "started",
                "completed",
                "cancelled",
                "no_captain_found"
            ],
            default: "looking",
        },

        otp: {
            type: String,
            default: "",
            select: false,
        },

        cancelledBy: {
            type: String,
            enum: ["rider", "captain", "system", null],
            default: null,
        },

        cancelReason: {
            type: String,
            default: "",
        },

        acceptedAt: {
            type: Date,
            default: null,
        },

        arrivedAt: {
            type: Date,
            default: null,
        },

        startedAt: {
            type: Date,
            default: null,
        },

        completedAt: {
            type: Date,
            default: null,
        },

        cancelledAt: {
            type: Date,
            default: null,
        },

        expiresAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

rideSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

rideSchema.index({ rider: 1 , status: 1});
rideSchema.index({ captain: 1, status: 1 });

const rideModel = mongoose.model("Ride", rideSchema);

export default rideModel;