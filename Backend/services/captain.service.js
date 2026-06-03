import mongoose from "mongoose";
import rideModel from "../Models/ride.model.js";

export const getCaptainTodayDashboard = async (captainId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const result = await rideModel.aggregate([
    {
      $match: {
        captain: new mongoose.Types.ObjectId(captainId),
        status: "completed",
        completedAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        todayRides: { $sum: 1 },
        todayEarning: { $sum: "$fare" },
      },
    },
  ]);

  return {
    todayRides: result[0]?.todayRides || 0,
    todayEarning: result[0]?.todayEarning || 0,
  };
};