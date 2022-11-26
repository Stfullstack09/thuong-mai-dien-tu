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

export const UploadImageComment = (data) => {
    const name = process.env.REACT_APP_NAME_UPLOAD_IMAGE_COMMENT;

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

export const GetAllProductByAdmin = (limit, page) => {
    return axios.get(`/api/v1/app/get-all-product-by-admin?limit=${limit}&page=${page}`, {
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

export const PostDataOrder = (data) => {
    return axios.post('/api/v1/app/post-data-order', data, {
        withCredentials: true,
    });
};

export const GetProductOrderNoConfirm = () => {
    return axios.get('/api/v1/app/get-product-order', {
        withCredentials: true,
    });
};

export const GetCurrentUser = () => {
    return axios.get(`/api/v1/app/get-current-user`, {
        withCredentials: true,
    });
};

export const UpdateCurrentUser = (data) => {
    return axios.post('/api/v1/app/update-user-current', data, {
        withCredentials: true,
    });
};

export const UpdateStatusOderByCustomer = (id) => {
    return axios.post(
        `/api/v1/app/update-status-products-by-customer`,
        {
            id,
        },
        {
            withCredentials: true,
        },
    );
};

export const RegisterSellByCustomer = () => {
    return axios.post(
        '/api/v1/app/sales-registration-by-customer',
        {},
        {
            withCredentials: true,
        },
    );
};

export const CheckVerifyEmail = (data) => {
    return axios.post('/api/v1/app/check-email-valid-services', data, {
        withCredentials: true,
    });
};

export const GetOrderByID = (id) => {
    return axios.get(`/api/v1/app/get-oder-products-by-customer?id=${id}`, {
        withCredentials: true,
    });
};

export const RestoreProductByCustomer = (data) => {
    return axios.post(`/api/v1/app/restore-product-order-by-customer`, data, {
        withCredentials: true,
    });
};

export const CreateNewPostServices = (data) => {
    return axios.post('/api/v1/app/create-new-post', data, {
        withCredentials: true,
    });
};

export const GetLimitPosts = (limit) => {
    return axios.get(`/api/v1/app/get-all-posts?limit=${limit}`);
};

export const GetDetailPost = (id) => {
    return axios.get(`/api/v1/app/get-detail-post?id=${id}`, {
        withCredentials: true,
    });
};

export const GetPostRelated = (id, limit) => {
    return axios.get(`/api/v1/app/get-post-related-limit?id=${id}&limit=${limit}`);
};

export const HeartPost = (data) => {
    return axios.post(`/api/v1/app/heart-post`, data, {
        withCredentials: true,
    });
};

export const GetAllPostManage = (limit, page) => {
    return axios.get(`/api/v1/app/get-all-post-manage?limit=${limit}&page=${page}`, {
        withCredentials: true,
    });
};

export const UpdateStatusPost = (id, status) => {
    return axios.patch(
        `/api/v1/app/update-status-post-manage`,
        {
            id,
            status,
        },
        {
            withCredentials: true,
        },
    );
};

export const GetDetailPostEdit = (id) => {
    return axios.get(`/api/v1/app/get-detail-post-edit-by-id?id=${id}`, {
        withCredentials: true,
    });
};

export const UpdatePostEdit = (data) => {
    return axios.patch(`/api/v1/app/update-edit-post`, data, {
        withCredentials: true,
    });
};

export const SearchProductInShop = (q) => {
    return axios.get(`/api/v1/app/search-product-in-shop?q=${q}`, {
        withCredentials: true,
    });
};
