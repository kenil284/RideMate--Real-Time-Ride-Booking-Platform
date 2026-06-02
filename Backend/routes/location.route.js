import { Router } from "express";
import { getCurrentLocationController, getRideEstimateController, getSuggestionsController } from "../controllers/location.controller.js";
import { query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";

const locationRouter = Router()

/**
 * @route GET /api/ride/get-suggestions
 * @description Get location suggestions for ride pickup/destination search
 * @access Private
 */
locationRouter.get("/get-suggestions", authUser, getSuggestionsController)

/**
 * @route GET /api/ride/get-ride-estimate
 * @description Get distance, duration, and fare estimate for a ride route
 * @access Private
 */
locationRouter.get(
  "/get-ride-estimate", authUser, [
    query("pickupLat").notEmpty().withMessage("Pickup latitude is required"),
    query("pickupLng").notEmpty().withMessage("Pickup longitude is required"),
    query("destinationLat").notEmpty().withMessage("Destination latitude is required"),
    query("destinationLng").notEmpty().withMessage("Destination longitude is required"),
  ],
    getRideEstimateController
)

locationRouter.get("/get-current-location", authUser,getCurrentLocationController)

export default locationRouter