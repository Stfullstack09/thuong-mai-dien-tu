import { GetListAddress } from '../../services';
import actionType from './actionTypes';

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
