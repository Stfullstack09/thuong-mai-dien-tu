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

export const UploadImage = (data) => {
    const name = process.env.REACT_APP_NAME_UPLOAD_IMAGE;

    return axios.post(`https://api.cloudinary.com/v1_1/${name}/image/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
        },
    });
};

export const CreateNewProduct = (data) => {
    return axios.post(`/api/v1/app/product-create-new-product`, data, {
        withCredentials: true,
    });
};

export const GetCateGory = () => {
    return axios.get(`/api/v1/app/get-category`);
};

export const GetAllProductByType = (type) => {
    return axios.get(`/api/v1/app/get-product-by-type?type=${type}`);
};

export const GetProductOther = (type, limit) => {
    return axios.get(`/api/v1/app/get-product-new-and-bestseller?type=${type}&limit=${limit}`);
};

export const SearchProduct = (text) => {
    return axios.get(`/api/v1/app/search-product-jsx?q=${text}`);
};

export const GetDetailProductByAdmin = (id) => {
    return axios.get(`/api/v1/app/get-detail-product-by-admin?id=${id}`, {
        withCredentials: true,
    });
};

export const GetAllProductByAdmin = () => {
    return axios.get(`/api/v1/app/get-all-product-by-admin`, {
        withCredentials: true,
    });
};

export const UpdateProductByAdmin = (data) => {
    return axios.post(`/api/v1/app/update-product-jsx-by-admin`, data, {
        withCredentials: true,
    });
};

export const DeleteProductByAdmin = (id) => {
    return axios.post(
        `/api/v1/app/delete-product-jsx-by-admin`,
        {
            id,
        },
        {
            withCredentials: true,
        },
    );
};

export const GetAllProductDeletedByAdmin = () => {
    return axios.get(`/api/v1/app/get-all-product-deleted-by-admin`, {
        withCredentials: true,
    });
};

export const RestoreProductDeletedByAdmin = (id) => {
    return axios.post(
        `/api/v1/app/restore-product-deleted-by-admin`,
        { id },
        {
            withCredentials: true,
        },
    );
};

export const GetDetailProductByCustomer = (id) => {
    return axios.get(`/api/v1/app/get-detail-product-by-customer?id=${id}`);
};

export const GetAllSizeProduct = () => {
    return axios.get(`/api/v1/app/get-all-size-product`);
};

export const AddProductToCart = (data) => {
    return axios.post(`/api/v1/app/add-product-to-cart`, data, {
        withCredentials: true,
    });
};

export const GetAllProductToCart = (userId) => {
    return axios.get(`/api/v1/app/get-all-product-cart?userId=${userId}`, {
        withCredentials: true,
    });
};

export const RemoveProductCart = (id, userId) => {
    return axios.post(
        `/api/v1/app/remove-product-to-cart?id=${id}&userId=${userId}`,
        {},
        {
            withCredentials: true,
        },
    );
};

export const ChangeCountProductToCart = (type, id, count) => {
    return axios.post(
        `/api/v1/app/change-count-product-to-cart?type=${type}&id=${id}`,
        {
            count,
        },
        {
            withCredentials: true,
        },
    );
};

export const GetInformationUserCheckOut = () => {
    return axios.get('/api/v1/app/get-information-user-checkout', {
        withCredentials: true,
    });
};

export const GetTotalMoney = () => {
    return axios.get('/api/v1/app/get-totalMoney-checkout', {
        withCredentials: true,
    });
};
