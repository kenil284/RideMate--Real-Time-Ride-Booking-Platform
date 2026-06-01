import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import rideRouter from "./routes/ride.route.js";


export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true})); // Form data

app.use("/api/user", userRouter);
app.use("/api/captain",captainRouter)
app.use("/api/ride",rideRouter)