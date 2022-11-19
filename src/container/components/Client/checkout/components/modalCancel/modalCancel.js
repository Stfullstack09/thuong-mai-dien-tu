import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { languages } from '../../../../../../utils/constant';

import './modalCancel.scss';

function ModalCancel() {
    const language = useSelector((state) => state.app.language);

    return (
        <div className="modal-cancel-wrapper">
            <div className="content">
                <div className="body-content">
                    <div className="blur"></div>
                    <div className="content-children">
                        <h1>
                            <span>
                                {language === languages.VI
                                    ? 'Do đã hết thời gian chờ bạn vui lòng thanh toán lại.'
                                    : 'Due to the waiting time has expired, please pay again.'}
                            </span>
                        </h1>
                        <p>
                            {language === languages.VI
                                ? 'Click vào đây để quay lại giỏ hàng'
                                : 'Click here to return to your shopping cart'}{' '}
                            <Link to="/cart"> {language === languages.VI ? 'tại đây.' : 'here.'}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCancel;
