import { GetListAddress, GetListGender, RefreshToken } from '../../services';
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
