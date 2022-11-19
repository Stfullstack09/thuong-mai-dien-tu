import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import CoVietNam from '../../../../../../assets/image/Hinh-nen-co-Viet-Nam-full-HD-4K-1.webp';
import CoEngland from '../../../../../../assets/image/united-kingdom-flag_16x9.webp';
import { languages } from '../../../../../../utils/constant';
import * as actions from '../../../../../../store/actions';
import './HeaderDashBoard.scss';
import SearchHeader from '../../../components/Header/components/Search/Search';
import _ from 'lodash';

function HeaderDashBoard() {
    const dispatch = useDispatch();

    const language = useSelector((state) => state.app.language);
    const currentUser = useSelector((state) => state.SiteReducer.currentUser);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const handleChangeLanguage = (lang) => {
        dispatch(actions.ChangeLanguageApp(lang));
    };

    return (
        <>
            <div className="header-dashboard-wrapper">
                <>
                    <div className="left ps-3">
                        <button className="btn" onClick={() => setIsOpenSearch(true)}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <div className="right pe-4">
                        <div
                            className="change-language"
                            onClick={() =>
                                handleChangeLanguage(language === languages.VI ? languages.EN : languages.VI)
                            }
                        >
                            {language === languages.VI ? (
                                <img src={CoEngland} alt="CoEngland" />
                            ) : (
                                <img src={CoVietNam} alt="CoVietNam" />
                            )}
                        </div>
                        {!_.isEmpty(user) && (
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${user.avatar})`,
                                }}
                            ></div>
                        )}
                    </div>
                </>
            </div>
            <SearchHeader isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
        </>
    );
}

export default HeaderDashBoard;
