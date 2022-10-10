import actionType from '../actions/actionTypes';

const initialState = {
    listAddress: [],
    listGender: [],
    listCategory: [],

    detailProductByAdmin: {},
    listAllProductByAdmin: [],

    isLoading: false,
};

const SiteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SITE_GET_LIST_ADDRESS_SUCCESS: {
            const cloneStateListAddress = { ...state };

            cloneStateListAddress.listAddress = action.data;

            return {
                ...cloneStateListAddress,
            };
        }

        case actionType.SITE_GET_LIST_ADDRESS_FAILED: {
            return state;
        }

        case actionType.SITE_GET_LIST_GENDER_SUCCESS: {
            const cloneStateListGender = { ...state };

            cloneStateListGender.listGender = action.data;

            return {
                ...cloneStateListGender,
            };
        }

        case actionType.SITE_GET_LIST_GENDER_FAILED: {
            return state;
        }

        case actionType.GET_CATEGORY_SUCCESS: {
            const cloneStateListCategory = { ...state };

            cloneStateListCategory.listCategory = action.data;

            return {
                ...cloneStateListCategory,
            };
        }

        case actionType.GET_CATEGORY_FAILED: {
            return state;
        }

        case actionType.GET_DETAIL_PRODUCT_BY_ADMIN_SUCCESS: {
            const cloneStateDetailProductByAdmin = { ...state };

            cloneStateDetailProductByAdmin.detailProductByAdmin = action.data;

            return {
                ...cloneStateDetailProductByAdmin,
            };
        }

        case actionType.GET_DETAIL_PRODUCT_BY_ADMIN_FAILED: {
            return state;
        }

        case actionType.GET_ALL_PRODUCT_BY_ADMIN_SUCCESS: {
            const cloneStateAllProductByAdmin = { ...state };

            cloneStateAllProductByAdmin.listAllProductByAdmin = action.data;

            return {
                ...cloneStateAllProductByAdmin,
            };
        }

        case actionType.GET_ALL_PRODUCT_BY_ADMIN_FAILED: {
            return state;
        }

        case actionType.SET_IS_LOADING: {
            const cloneState = { ...state };

            cloneState.isLoading = !state.isLoading;

            return {
                ...cloneState,
            };
        }

        default:
            return state;
    }
};

export default SiteReducer;
