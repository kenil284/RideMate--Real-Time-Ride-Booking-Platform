import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_URL

export const getCaptainTodayDashboardService = async () => {
  const res = await axios.get(
    `${BASE_URL}/api/captain/get-today-dashboard`,
    {
      withCredentials: true,
    }
  )

  return res.data.dashboard;
}

export const getCaptainProfileService = async () => {
  const res = await axios.get(`${BASE_URL}/api/captain/profile`, {
    withCredentials: true,
  });

  return res.data.captain;
};

export const updateCaptainAvailabilityService = async (isAvailable) => {
  const res = await axios.put(
    `${BASE_URL}/api/captain/update-captain-availability`,
    { isAvailable },
    {
      withCredentials: true,
    }
  )

  return res.data;
}