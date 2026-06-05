import mongoose from "mongoose";
import rideModel from "../Models/ride.model.js";
import captainModel from "../models/captian.model.js";

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


export const findNearbyCaptainsForRide = async (ride) => {
  const pickupLat = ride.pickup?.lat;
  const pickupLng = ride.pickup?.lng;
  const vehicleType = ride.vehicle?.type;

  // console.log(pickupLat, pickupLng, vehicleType);

  const captains = await captainModel.find({
      isAvailable: true,
      currentRide: null,
      "vehicle.vehicleType": vehicleType,

      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [pickupLng, pickupLat],
          },
          $maxDistance: 2000,
        },
      },
    })
    .lean()


  return captains;
};

