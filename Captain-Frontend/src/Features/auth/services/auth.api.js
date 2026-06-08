import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export async function Register(data) {
    try {
        const response = await api.post('/api/captain/register', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function login(data) {
    try {
        const response = await api.post('/api/captain/login', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const logout = async () => {
    console.log("Reached")
    const response = await api.post('/api/captain/logout')

    return response.data
}