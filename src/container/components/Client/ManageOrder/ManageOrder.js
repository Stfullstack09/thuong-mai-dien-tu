import classNames from 'classnames/bind';
import HeaderManageOrder from './components/HeaderManageOrder/HeaderManageOrder';

import styles from './ManageOrder.module.scss';

const cx = classNames.bind(styles);

function ManageOrder() {
    return (
        <div className={cx('manage-order-wrapper')}>
            <HeaderManageOrder />
        </div>
    );
}

export default ManageOrder;
