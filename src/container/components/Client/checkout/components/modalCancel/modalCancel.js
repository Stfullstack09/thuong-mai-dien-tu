import { Link } from 'react-router-dom';
import './modalCancel.scss';

function ModalCancel() {
    return (
        <div className="modal-cancel-wrapper">
            <div className="content">
                <div className="body-content">
                    <div className="blur"></div>
                    <div className="content-children">
                        <h1>
                            <span>Do đã hết thời gian chờ bạn vui lòng thanh toán lại</span>
                        </h1>
                        <p>
                            Click vào đây để quay lại giỏ hàng <Link to="/cart">tại đây</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCancel;
