import { faDev, faUsps } from '@fortawesome/free-brands-svg-icons';
import { faHelicopter, faHistory, faNetworkWired, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { DashBoard } from '../../../../components/icons';
import { GetCurrentUser } from '../../../../services';
import History from './components/History';
import HomeProfile from './components/Home/HomeProfile';
import OrderManage from './components/OderManage/OderManage';
import Post from './components/post/post';
import RegisterSell from './components/RegisterSell';

import './profile.scss';

function Profile() {
    const [isClick, setIsClick] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const fetch = async () => {
        const Res = await GetCurrentUser();

        if (Res && Res.errCode === 0) {
            if (!_.isEmpty(Res.data)) {
                if (Res.data.roleId !== 'R3') {
                    setIsValid(false);
                }
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const history = useNavigate();

    const handleRedirect = (link) => {
        history(link);
    };

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
                        <h1 className="my-4 fw-bold title-logo-jsx" onClick={() => handleRedirect('/')}>
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
                                {isValid ? (
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/profile/sales-registration"
                                        >
                                            <FontAwesomeIcon icon={faShop} />
                                            <span>Đăng ký bán hàng</span>
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/profile/order-management"
                                        >
                                            <FontAwesomeIcon icon={faShop} />
                                            <span>Quản lí đơn hàng</span>
                                        </NavLink>
                                    </li>
                                )}
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/purchase-history"
                                    >
                                        <FontAwesomeIcon icon={faHistory} />
                                        <span>Lịch sử mua hàng</span>
                                    </NavLink>
                                </li>
                                <li className="text-start mb-1">
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/post/create-new-post"
                                    >
                                        <FontAwesomeIcon icon={faUsps} />
                                        <span>Tạo viết giới thiệu</span>
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                        to="/profile/post/manage-post"
                                    >
                                        <FontAwesomeIcon icon={faNetworkWired} />
                                        <span>Quản lí bài viết</span>
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
                        <Route path="/purchase-history" element={<History />} />
                        <Route path="/sales-registration" element={<RegisterSell />} />
                        <Route path="/post/*" element={<Post />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Profile;
