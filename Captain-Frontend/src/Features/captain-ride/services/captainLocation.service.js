import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const updateCaptainLocationService = async ({ lat, lng }) => {
  const res = await axios.put(
    `${BASE_URL}/api/captain/update-location`,
    { lat, lng },
    {
      withCredentials: true,
    }
  );

  return res.data;
};