import {
    GetAllProductByAdmin,
    GetAllProductToCart,
    GetCateGory,
    GetDetailProductByAdmin,
    GetListAddress,
    GetListGender,
    RefreshToken,
} from '../../services';
import actionType from './actionTypes';
import { userLoginSuccess } from './userActions';

export const getListAddress = () => {
    return async (dispatch, state) => {
        try {
            const Res = await GetListAddress();

            if (Res && Res.errCode === 0) {
                dispatch(getListAddressSuccess(Res.data));
            } else {
                dispatch(getListAddressFailed());
            }
        } catch (error) {
            console.log(error);
            dispatch(getListAddressFailed());
        }
    };
};

export const getListAddressSuccess = (data) => {
    return {
        type: actionType.SITE_GET_LIST_ADDRESS_SUCCESS,
        data,
    };
};

export const getListAddressFailed = () => {
    return {
        type: actionType.SITE_GET_LIST_ADDRESS_FAILED,
    };
};

export const getListGender = () => {
    return async (dispatch, state) => {
        try {
            const Res = await GetListGender();

            if (Res && Res.errCode === 0) {
                dispatch(getListGenderSuccess(Res.data));
            } else {
                dispatch(getListGenderFailed());
            }
        } catch (error) {
            console.log(error);
            dispatch(getListGenderFailed());
        }
    };
};

export const getListGenderSuccess = (data) => {
    return {
        type: actionType.SITE_GET_LIST_GENDER_SUCCESS,
        data,
    };
};

export const getListGenderFailed = () => {
    return {
        type: actionType.SITE_GET_LIST_GENDER_FAILED,
    };
};

export const RefreshTokenAction = () => {
    return async (dispatch, state) => {
        try {
            const Res = await RefreshToken();

            if (Res && Res.errCode === 0) {
                localStorage.setItem('accessToken', Res.user.accessToken);
                dispatch(userLoginSuccess(Res.user));
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };
};

export const setIsLoading = () => {
    return {
        type: actionType.SET_IS_LOADING,
    };
};

export const getCateGory = () => {
    return async (dispatch, getState) => {
        try {
            const Res = await GetCateGory();

            if (Res && Res.errCode === 0) {
                dispatch(getCateGorySuccess(Res.data));
            } else {
                dispatch(getCateGoryFailed());
            }
        } catch (error) {
            dispatch(getCateGoryFailed());
        }
    };
};

export const getCateGorySuccess = (data) => {
    return {
        type: actionType.GET_CATEGORY_SUCCESS,
        data,
    };
};

export const getCateGoryFailed = () => {
    return {
        type: actionType.GET_CATEGORY_FAILED,
    };
};

export const getDetailProductByAdmin = (id) => {
    return async (dispatch, getState) => {
        try {
            const Res = await GetDetailProductByAdmin(id);

            if (Res && Res.errCode === 0) {
                dispatch(getDetailProductByAdminSuccess(Res.data));
            } else {
                dispatch(getDetailProductByAdminFailed());
            }
        } catch (error) {
            dispatch(getDetailProductByAdminFailed());
        }
    };
};

export const getDetailProductByAdminSuccess = (data) => {
    return {
        type: actionType.GET_DETAIL_PRODUCT_BY_ADMIN_SUCCESS,
        data,
    };
};

export const getDetailProductByAdminFailed = () => {
    return {
        type: actionType.GET_DETAIL_PRODUCT_BY_ADMIN_FAILED,
    };
};

export const getAllProductByAdmin = () => {
    return async (dispatch, getState) => {
        try {
            const Res = await GetAllProductByAdmin();

            if (Res && Res.errCode === 0) {
                dispatch(getAllProductByAdminSuccess(Res.data));
            } else {
                dispatch(getAllProductByAdminFailed());
            }
        } catch (error) {
            dispatch(getAllProductByAdminFailed());
        }
    };
};

export const getAllProductByAdminSuccess = (data) => {
    return {
        type: actionType.GET_ALL_PRODUCT_BY_ADMIN_SUCCESS,
        data,
    };
};

export const getAllProductByAdminFailed = () => {
    return {
        type: actionType.GET_ALL_PRODUCT_BY_ADMIN_FAILED,
    };
};

export const getAllProductToCart = (id) => {
    return async (dispatch, state) => {
        try {
            const Res = await GetAllProductToCart(id);

            if (Res && Res.errCode === 0) {
                dispatch(getAllProductToCartSuccess(Res.data));
            } else {
                dispatch(getAllProductToCartFailed());
            }
        } catch (error) {
            console.log(error);
            dispatch(getAllProductToCartFailed());
        }
    };
};

export const getAllProductToCartSuccess = (data) => {
    return {
        type: actionType.GET_ALL_PRODUCT_TO_CART_SUCCESS,
        data,
    };
};

export const getAllProductToCartFailed = () => {
    return {
        type: actionType.GET_ALL_PRODUCT_TO_CART_FAILED,
    };
};
