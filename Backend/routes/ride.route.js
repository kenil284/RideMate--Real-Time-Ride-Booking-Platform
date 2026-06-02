import { Router } from "express";
import { getCurrentLocationController, getRideEstimateController, getSuggestionsController } from "../controllers/ride.controller.js";
import { query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

const rideRouter = Router()

/**
 * @route GET /api/ride/get-suggestions
 * @description Get location suggestions for ride pickup/destination search
 * @access Private
 */
rideRouter.get("/get-suggestions", authUser, getSuggestionsController)

/**
 * @route GET /api/ride/get-ride-estimate
 * @description Get distance, duration, and fare estimate for a ride route
 * @access Private
 */
rideRouter.get(
  "/get-ride-estimate", authUser, [
    query("pickupLat").notEmpty().withMessage("Pickup latitude is required"),
    query("pickupLng").notEmpty().withMessage("Pickup longitude is required"),
    query("destinationLat").notEmpty().withMessage("Destination latitude is required"),
    query("destinationLng").notEmpty().withMessage("Destination longitude is required"),
  ],
    getRideEstimateController
)

rideRouter.get("/get-current-location", authUser,getCurrentLocationController)

export default rideRouter