import { Router } from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { createRideController, getActiveRideController } from "../controllers/ride.controller.js";


export const createRideValidator = [
    body("pickup.address")
        .notEmpty()
        .withMessage("Pickup address is required"),

    body("destination.address")
        .notEmpty()
        .withMessage("Destination address is required"),

    body("vehicle.type")
        .isIn(["bike", "auto", "car"])
        .withMessage("Vehicle type must be bike, auto, or car"),

    body("fare")
        .isNumeric()
        .withMessage("Fare is required"),

    body("pickup.lat").optional().isNumeric(),
    body("pickup.lng").optional().isNumeric(),

    body("destination.lat").optional().isNumeric(),
    body("destination.lng").optional().isNumeric(),

    body("distanceKm").optional().isNumeric(),
    body("durationMin").optional().isNumeric(),

    body("vehicle.name").optional().isString(),
    body("vehicle.capacity").optional().isNumeric(),

    body("paymentMethod")
        .optional()
        .isIn(["cash", "online"])
        .withMessage("Payment method must be cash or online"),
]

const rideRouter = Router()

rideRouter.post("/create-ride", authUser, createRideValidator, createRideController)

rideRouter.get("/get-active-ride",authUser,getActiveRideController)

export default rideRouter;