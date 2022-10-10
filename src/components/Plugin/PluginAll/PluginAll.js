import './PluginAll.scss';
import PhoneIcon from '../../.././assets/image/phone-call-icon.png';
import ZaloIcon from '../../.././assets/image/zalo-sharelogo.png';
import FacebookIcon from '../../.././assets/image/facebook.png';
import CartIcon from '../../.././assets/image/cart.png';

function PluginAll() {
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
            <div className="cart-wrapper-icon">
                <img src={CartIcon} alt="Giỏ hàng" />
            </div>
        </>
    );
}

export default PluginAll;
