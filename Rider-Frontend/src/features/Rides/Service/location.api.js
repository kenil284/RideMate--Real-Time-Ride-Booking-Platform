import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getLocationSuggestions = async (search) => {
    if (!search?.trim()) return [];

    const response = await axios.get(`${API_URL}/api/ride/get-suggestions`, {
        params: { search },
        withCredentials: true,
    })

    return response.data.suggestions || []
};

export const getCurrentLocationApi = async (lat, lng) => {
    const response = await axios.get(`${API_URL}/api/ride/get-current-location`, {
        params: {
            lat,
            lng,
        },
        withCredentials: true,
    })

    return response.data.location
};