import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import locationRouter from "./routes/location.route.js";
import rideRouter from "./routes/ride.route.js";
import mapRouter from "./routes/map.route.js";


export const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true})); // Form data

app.use("/api/user", userRouter);
app.use("/api/captain",captainRouter)
app.use("/api/location",locationRouter)
app.use("/api/ride",rideRouter)
app.use("/api/map",mapRouter)

