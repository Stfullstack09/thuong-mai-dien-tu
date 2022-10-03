import axios from 'axios';
import { RefreshToken } from './services';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (config) => {
        const value = await RefreshToken.get();
        const keys = JSON.parse(value);
        config.headers = {
            Authorization: `Bearer ${keys.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        originalRequest._retry = true;
        const access_token = await RefreshToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosApiInstance(originalRequest);
    },
);

export default axiosApiInstance;
