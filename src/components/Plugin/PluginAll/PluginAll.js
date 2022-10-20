import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PluginAll.scss';
import PhoneIcon from '../../.././assets/image/phone-call-icon.png';
import ZaloIcon from '../../.././assets/image/zalo-sharelogo.png';
import FacebookIcon from '../../.././assets/image/facebook.png';
import CartIcon from '../../.././assets/image/cart.png';
import * as actions from '../../../store/actions';

function PluginAll() {
    const [listCart, setListCart] = useState([]);

    const dispatch = useDispatch();
    const history = useNavigate();

    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const listAllProduct = useSelector((state) => state.SiteReducer.listAllProduct);

    useEffect(() => {
        setListCart(listAllProduct);
    }, [listAllProduct]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(actions.getAllProductToCart(userInfo.id));
        }
    }, [dispatch, userInfo, isLoggedIn]);

    const handleRedirect = () => {
        history('/cart');
    };

    return (
        <>
            <div className="plugin-all-wrapper">
                <div className="chuk-jsx-icon-plugin icon-phone">
                    <a href="tel:0869224813">
                        <img src={PhoneIcon} alt="phone" />
                        <div className="jsx-ds"></div>
                        <div className="jsx-ani-ds"></div>
                    </a>
                </div>
                <div className="chuk-jsx-icon-plugin icon-phone">
                    <a href="https://zalo.me/g/xvffwc116" target="_blank" rel="noreferrer">
                        <img src={ZaloIcon} alt="phone" />
                        <div className="jsx-ds"></div>
                        <div className="jsx-ani-ds"></div>
                    </a>
                </div>

                <div className="chuk-jsx-icon-plugin icon-phone">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <img src={FacebookIcon} alt="phone" />
                    </a>
                </div>
            </div>
            <div className="cart-wrapper-icon" onClick={handleRedirect}>
                <img src={CartIcon} alt="Giỏ hàng" />
                {listCart && listCart.length > 0 && <span className="jsx-count-cart">{listCart.length}</span>}
            </div>
        </>
    );
}

export default PluginAll;
