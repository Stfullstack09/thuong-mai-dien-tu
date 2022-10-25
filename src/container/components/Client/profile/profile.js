import { faDev } from '@fortawesome/free-brands-svg-icons';
import { faHelicopter, faHistory, faNetworkWired, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import { DashBoard } from '../../../../components/icons';
import HomeProfile from './components/Home/HomeProfile';

import './profile.scss';

function Profile() {
    const [isClick, setIsClick] = useState(false);

    return (
        <div className="profile-jsx-wrapper">
            <div className={isClick ? 'active-mobile active' : 'active-mobile'} onClick={() => setIsClick(true)}>
                <span></span>
            </div>
            <div className="d-flex">
                {isClick && (
                    <div
                        className={!isClick ? 'div-jsx-overlay' : 'div-jsx-overlay active'}
                        onClick={() => setIsClick(false)}
                    ></div>
                )}
                <div className={isClick ? 'col-4-customize nav-jsx active' : 'col-4-customize nav-jsx'}>
                    <div className="text-center">
                        <h1 className="my-4 fw-bold title-logo-jsx">
                            <span className="p-0 m-0">UNOMO</span>
                        </h1>
                        <div className="content">
                            <ul className="p-0 m-0">
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/me"
                                    >
                                        <DashBoard />
                                        <span>Thông tin của bạn</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/sales-registration"
                                    >
                                        <FontAwesomeIcon icon={faShop} />
                                        <span>Đăng ký bán hàng</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/me1"
                                    >
                                        <FontAwesomeIcon icon={faHistory} />
                                        <span>Lịch sử mua hàng</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/me4"
                                    >
                                        <FontAwesomeIcon icon={faNetworkWired} />
                                        <span>Bài viết giới thiệu</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/me5"
                                    >
                                        <FontAwesomeIcon icon={faHelicopter} />
                                        <span>Gửi email cho khách hàng</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/me3"
                                    >
                                        <FontAwesomeIcon icon={faDev} />
                                        <span>UNOMO developer</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-8-customize content-right">
                    <Routes>
                        <Route path="/me" element={<HomeProfile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Profile;
