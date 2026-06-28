import { fareConfig } from "../utils/fair.config.js";
import { getDistanceTimeService } from "./maps.service.js";

export const getRideEstimateService = async ({pickupLat,pickupLng,destinationLat,destinationLng}) => {

  const formatDuration = (durationMin) => {
  if (durationMin < 60) {
    return `${durationMin} min`;
  }

  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
};

  const vehicleOptions = [];

  for (const vehicle of fareConfig) {
    try {
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

      const { distanceKm, durationMin, routeCoordinates } =
        await getDistanceTimeService({
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

      vehicleOptions.push({
        type: vehicle.type,
        name: vehicle.name,
        capacity: vehicle.capacity,
        distanceKm,
        durationMin,
        fare: finalFare,
        displayFare: `₹${finalFare}`,
        displayDistance: `${distanceKm} km`,
        displayDuration: formatDuration(durationMin),
        routeCoordinates,
      });
    } catch (error) {

    }
  }

  if (vehicleOptions.length === 0) {
    throw new Error("No ride options available for this route");
  }

  return {
    vehicleOptions,
  };
};



