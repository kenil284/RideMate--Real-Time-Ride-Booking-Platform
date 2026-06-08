import { Router } from "express";
import { loginuserController, logoutUserController, registerUserController, userProfileController } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { refreshAccessTokenController } from "../controllers/auth.controller.js";



const userRouter = Router()

/**
 * @route POST /api/user/register
 * @description Register a new user
 * @access Public
 */

userRouter.post("/register",
    [
       
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
         body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body("phone").trim().notEmpty().withMessage("Phone number is required").matches(/^(\+91)?[6-9]\d{9}$/).withMessage("Enter a valid mobile number")
    ],
    registerUserController)

/**
 * @route POST /api/user/login
 * @description Login an existing user
 * @access Public
 */

userRouter.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginuserController)

/**
 * @route GET /api/user/profile
 * @description Get user profile
 * @access Private
 */

userRouter.get("/profile", authUser, userProfileController)

/**
 * @route POST /api/user/logout
 * @description User logout
 * @access Private
 */

userRouter.post("/logout", authUser, logoutUserController)

userRouter.post("/refresh-token",refreshAccessTokenController)


export default userRouter;