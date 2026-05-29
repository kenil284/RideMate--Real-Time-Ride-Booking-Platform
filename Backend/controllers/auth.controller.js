import refreshTokenModel from "../Models/refreshToken.model";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.util";

const cookieOptions = {
  httpOnly: true
}

export const refreshAccessTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

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

    const accessToken = generateAccessToken(decoded.id, decoded.role);

    res.cookie("accessToken", accessToken, {
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