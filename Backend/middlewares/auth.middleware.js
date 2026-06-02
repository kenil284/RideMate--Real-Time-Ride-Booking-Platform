import blackListTokenModel from "../models/blackListToken.model.js";
import userModel from "../models/user.model.js";
import { verifyAccessToken } from "../utils/jwt.util.js";

export const authUser = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = verifyAccessToken(token);

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.userId = user._id;
        req.user = user;

    } catch (error) {
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    const isblacklisted = await blackListTokenModel.findOne({ token });

    if (isblacklisted) {
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    next();
}


