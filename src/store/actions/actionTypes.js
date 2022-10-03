const actionType = Object.freeze({
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE_APP: 'CHANGE_LANGUAGE',

    SITE_GET_LIST_ADDRESS_SUCCESS: 'SITE_GET_LIST_ADDRESS_SUCCESS',
    SITE_GET_LIST_ADDRESS_FAILED: 'SITE_GET_LIST_ADDRESS_FAILED',

    SITE_GET_LIST_GENDER_SUCCESS: 'SITE_GET_LIST_GENDER_SUCCESS',
    SITE_GET_LIST_GENDER_FAILED: 'SITE_GET_LIST_GENDER_FAILED',

    // authentication methods

    AUTH_REGISTER_SUCCESS: 'AUTH_REGISTER_SUCCESS',
    AUTH_REGISTER_FAILED: 'AUTH_REGISTER_FAILED',

    AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED',

    AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
    AUTH_LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
});

export default actionType;
