import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [header, setHeader] = useState('');

    const listenScrollEvent = () => {
        if (window.scrollY <= 70) {
            setHeader('');
        } else if (window.scrollY >= 70) {
            setHeader('header__slide__down');
        }
    };

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);

        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    return (
        <>
            <div className={`header-wrapper ${header}`}>
                <div className="container wrapper-content">
                    <div className="row wrapper-row">
                        <div className="col-4 logo">
                            <h2>UNOMO</h2>
                        </div>
                        <div className="col-8">
                            <ul>
                                <li>
                                    <a href="/">Trang chủ</a>
                                </li>
                                <li>
                                    <a href="/">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="/">Về chúng tôi</a>
                                </li>
                                <li>
                                    <Link to="/system/login">Đăng Nhập</Link>
                                </li>
                                <li>
                                    <a href="tel:0869224813" className="Phone">
                                        <FontAwesomeIcon icon={faPhone} />+ 0869224813
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`scroll-top ${header}`} onClick={(e) => handleScroll(e)}>
                <FontAwesomeIcon icon={faAngleUp} />
            </div>
        </>
    );
}

export default Header;
