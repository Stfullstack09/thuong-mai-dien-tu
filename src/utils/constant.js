export const path = {
    home: '/*',
    system: '/system/*',
    cart: '/cart',
    profile: '/@:email',
    checkout: '/checkout/*',
    dashboard: '/dashboard/*',
    manageOrder: '/onboard/my-manage-order',
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

export const MenuItem = [
    {
        icon: <i className="bi bi-translate"></i>,
        title: 'Tiếng Việt',
        children: {
            icon: <i className="bi bi-translate"></i>,
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: languages.EN,
                    title: 'English',
                },
                {
                    type: 'language',
                    code: languages.VI,
                    title: 'Tiếng Việt (Việt Nam)',
                },
            ],
        },
    },
    {
        icon: <i className="bi bi-person-vcard"></i>,
        title: 'Xem tài khoản',
        to: '/dashboard/profile/me',
    },
    {
        icon: <i className="bi bi-send-x-fill"></i>,
        title: 'Đăng Xuất',
        to: '/system/logout',
    },
];

export const userMenu = [
    {
        icon: <i className="bi bi-translate"></i>,
        title: 'Tiếng Việt',
        children: {
            icon: <i className="bi bi-translate"></i>,
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: languages.EN,
                    title: 'English',
                },
                {
                    type: 'language',
                    code: languages.VI,
                    title: 'Tiếng Việt (Việt Nam)',
                },
            ],
        },
    },
    {
        icon: <i className="bi bi-person-vcard"></i>,
        title: 'Xem tài khoản',
        to: '/dashboard/profile/me',
    },
    {
        icon: <i className="bi bi-person-heart"></i>,
        title: 'Đăng nhập',
        to: '/system/login-register-account',
    },
];
