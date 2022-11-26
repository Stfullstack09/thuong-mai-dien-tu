import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import styles from '../../ManageOrder.module.scss';
import LogoImg from '../../../../../../assets/image/aa3f1d1e.png';
import { languages } from '../../../../../../utils/constant';
import TippyRender from '../../../../../../components/TippyRender/RenderHeader/TippyRender';
import * as actions from '../../../../../.././store/actions';
import RenderSearch from '../../../../../../components/TippyRender/RenderSearch';
import { MenuItem, userMenu } from '../../../../../.././utils/constant';

const cx = classNames.bind(styles);

function HeaderManageOrder() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();

    const language = useSelector((state) => state.app.language);
    const currentUser = useSelector((state) => state.SiteReducer.currentUser);

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        if (_.isEmpty(currentUser)) {
            dispatch(actions.getCurrentUser());
        }
    }, [dispatch, currentUser]);

    function handleMenuChange(menuItem) {
        console.log(menuItem);
    }

    return (
        <div className={cx('header-manage-order-wrapper')}>
            <div className={cx('container-customize')}>
                <div>
                    <img className={cx('img-logo')} src={LogoImg} alt="LogoImg" />
                </div>
                <div className={cx('right-jax-manage-order')}>
                    {
                        <RenderSearch>
                            <span className={cx('span-sesrch')}>
                                <input placeholder="Tìm kiếm đơn hàng qua ID" />
                                <i className="bi bi-x-circle"></i>
                            </span>
                        </RenderSearch>
                    }
                    {!_.isEmpty(user) && (
                        <TippyRender items={isLoggedIn ? MenuItem : userMenu} onChange={handleMenuChange}>
                            {isLoggedIn ? (
                                <img className={cx('img-avatar')} src={user.avatar} alt={user.avatar} />
                            ) : (
                                <img
                                    className={cx('img-avatar')}
                                    src="https://cdn-icons-png.flaticon.com/512/483/483343.png"
                                    alt="https://cdn-icons-png.flaticon.com/512/483/483343.png"
                                />
                            )}
                        </TippyRender>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderManageOrder;
