import React from 'react';
import { faDev, faUsps } from '@fortawesome/free-brands-svg-icons';
import { faHelicopter, faHistory, faNetworkWired, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { DashBoard, IconLogo } from '../../../../components/icons';
import HeaderDashBoard from './components/HeaderDashBoard';
import History from './components/History';
import HomeProfile from './components/Home/HomeProfile';
import Post from './components/post/post';
import RegisterSell from './components/RegisterSell';
import SellerChannelRedirect from './components/SellerChannelRedirect';
import * as actions from '../../../../store/actions';

import './dashboard.scss';
import SendEmail from './components/sendEmail';

function Dashboard() {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.SiteReducer.currentUser);

    const [isClick, setIsClick] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [user, setUser] = useState({});

    const history = useNavigate();

    const handleRedirect = (link) => {
        history(link);
    };

    useEffect(() => {
        dispatch(actions.getCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (!_.isEmpty(currentUser)) {
            setUser(currentUser);

            if (currentUser.roleId !== 'R3') {
                setIsValid(false);
            }
        }
    }, [currentUser]);

    return (
        <>
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
                            <h1 className="my-2 fw-bold title-logo-jsx mt-4" onClick={() => handleRedirect('/')}>
                                <span className="p-0 m-0">
                                    <IconLogo />
                                </span>
                            </h1>
                            <div className="user-current my-3 mx-auto mb-4">
                                {!_.isEmpty(user) && (
                                    <>
                                        <div className="img">
                                            <img src={user.avatar} alt={user.avatar} />
                                        </div>
                                        <div className="introduction">
                                            <h6>{`${user.firstName} ${user.lastName}`}</h6>
                                            <p>{user.roleData.valueVI}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="content">
                                <ul className="p-0 m-0">
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/dashboard/profile/me"
                                        >
                                            <DashBoard />
                                            <span>Thông tin của bạn</span>
                                        </NavLink>
                                    </li>
                                    {isValid ? (
                                        <li className="text-start mb-1">
                                            <NavLink
                                                className={({ isActive }) =>
                                                    isActive ? 'active px-2 py-3' : 'px-2 py-3'
                                                }
                                                to="/dashboard/sales-registration"
                                            >
                                                <FontAwesomeIcon icon={faShop} />
                                                <span>Đăng ký bán hàng</span>
                                            </NavLink>
                                        </li>
                                    ) : (
                                        <li className="text-start mb-1">
                                            <NavLink
                                                className={({ isActive }) =>
                                                    isActive ? 'active px-2 py-3' : 'px-2 py-3'
                                                }
                                                to="/dashboard/order-management"
                                            >
                                                <FontAwesomeIcon icon={faShop} />
                                                <span>Quản lí đơn hàng</span>
                                            </NavLink>
                                        </li>
                                    )}
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/dashboard/purchase-history"
                                        >
                                            <FontAwesomeIcon icon={faHistory} />
                                            <span>Lịch sử mua hàng</span>
                                        </NavLink>
                                    </li>
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/dashboard/post/create-new-post"
                                        >
                                            <FontAwesomeIcon icon={faUsps} />
                                            <span>Tạo viết giới thiệu</span>
                                        </NavLink>
                                    </li>
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/dashboard/post/manage-posts"
                                        >
                                            <FontAwesomeIcon icon={faNetworkWired} />
                                            <span>Chỉnh sửa bài viết</span>
                                        </NavLink>
                                    </li>
                                    <li className="text-start mb-1">
                                        <NavLink
                                            className={({ isActive }) => (isActive ? 'active px-2 py-3' : 'px-2 py-3')}
                                            to="/dashboard/sendemail"
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
                                <div className="mt-5 d-flex justify-content-center align-items-center">
                                    <Link className="redirect-link py-3" to="/">
                                        Tiếp tục mua hàng?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8-customize content-right p-2">
                        <HeaderDashBoard />
                        <div className="wrapper-right-content">
                            <Routes>
                                <Route path="/profile/me" element={<HomeProfile />} />
                                <Route path="/purchase-history" element={<History />} />
                                <Route path="/sales-registration" element={<RegisterSell />} />
                                <Route path="/post/*" element={<Post />} />
                                <Route path="/order-management" element={<SellerChannelRedirect />} />
                                <Route path="/sendemail" element={<SendEmail />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
