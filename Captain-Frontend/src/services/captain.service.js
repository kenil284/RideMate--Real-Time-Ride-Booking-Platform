import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const getCaptainProfileService = async () => {
  const res = await axios.get(`${BASE_URL}/api/captain/profile`, {
    withCredentials: true,
  });

  return res.data.captain;
};

export const refreshCaptainAccessTokenService = async () => {
  const res = await axios.post(
    `${BASE_URL}/api/captain/refresh-token`,
    {},
    {
      withCredentials: true,
    }
  )

  return res.data
}