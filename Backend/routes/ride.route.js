import { Router } from "express";
import { body } from "express-validator";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";
import { acceptRideController, cancelRideByCaptainController, cancelRideByUserController, completeRideController, createRideController, getActiveRideController, getCaptainActiveRideController, getTrackingController, startRideController } from "../controllers/ride.controller.js";


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
/**
 * @route POST /api/ride/create-ride
 * @description Create a new ride request for the logged-in rider
 * @access Private
 * @controller createRideController
 */

rideRouter.post("/create-ride", authUser, createRideValidator, createRideController)

/**
 * @route GET /api/ride/get-active-ride
 * @description Get the current active ride of the logged-in rider
 * @access Private
 * @controller getActiveRideController
 */

rideRouter.get("/get-active-ride",authUser,getActiveRideController)

/**
 * @route PUT /api/ride/accept/:rideId
 * @description Accept a ride request by captain
 * @access Private
 * @controller acceptRideController
 */

rideRouter.put("/accept/:rideId", authCaptain, acceptRideController)

/**
 * @route GET /api/ride/captain-active-ride
 * @description Get the current active ride of the logged-in captain
 * @access Private
 * @controller getCaptainActiveRideController
 */

rideRouter.get("/captain-active-ride",authCaptain,getCaptainActiveRideController)

/**
 * @route POST /api/ride/start/:rideId
 * @description Start a ride after OTP verification
 * @access Private
 * @controller startRideController
 */

rideRouter.post("/start/:rideId",authCaptain,startRideController)

/**
 * @route POST /api/ride/complete/:rideId
 * @description Complete a started ride by captain
 * @access Private
 * @controller completeRideController
 */

rideRouter.post("/complete/:rideId",authCaptain,completeRideController)

/**
 * @route POST /api/ride/cancel/user/:rideId
 * @description Cancel a ride by rider
 * @access Private
 * @controller cancelRideByUserController
 */

rideRouter.post("/cancel/user/:rideId",authUser,cancelRideByUserController)

/**
 * @route POST /api/ride/cancel/captain/:rideId
 * @description Cancel a ride by captain
 * @access Private
 * @controller cancelRideByCaptainController
 */


rideRouter.post("/cancel/captain/:rideId",authCaptain,cancelRideByCaptainController)

rideRouter.get("/tracking/:token",getTrackingController)

export default rideRouter;