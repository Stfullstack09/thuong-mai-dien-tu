import React from 'react';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderManageOrder from './components/HeaderManageOrder/HeaderManageOrder';

import styles from './ManageOrder.module.scss';
import RenderEmail from './components/RenderEmail';
import * as actions from '../../../../store/actions';
import AllProduct from './components/AllProduct/AllProduct';
import ViewPDF from './components/ViewPDF';
import FooterChuk from '../FooterChuk';

const cx = classNames.bind(styles);

function ManageOrder() {
    const dispatch = useDispatch();

    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isViewPDF, setIsViewPDF] = useState(false);
    const [data, setData] = useState({});
    const [listAllProduct, setListAllProduct] = useState([]);

    const productAll = useSelector((state) => state.SiteReducer.listAllProduct);

    useEffect(() => {
        dispatch(actions.getAllOrderProduct());
    }, [dispatch]);

    useEffect(() => {
        setListAllProduct(productAll);
    }, [productAll]);

    const handleToggleEmail = () => {
        setIsOpenEmail(!isOpenEmail);
    };

    const handleViewPDF = (data) => {
        setData(data);
        setIsViewPDF(true);
    };

    const handleToggleVewPDF = () => {
        setIsViewPDF(false);
    };

    useEffect(() => {
        document.title = 'UNOMO Kênh Người Bán';
    });

    return (
        <>
            <div className={cx('manage-order-wrapper')}>
                <div className={cx('scroll')}>
                    <HeaderManageOrder />
                    <div className={cx('wrap-list')}>
                        <div className={cx('body-content')}>
                            <div className={cx('product-as')}>
                                <div className={cx('select')}>
                                    <h2 className={cx('title', 'text-center')}>Đơn hàng trong shop của bạn!</h2>
                                    <select>
                                        <option value="">Tất cả đơn hàng</option>
                                        <option value="">Đơn hàng đã xác nhận</option>
                                        <option value="">Đơn hàng chưa xác nhận</option>
                                        <option value="">Đơn hàng đã hủy</option>
                                    </select>
                                    <button onClick={handleToggleEmail}>Gửi email</button>
                                </div>
                                <AllProduct list={listAllProduct} handleViewPDF={handleViewPDF} />
                            </div>
                        </div>
                        <div className={cx('over-footer')}>
                            <FooterChuk />
                        </div>
                    </div>
                </div>
            </div>
            <RenderEmail list={listAllProduct} isOpen={isOpenEmail} handleToggle={handleToggleEmail} />
            <ViewPDF isViewPDF={isViewPDF} data={data} handleToggleVewPDF={handleToggleVewPDF} />
        </>
    );
}

export default ManageOrder;
