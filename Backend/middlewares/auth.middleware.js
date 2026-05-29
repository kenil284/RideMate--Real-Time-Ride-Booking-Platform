import blackListTokenModel from "../Models/blackListToken.model.js";
import { verifyAccessToken } from "../utils/jwt.util.js";

export const authUser = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(400).json({
            message : "Unauthorized"
        })
    }

    const isblacklisted = await blackListTokenModel.findOne({ token });

    if(isblacklisted){ 
        return res.status(400).json({
            message : "Unauthorized"
        })
    }

    try {
        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(400).json({
            message : "Unauthorized"
        })
    }
}


