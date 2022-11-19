export const path = {
    home: '/*',
    system: '/system/*',
    cart: '/cart',
    profile: '/@:email',
    checkout: '/checkout/*',
    dashboard: '/dashboard/*',
    stystemRoter: {
        loginandregister: '/login-register-account',
        logout: '/logout',
        loginadmin: '/admin-auth',
        pageAdmin: '/admin-page/*',
    },
    detailOrder: '/order-details-you-have-placed/:id',
    detailPost: '/detail-post-create-new-by-customer/:id',
};

export const languages = {
    VI: 'vi',
    EN: 'en',
};

export const CRUD_ACTIONS = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    READ: 'READ',
    DELETE: 'DELETE',
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY',
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N',
};

export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3',
};
