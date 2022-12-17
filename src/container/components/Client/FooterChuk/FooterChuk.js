import classNames from 'classnames/bind';

import styles from './FooterChuk.module.scss';
import Logo from '../../../../assets/image/logo.png';
import Blur1 from '../../../../assets/image/blur1.png';
import Blur2 from '../../../../assets/image/blur2.png';
import Blur3 from '../../../../assets/image/blur3.png';
import Blur4 from '../../../../assets/image/blur4.png';

const cx = classNames.bind(styles);

const FooterChuk = () => {
    return (
        <div className={cx('footer-wrapper-sell')}>
            <>
                <img src={Blur1} alt="" className={cx('blur-footer', 'blur-1')} />
                <img src={Blur2} alt="" className={cx('blur-footer', 'blur-2')} />
                <img src={Blur3} alt="" className={cx('blur-footer', 'blur-3')} />
                <img src={Blur4} alt="" className={cx('blur-footer', 'blur-4')} />
                <div className={cx('overlay')}></div>
            </>
            <div className={cx('content')}>
                <div className="container">
                    <div className={cx('d-flex', 'my-2')}>
                        <div>
                            <div className={cx('header-footer')}>
                                <img src={Logo} alt="Ảnh logo" className={cx('img-logo')} />
                                <div>
                                    <span>Thương Mại Điện Tử Với</span>
                                    <span>Mọi Nhà</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('flex-1')}>
                            <span className={cx('border')}></span>
                        </div>
                    </div>
                    <div className={cx('content-footer', 'mt-4', 'pt-3')}>
                        <div>
                            <h4>Liên hệ</h4>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-telephone"></i>
                                </span>
                                <span className="mx-2">0869.224.813</span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-envelope-check"></i>
                                </span>
                                <span className="mx-2">truongsonpt.80@gmail.com</span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-pin-map"></i>
                                </span>
                                <span className="mx-2">29b Định Công Thượng , Thành Phố Hà Nội</span>
                            </div>
                        </div>
                        <div className={cx('center-content')}>
                            <h4>Hỗ trợ</h4>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-shield-fill-check"></i>
                                </span>
                                <span className="mx-2">
                                    <a
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Chính sách bảo mật
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-chat-right-quote"></i>
                                </span>
                                <span className="mx-2">
                                    <a
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/huongdanbanhang.html"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Hướng dẫn bán hàng
                                    </a>
                                </span>
                            </div>
                            <div className="mb-2">
                                <span>
                                    <i className="bi bi-pin-map"></i>
                                </span>
                                <span className="mx-2">29b Định Công Thượng , Thành Phố Hà Nội</span>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <h4>UNOMO Thương Mại Điện Tử</h4>
                            <div className="mb-2">
                                <span className="d-block mb-2">
                                    UNOMO Website bán hàng thương mại điện tử luôn đồng hành cùng quý khách hàng, chúng
                                    tôi nghĩ rằng niềm vui của bạn là những trải nghiệm tuyệt vời mà chúng tôi đang cố
                                    gắng mang lại cho bạn !
                                </span>
                                <span className="d-block">
                                    Chúng tôi cảm ơn bạn đã đồng hành cùng chúng tôi, chúng tôi xin chúc bạn có thể phát
                                    huy được sức mạnh của chính mình trong việc saller và ADS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-1">
                    <div className={cx('container', 'pbs')}>
                        <span className={cx('footer-icon')}>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-facebook"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-instagram"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-github"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-youtube"></i>
                                </span>
                            </a>
                            <a href="/" className="me-3">
                                <span>
                                    <i className="bi bi-tiktok"></i>
                                </span>
                            </a>
                        </span>
                        <span className={cx('footer-end')}>
                            © 2018 - 2022 UNOMO. Nền tảng thương mại điện tử hàng đầu Việt Nam
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterChuk;
