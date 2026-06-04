import { useEffect, useState } from "react";
import { getCaptainTodayDashboardService } from "../services/captainDashboard.service"; 

export const useCaptainDashboard = () => {
  const [dashboard, setDashboard] = useState({
    todayEarning: 0,
    todayRides: 0,
  })

  const [isDashboardLoading, setIsDashboardLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      
      try {
        setIsDashboardLoading(true)

        const data = await getCaptainTodayDashboardService()

        setDashboard({
          todayEarning: data.todayEarning || 0,
          todayRides: data.todayRides || 0,
        })


      } catch (error) {
        console.log(
          "Dashboard fetch error:",
          error.response?.data?.message || error.message
        );
      } finally {
        setIsDashboardLoading(false)
      }
    };

    fetchDashboard()
  }, []);

  return {
    dashboard,
    isDashboardLoading,
  }
}