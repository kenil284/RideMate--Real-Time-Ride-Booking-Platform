import { fareConfig } from "../utils/fair.config.js";
import { getDistanceTimeService } from "./maps.service.js";

export const getRideEstimateService = async ({pickupLat,pickupLng,destinationLat,destinationLng}) => {

  const vehicleOptions = await Promise.all(
    fareConfig.map(async (vehicle) => {

      let mode = "drive";

      if (vehicle.type === "bike") {
        mode = "motorcycle";
      }

      if (vehicle.type === "auto") {
        mode = "scooter";
      }

      if (vehicle.type === "car") {
        mode = "drive";
      }

      const { distanceKm, durationMin, routeCoordinates } = await getDistanceTimeService({
        pickupLat,
        pickupLng,
        destinationLat,
        destinationLng,
        mode,
      });

      const fare =
        vehicle.baseFare +
        distanceKm * vehicle.perKm +
        durationMin * vehicle.perMin;

      const finalFare = Math.max(Math.ceil(fare), vehicle.minFare);

      return {
        type: vehicle.type,
        name: vehicle.name,
        capacity: vehicle.capacity,
        distanceKm,
        durationMin,
        fare: finalFare,
        displayFare: `₹${finalFare}`,
        displayDistance: `${distanceKm} km`,
        displayDuration: `${durationMin} min`,
        routeCoordinates,
      };
    })
  );

  return {
    vehicleOptions,
  };
};