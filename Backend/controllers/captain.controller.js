import { validationResult } from "express-validator";
import captainModel from "../models/captian.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import { getCaptainTodayDashboard } from "../services/captain.service.js";

/**
 * @name registerCaptainController
 * @description Register a new captain, expect fullname:{firstname,lastname}, email, password, phone, and vehicle details
 * @access Public
 */
export const registerCaptainController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const {
            fullname,
            email,
            password,
            phone,
            vehicle,
            location,
        } = req.body;

        const { firstname, lastname } = fullname
        const { color, plate, capacity, vehicleType, vehicleName } = vehicle

        if (
            !firstname ||
            !email ||
            !password ||
            !phone ||
            !color ||
            !plate ||
            !capacity ||
            !vehicleType ||
            !vehicleName
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingCaptain = await captainModel.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({
                message: "Email already in use"
            });
        }

        const existingPlate = await captainModel.findOne({
            "vehicle.plate": plate.toUpperCase(),
        });

        if (existingPlate) {
            return res.status(400).json({
                message: "Vehicle plate already registered",
            });
        }

        const passwordHash = await hashPassword(password);

        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: passwordHash,
            phone,
            vehicle: {
                vehicleName,
                color,
                plate,
                capacity,
                vehicleType
            },
        });

        res.status(201).json({
            message: "Captain registered successfully",
            captain,
        });

    }
    catch (error) {

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]

            if (field === "email") {
                return res.status(400).json({
                    message: "Email already in use"
                })
            }

            if (field === "phone") {
                return res.status(400).json({
                    message: "Phone number already in use"
                })
            }

            if (field === "vehicle.plate") {
                return res.status(400).json({
                    message: "Vehicle plate already registered"
                })
            }
        }

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * @name loginCaptainController
 * @description Login an existing captain, expect email and password in the request body
 * @access Public
 */
export const loginCaptainController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await verifyPassword(password, captain.password);

        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const accessToken = generateAccessToken(captain._id);
        const refreshToken = generateRefreshToken(captain._id);

        res.cookie("captainAccessToken", accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRE) * 60 * 60 * 1000
        });

        res.cookie("captainRefreshToken", refreshToken, {
            httpOnly: true,
            maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Captain logged in successfully",
            accessToken,
            refreshToken,
        })

    }
    catch (error) {
        console.error("Error logging in captain:", error);
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

/**
 * @name getCaptainProfileController
 * @description Get captain profile
 * @access Private
 */
export const getCaptainProfileController = async (req, res) => {
    try {
        const captainId = req.userId;
        const captain = await captainModel.findById(captainId)

        if (!captain) {
            return res.status(404).json({
                message: "Captain not found"
            });
        }

        res.status(200).json({
            message: "Captain profile retrieved successfully",
            captain,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

/**
 * @name logoutCaptainController
 * @description Captain logout, clear access and refresh cookies
 * @access Private
 */
export const logoutCaptainController = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
            message: "Captain logged out successfully",
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

/**
 * @name getCaptainTodayDashboardController
 * @description Captain Today "Ride And Earning Data"
 * @access Private
 */
export const getCaptainTodayDashboardController = async (req, res) => {
    try {
        const captainId = req.captainId;

        const dashboard = await getCaptainTodayDashboard(captainId);

        return res.status(200).json({
            message: "Captain dashboard fetched successfully",
            dashboard,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

/**
 * @name getCaptainTodayDashboardController
 * @description Updating Captain Availability online or offline by boolean value
 * @access Private
 */

export const updateCaptainAvalabilityController = async (req, res) => {
    try {
        const { isAvailable } = req.body

        if (typeof isAvailable !== "boolean") {
            return res.status(400).json({
                message: "isAvailable must be true or false"
            });
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(
            req.captainId,
            {
                $set: {
                    isAvailable: isAvailable
                }
            },
            {
                new: true,
            }
        );


        return res.status(200).json({
            message: updatedCaptain.isAvailable? "Captain is online" : "Captain is offline",
            isAvailable: updatedCaptain.isAvailable
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}