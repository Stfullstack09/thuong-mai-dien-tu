import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAngleUp, faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Overlay from '../../../../../components/Overlay';

function Header() {
    const [header, setHeader] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
                        <div className="col-8 right-content">
                            <ul className="pc">
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
                                    <Link to="/system/login-register-account">Đăng Nhập</Link>
                                </li>
                                <li>
                                    <a href="tel:0869224813" className="Phone">
                                        <FontAwesomeIcon icon={faPhone} />+ 0869224813
                                    </a>
                                </li>
                            </ul>
                            <ul className="tablet-and-mobile">
                                <li>
                                    <a href="tel:0869224813" className="Phone">
                                        <FontAwesomeIcon icon={faPhone} />+ 0869224813
                                    </a>
                                </li>
                                <li
                                    onClick={() => setIsOpen(true)}
                                    style={{
                                        cursor: 'pointer',
                                        color: '#fff',
                                        fontSize: 18,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`scroll-top ${header}`} onClick={(e) => handleScroll(e)}>
                <FontAwesomeIcon icon={faAngleUp} />
            </div>

            <Overlay isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                <div className={`sidebar ${isOpen ? 'animation' : ''}`}>
                    {isOpen && (
                        <ul>
                            <li className="closed">
                                <button className="btn">
                                    <FontAwesomeIcon icon={faClose} />
                                </button>
                            </li>
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
                        </ul>
                    )}
                </div>
            </Overlay>
        </>
    );
}

export default Header;
