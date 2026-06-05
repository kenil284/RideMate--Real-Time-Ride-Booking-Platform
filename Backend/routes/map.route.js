import { Router } from "express";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { getCaptainToPickupRouteController } from "../controllers/map.controller.js";

const mapRouter = Router()

mapRouter.get("/get-toPickup-route",authCaptain,getCaptainToPickupRouteController)


export default mapRouter