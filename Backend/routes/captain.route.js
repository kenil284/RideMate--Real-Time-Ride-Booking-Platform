import { Router } from "express";
import { getCaptainProfileController, getCaptainTodayDashboardController, loginCaptainController, logoutCaptainController, registerCaptainController,updateCaptainAvalabilityController, updateCaptainLocationController } from "../controllers/captain.controller.js";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";

import { body } from "express-validator";

const registerCaptainValidation = [
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required"),

  body("vehicle.color")
    .notEmpty()
    .withMessage("Vehicle color is required"),

  body("vehicle.plate")
    .notEmpty()
    .withMessage("Vehicle plate is required"),

  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("vehicle.vehicleType")
    .isIn(["car", "bike", "auto"])
    .withMessage("Invalid vehicle type"),

  body("vehicle.vehicleName")
    .notEmpty()
    .withMessage("Vehicle Name is Required")
];


const loginCaptainValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];


const captainRouter = Router();

/**
 * @route POST /api/captain/register
 * @description Register a new captain
 * @access Public
 */
captainRouter.post("/register", registerCaptainValidation, registerCaptainController);

/**
 * @route POST /api/captain/login
 * @description Login an existing captain
 * @access Public
 */

captainRouter.post("/login", loginCaptainValidation, loginCaptainController);

/**
 * @route GET /api/captain/profile
 * @description Get captain profile
 * @access Private
 */
captainRouter.get("/profile", authCaptain, getCaptainProfileController);

/**
 * @route POST /api/captain/logout
 * @description Logout a captain
 * @access Private
 */
captainRouter.post("/logout", authCaptain, logoutCaptainController);

/**
 * @route GET /api/captain/get-today-dashboard
 * @description Get Current Day Captain Dashboard
 * @access Private
 */

captainRouter.get("/get-today-dashboard",authCaptain,getCaptainTodayDashboardController)

/**
 * @route PUT /api/captain/update-captain-availability
 * @description update captain availability
 * @access Private
 */

captainRouter.put("/update-captain-availability",authCaptain,updateCaptainAvalabilityController)

/**
 * @route PUT /api/captain/update-location
 * @description update captain location frequently 
 * @access Private
 */

captainRouter.put("/update-location",authCaptain,updateCaptainLocationController)



export default captainRouter;