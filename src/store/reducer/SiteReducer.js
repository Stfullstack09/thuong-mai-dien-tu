import actionType from '../actions/actionTypes';

const initialState = {
    listAddress: [],
    listGender: [],
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

        default:
            return state;
    }
};

export default SiteReducer;
