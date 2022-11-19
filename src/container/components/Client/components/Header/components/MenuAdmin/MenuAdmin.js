import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './MenuAdmin.scss';
import * as actions from '../../../../../../.././store/actions';
import { languages } from '../../../../../../../utils/constant';

MenuAdmin.propTypes = {
    handleClose: PropTypes.func.isRequired,
};

function MenuAdmin({ handleClose }) {
    const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';

    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    const handleClickBody = (e) => {
        e.stopPropagation();
    };

    const handleChangeLanguage = (lang) => {
        dispatch(actions.ChangeLanguageApp(lang));
    };

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);

            if (decoded.roleId !== 'R3') {
                setIsAdmin(true);
            }
        }
    }, [token]);

    const history = useNavigate();

    const handleRedirectAdminLogin = () => {
        if (!isAdmin) {
            history('/system/admin-auth');
        }
    };

    const handleRedirectPageAdmin = () => {
        history('/system/admin-page/manage-product/add-new-product');
    };

    return (
        <div className="fixed-jsx" onClick={handleClose}>
            <div className="menu-admin-app">
                <span className="close" onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                </span>
                <span className="text">
                    <strong>
                        <FormattedMessage id="header.welecome" />
                    </strong>
                </span>
                <div className="body" onClick={(e) => handleClickBody(e)}>
                    <div className="select-language">
                        <FormattedMessage id="header.language" />
                        <ul className="lang">
                            <li className="vi" onClick={() => handleChangeLanguage(languages.VI)}>
                                <FormattedMessage id="header.vi" />
                            </li>
                            <li className="en" onClick={() => handleChangeLanguage(languages.EN)}>
                                <FormattedMessage id="header.en" />
                            </li>
                        </ul>
                    </div>
                    <div className="select-language text-center" onClick={handleRedirectAdminLogin}>
                        {!isAdmin ? (
                            <FormattedMessage id="header.nextAdmin" />
                        ) : (
                            <FormattedMessage id="header.welcomeAdmin" />
                        )}
                        {isAdmin && (
                            <ul className="lang text-start">
                                <li className="vi pt-2" onClick={handleRedirectPageAdmin}>
                                    <FormattedMessage id="header.pageAdmin" />
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuAdmin;
