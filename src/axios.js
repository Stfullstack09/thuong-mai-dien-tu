import jwt_decode from 'jwt-decode';

import axios from 'axios';
import { dispatch } from './redux';

import { userLoginSuccess } from './store/actions';

// eslint-disable-next-line react-hooks/rules-of-hooks

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true,
});

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';

        if (token) {
            const decoded = jwt_decode(token);
            if (decoded.exp * 1000 < Math.floor(new Date().getTime())) {
                console.log('token het han');

                const Res = await axios.post(
                    'http://localhost:8080/api/v1/auth/refresh-token',
                    {},
                    {
                        withCredentials: true,
                    },
                );

                const { data } = Res;

                if (data.errCode === 0) {
                    localStorage.setItem('accessToken', data.user.accessToken);
                    dispatch(userLoginSuccess(data.user));
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code

    const { data } = response;
    return data;
});

export default instance;
