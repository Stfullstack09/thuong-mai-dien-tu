import axios from '../axios';

export const GetListAddress = () => {
    return axios.get('/api/v1/app/listaddress');
};

export const GetListGender = () => {
    return axios.get('/api/v1/app/listgender');
};

export const GetOneUser = (userId) => {
    return axios.get(`/api/v1/app/get-one-uer?userId=${userId}`, {
        withCredentials: true,
    });
};
