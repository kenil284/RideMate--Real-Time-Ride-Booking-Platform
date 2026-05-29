import { Router } from "express";
import { loginuserController,logoutuserController, registerUserController, userProfileController } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";


const userRouter = Router()

/**
 * @route POST /api/user/register
 * @description Register a new user
 * @access Public
 */

userRouter.post("/register",
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    registerUserController)

/**
 * @route POST /api/user/login
 * @description Login an existing user
 * @access Public
 */

userRouter.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],loginuserController)

/**
 * @route GET /api/user/profile
 * @description Get user profile
 * @access Private
 */

userRouter.get("/profile",authUser,userProfileController)

/**
 * @route POST /api/user/logout
 * @description User logout
 * @access Private
 */

userRouter.post("/logout",authUser,logoutuserController)


export default userRouter;