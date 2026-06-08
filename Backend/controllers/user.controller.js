import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import refreshTokenModel from "../models/refreshToken.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";


/**
 * @name registerUserController
 * @description register a new user, expect fullname:{firstname, lastname}, email, password and phone in the request body
 * @access Public
 */

const cookieOptions = {
  httpOnly: true
}

export const registerUserController = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password , phone } = req.body || {};

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await hashPassword(password);

  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
    phone
  });

  // const accessToken = generateAccessToken(user._id);
  // const refreshToken = generateRefreshToken(user._id);

  // await refreshTokenModel.create({
  //   token: refreshToken,
  //   user: user._id,
  // });

  // res.cookie("accessToken", accessToken, {
  //   ...cookieOptions,
  //   maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRE) * 60 * 60 * 1000
  // });

  // res.cookie("refreshToken", refreshToken, {
  //   ...cookieOptions,
  //   maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
  // });

  res.status(201).json({
    message: "User registered successfully",
    user
  });
};

/**
 * @name loginUserController
 * @description Login an existing user, expect email and password in the request body
 * @access Public
 */

export const loginuserController = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body || {};

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json(
      { message: "Invalid credentials" }
    );
  }


  const passwordMatch = await verifyPassword(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json(
      { message: "Invalid credentials" }
    );
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await refreshTokenModel.create({
    token: refreshToken,
    user: user._id,
  });

  res.cookie("userAccessToken", accessToken, {
    ...cookieOptions,
    maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRE) * 60 * 60 * 1000,
  });

  res.cookie("userRefreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User logged in successfully",
    accessToken,
    refreshToken,
    user,
  });
};

/**
 * @name userProfileController
 * @description Get user profile
 * @access Private
 */

export const userProfileController = async (req, res) => {
  const user = await userModel.findById(req.userId)
  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }
  res.status(200).json({
    message: "User profile fetched successfully",
    user
  })
}

/**
 * @name logoutuserController
 * @description User logout, invalidate the access token and refresh token
 * @access Private
 */

export const logoutUserController = async (req, res) => {
  try {

    
    const accessToken =
      req.cookies?.userAccessToken ||
      req.headers.authorization?.split(" ")[1];

    const refreshToken =
      req.cookies?.userRefreshToken ||
      req.body.refreshToken;


    if (accessToken) {
      await blackListTokenModel.create({ token: accessToken });
    }

    if (refreshToken) {
      await refreshTokenModel.deleteOne({ token: refreshToken });
    }

    res.clearCookie("userAccessToken", cookieOptions);
    res.clearCookie("userRefreshToken", cookieOptions);

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};

