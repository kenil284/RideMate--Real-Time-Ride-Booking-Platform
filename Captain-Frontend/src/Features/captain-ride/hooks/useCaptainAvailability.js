import { useContext, useState } from "react";
import { captainContext } from "../../../Context/CaptainContext";
import { updateCaptainAvailabilityService } from "../services/captainDashboard.service";



export const useCaptainAvailability = () => {
  const { captainData, setCaptainData } = useContext(captainContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const isOnline = Boolean(captainData?.isAvailable);

  const toggleAvailability = async () => {
    try {
      setIsUpdating(true);

      const nextStatus = !isOnline;

      const data = await updateCaptainAvailabilityService(nextStatus);

      setCaptainData((prev) => ({
        ...prev,
        isAvailable: data.isAvailable,
      }))

    } finally {
      setIsUpdating(false);
    }
  }

  return {
    isOnline,
    isUpdating,
    toggleAvailability,
  }
};