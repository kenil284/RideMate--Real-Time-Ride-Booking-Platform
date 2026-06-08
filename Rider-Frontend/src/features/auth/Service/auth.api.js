import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function Register({ fullname, email, password, phone }) {
    try {
        const response = await api.post('/api/user/register', { fullname, email, password, phone });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function Login({ email, password }) {
    try {
        const response = await api.post('/api/user/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getUserProfileService = async () => {
    const res = await api.get(`/api/user/profile`)
    return res.data
}

export const refreshAccessTokenService = async () => {
    console.log("Reached")
    const res = await api.post(`/api/user/refresh-token`)
    return res.data
}