import captainModel from "../models/captain.model.js";
import refreshTokenModel from "../models/refreshToken.model.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.util.js";

const cookieOptions = {
  httpOnly: true
}

export const refreshAccessTokenController = async (req, res) => {

  try {
    const refreshToken =
      req.cookies?.userRefreshToken || req.body.userRefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const storedToken = await refreshTokenModel.findOne({
      token: refreshToken,
    });

    if (!storedToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    console.log("deocdd refresh token is",decoded)

    const accessToken = generateAccessToken(decoded.userId);

    res.cookie("userAccessToken", accessToken, {
      ...cookieOptions,
      maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRE) * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

export const refreshCaptainAccessTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.captainRefreshToken || req.body.captainRefreshToken

      

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      })
    }

    const storedToken = await refreshTokenModel.findOne({
      token: refreshToken,
    })

    

    if (!storedToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      })
    }

    const decoded = verifyRefreshToken(refreshToken)

    const captain = await captainModel.findById(decoded.userId)

    if (!captain) {
      return res.status(401).json({
        message: "Captain not found",
      })
    }

    const accessToken = generateAccessToken(captain._id)

    res.cookie("captainAccessToken", accessToken, {
      ...cookieOptions,
      maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRE) * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: "Captain access token refreshed successfully",
      accessToken,
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    })
  }
}