import { Router } from "express";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { getCaptainToPickupRouteController } from "../controllers/map.controller.js";
import { getCaptainToDestinationRouteController } from "../controllers/ride.controller.js";

const mapRouter = Router()

mapRouter.get("/get-toPickup-route",authCaptain,getCaptainToPickupRouteController)

mapRouter.get("/get-toDestination-route",authCaptain,getCaptainToDestinationRouteController)


export default mapRouter