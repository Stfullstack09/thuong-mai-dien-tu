import axios from '../axios';

export const UserRegister = (data) => {
    return axios.post('/api/v1/auth/register', data, { withCredentials: true });
};

export const UserLogin = (data) => {
    return axios.post('/api/v1/auth/login', data, { withCredentials: true });
};

export const UserLoginAdmin = (data) => {
    return axios.post('/api/v1/auth/login-admin', data, { withCredentials: true });
};

export const LogoutServices = (userId, Token) => {
    return axios.post(
        `/api/v1/auth/logout`,
        { userId },
        {
            withCredentials: true,
        },
    );
};

export const RefreshToken = () => {
    return axios.post(
        `/refresh-token`,
        {},
        {
            withCredentials: true,
        },
    );
};
