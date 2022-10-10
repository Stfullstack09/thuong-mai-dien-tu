import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faNewspaper, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './PageAdmin.scss';
import Anh3 from '../../../../assets/image/background-dep-nhe-nhang-cho-powerpoint.jpg';
import ManageProduct from '../components/ManageProduct/ManageProduct';

function PageAdmin() {
    const history = useNavigate();

    const isLoading = useSelector((state) => state.SiteReducer.isLoading);

    const [isShow, setIsShow] = useState(false);
    const [isShowTwo, setIsShowTwo] = useState(false);

    const handleRedirect = (link) => {
        history(link);
    };

    return (
        <div
            className="page-admin-wrapepr"
            style={{
                backgroundImage: `url('${Anh3}')`,
            }}
        >
            <div className="filter"></div>
            <div className="d-flex align-items-center h-100">
                <div className="slider-bar-admin-page">
                    <h1 className="trademark" onClick={() => handleRedirect('/')}>
                        UNOMO WELCOME ADMIN
                    </h1>
                    <div className="jsx-slider-body">
                        <button
                            onClick={() => setIsShowTwo(!isShowTwo)}
                            className={isShowTwo ? 'item-btn-jsx new' : 'item-btn-jsx'}
                        >
                            <div className="d-inline-flex align-items-center jsx-new-dse">
                                <FontAwesomeIcon icon={faProductHunt} />
                                <p className="p-0 m-0">
                                    <FormattedMessage id="admin.product.title" />
                                </p>
                                <span className="new">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                            {isShowTwo && (
                                <div
                                    className="d-block w-100 text-start item-children"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <ul>
                                        <li
                                            onClick={() =>
                                                handleRedirect('/system/admin-page/manage-product/add-new-product')
                                            }
                                        >
                                            <FormattedMessage id="admin.product.addPro" />
                                        </li>

                                        <li
                                            onClick={() =>
                                                handleRedirect('/system/admin-page/manage-product/edit-product')
                                            }
                                        >
                                            <FormattedMessage id="admin.product.editPro" />
                                        </li>

                                        <li
                                            onClick={() =>
                                                handleRedirect('/system/admin-page/manage-product/all-action-product')
                                            }
                                        >
                                            <FormattedMessage id="admin.product.managePro" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="admin.product.postPro" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="admin.product.postBanner" />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button>
                        <button className="item-btn-jsx">
                            <FontAwesomeIcon icon={faPeopleRoof} />
                            <p className="d-line-block p-0 m-0">
                                <FormattedMessage id="admin.manageShop.title" />
                            </p>
                            <span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </span>
                        </button>
                        <button
                            className={isShow ? 'item-btn-jsx new' : 'item-btn-jsx'}
                            onClick={() => setIsShow(!isShow)}
                        >
                            <div className="d-inline-flex align-items-center jsx-new-dse">
                                <FontAwesomeIcon icon={faNewspaper} />
                                <p className="p-0 m-0">
                                    <FormattedMessage id="admin.managePost.title" />
                                </p>
                                <span className="new">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                            {isShow && (
                                <div className="d-block w-100 text-start item-children">
                                    <ul>
                                        <li>
                                            <FormattedMessage id="admin.managePost.portWithShop" />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                <div className="body-admin-page h-100">
                    <div className="content h-100">
                        <Routes>
                            <Route path="/manage-product/*" element={<ManageProduct />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="loading-spinner">
                    <div className="text-center">
                        <div className="jsx-render-sd text-center">
                            <div className="jsx-sd">
                                <ClimbingBoxLoader className="custom-jsx" color="#36d7b7" />
                            </div>
                        </div>
                        <p className="text-center pt-3">Đang thực hiện hành động của bạn</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageAdmin;
