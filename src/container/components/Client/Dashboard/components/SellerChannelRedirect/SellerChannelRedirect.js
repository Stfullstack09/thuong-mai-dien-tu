import React from 'react';
import { Link } from 'react-router-dom';

function SellerChannelRedirect() {
    return (
        <div className="seller-channel-redirect d-flex justify-content-center align-items-center">
            <div>
                <h2 className="fw-bold text-center py-4 pb-1">Chào mừng bạn đã đến với quản lí đơn hàng của UNOMO</h2>
                <p className="text-center">
                    <span>
                        Bạn vui lòng click <Link to="/onboard/my-manage-order">vào đây</Link> để chuyển đến trang Kênh
                        Người Bán
                    </span>
                    <span className="mx-2">
                        nếu bạn muốn tìm hiểu về cơ chế bán hàng vui lòng click{' '}
                        <Link to="/detail-post-create-new-by-customer/12">tại đây</Link>
                    </span>
                </p>
                <div>
                    <iframe
                        className="jax-border-6px"
                        width="942"
                        height="530"
                        src="https://www.youtube.com/embed/7U1DKhf-ZFw"
                        title="Hướng Dẫn Bán Hàng Shopee Cho Người Mới Bắt Đầu | #NBKN 1 | Shopee Uni"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default SellerChannelRedirect;
