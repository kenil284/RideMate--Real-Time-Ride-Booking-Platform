import { validationResult } from "express-validator";
import { getAddressFromCoordinatesService, getDistanceTimeService, getSuggestionsService } from "../services/maps.service.js";
import { getRideEstimateService } from "../services/ride.service.js";


/**
 * @name getSuggestionsController
 * @description Fetch location suggestions for a ride search query
 * @access Private
 */
export const getSuggestionsController = async (req, res) => {
    try {

        const { search } = req.query;

        const suggestions = await getSuggestionsService(search);

        return res.status(200).json({
            message: "Suggestions fetched successfully",
            suggestions,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch location suggestions",
        });
    }
};


/**
 * @name getRideEstimateController
 * @description Fetch distance, duration, and fare estimates for a ride request
 * @access Private
 */
export const getRideEstimateController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { pickupLat, pickupLng, destinationLat, destinationLng } = req.query;

        const { distanceKm, durationMin, routeCoordinates, vehicleOptions } = await getRideEstimateService({
            pickupLat,
            pickupLng,
            destinationLat,
            destinationLng,
        });

        return res.status(200).json({
            message: "Ride estimates fetched successfully",
            vehicleOptions,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch ride estimate",
        });
    }
}



export const getCurrentLocationController = async (req, res) => {

    const { lat, lng } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({
            message: "Latitude and longitude are required",
        });
    }

    try {

        const location = await getAddressFromCoordinatesService({
            lat: Number(lat),
            lng: Number(lng),
        });

        return res.status(200).json({
            message: "Current location fetched successfully",
            location,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch current location",
        });
    }
}

