import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import './loading.scss';

function Loading() {
    return (
        <div className="loading-wrapper">
            <div className="loading">
                <ClipLoader color="#000" />
            </div>
        </div>
    );
}

export default Loading;
