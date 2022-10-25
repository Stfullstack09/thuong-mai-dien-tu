import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAngleUp, faBars, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './Header.scss';
import Overlay from '../../../../../components/Overlay';
import MenuAdmin from './components/MenuAdmin';
import SearchHeader from './components/Search/Search';

function Header() {
    const [header, setHeader] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const isLogin = true;

    const history = useNavigate();

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

    const handleClose = () => {
        setIsShowMenu(!isShowMenu);
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);

        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    const handleRedirect = () => {
        history('/');
    };

    return (
        <>
            <div className={`header-wrapper ${header}`}>
                <div className="wrapper-content">
                    <div className="jsx-nav d-inline-block" onClick={handleClose}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className="container">
                        <div className="row wrapper-row">
                            <div className="col-4 logo">
                                <h2 onClick={handleRedirect}>UNOMO</h2>
                            </div>
                            <div className="col-8 right-content">
                                <ul className="pc">
                                    <li>
                                        <a href="/">
                                            <FormattedMessage id="header.home" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <FormattedMessage id="header.gender" />
                                        </a>
                                    </li>
                                    <li className="li-search" title="Tìm kiếm sản phẩm">
                                        <a
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsOpenSearch(!isOpenSearch);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </a>
                                    </li>
                                    {isLogin ? (
                                        <li>
                                            <a href="http://localhost:3002" target="_blank" rel="noreferrer">
                                                <FormattedMessage id="header.viewAccount" />
                                            </a>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link to="/system/login-register-account">
                                                <FormattedMessage id="header.login" />
                                            </Link>
                                        </li>
                                    )}
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
                                        className="jsx-responsive"
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </li>
                                </ul>
                            </div>
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
                                <a href="/">
                                    <FormattedMessage id="header.home" />
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <FormattedMessage id="header.gender" />
                                </a>
                            </li>
                            <li className="li-search align-items-center" title="Tìm kiếm sản phẩm">
                                <a
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpenSearch(!isOpenSearch);
                                    }}
                                >
                                    <span className="me-1">Tìm kiếm</span>
                                    <FontAwesomeIcon icon={faSearch} />
                                </a>
                            </li>
                            {isLogin ? (
                                <li>
                                    <a href="http://localhost:3002/dashboard/app" target="_blank" rel="noreferrer">
                                        <FormattedMessage id="header.viewAccount" />
                                    </a>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/system/login-register-account">
                                        <FormattedMessage id="header.login" />
                                    </Link>
                                </li>
                            )}
                            <li className="li-search align-items-center" title="Tìm kiếm sản phẩm">
                                <a
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClose();
                                    }}
                                >
                                    Quản trị viên
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </Overlay>
            {isShowMenu && <MenuAdmin handleClose={handleClose} />}
            <SearchHeader isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
        </>
    );
}

export default Header;
