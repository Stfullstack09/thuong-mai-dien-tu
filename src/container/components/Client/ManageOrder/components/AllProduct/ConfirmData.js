import _ from 'lodash';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../ManageOrder.module.scss';

const cx = classNames.bind(styles);

const ConfirmData = ({ data = {}, dataSelect, setDataSelect = () => {} }) => {
    const handleSelectUpdateStatus = (e) => {
        if (e.target.value === 'vc') {
            if (!_.isEmpty(data)) {
                if (!data.timeBank) {
                    alert('Bạn phải xác minh thông tin thanh toán trước rồi mới có thể thay đổi sang nhà vận chuyển !');
                    return;
                }
            }
        }

        let dataBuild = {
            time: new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Ho_Chi_Minh' })).getTime(),
            type: e.target.value,
            id: data ? data.id : 0,
        };

        if (e.target.value === 'cancel') {
            setDataSelect({
                type: 'cancel',
            });
            return;
        }

        setDataSelect(dataBuild);
    };

    return (
        <div>
            {!_.isEmpty(data) && !data.timeDone ? (
                <>
                    <p className="text-center">
                        <strong>Thay đổi trạng thái đơn hàng</strong>
                    </p>
                    <div>
                        <select
                            value={dataSelect.type}
                            className={cx('select-modal')}
                            onChange={(e) => handleSelectUpdateStatus(e)}
                        >
                            <option value="cancel">----Select status----</option>
                            {!data.timeBank && <option value="bank">Đã Xác Minh Thanh Toán</option>}
                            {!data.timeVC && <option value="vc">Đã Giao Cho Nhà Vận Chuyển</option>}
                        </select>
                    </div>
                </>
            ) : (
                <p className="text-center">
                    <strong>
                        Đơn hàng đã được giao vào{' '}
                        {`${new Date(+data.timeDone).toLocaleTimeString('vi-VI')} ${new Date(
                            +data.timeDone,
                        ).toLocaleDateString('vi-VI')}`}
                    </strong>
                </p>
            )}
        </div>
    );
};

export default ConfirmData;
