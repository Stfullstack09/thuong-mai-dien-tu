import React from 'react';

import './loading.scss';

function PacmanLoaderLoading() {
    return (
        <div className="loading-wrapper-PacmanLoaderLoading">
            <div className="overlay"></div>
            <div className="loading">
                <span className="loading-jax">
                    <span></span>
                    <p>Đang tải dữ liệu</p>
                </span>
            </div>
        </div>
    );
}

export default PacmanLoaderLoading;
