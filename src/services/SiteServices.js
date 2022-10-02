import axios from '../axios';

export const GetListAddress = () => {
    return axios.get('/api/v1/app/listaddress');
};
