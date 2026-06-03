import { useEffect, useState } from "react";
import { getCaptainDashboardService } from "../services/captainDashboard.service"; 

export const useCaptainDashboard = () => {
  const [dashboard, setDashboard] = useState({
    todayEarning: 0,
    totalRides: 0,
    onlineTime: "0h 0m",
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getCaptainDashboardService();
      setDashboard(data);
    };

    fetchDashboard();
  }, []);

  return { dashboard };
};