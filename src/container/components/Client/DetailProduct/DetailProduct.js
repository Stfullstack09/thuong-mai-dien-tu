import React from 'react';
import { faCartPlus, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header/Header';
import ProductNew from '../HomePage/components/SecsionIntroduction/ProductNew';
import ProductTrend from '../HomePage/components/SecsionIntroduction/ProductTrend';
import './DetailProduct.scss';
import { AddProductToCart, GetAllSizeProduct, GetDetailProductByCustomer } from '../../../../services';
import { languages } from '../../../../utils/constant';
import { handlePriceDisCount } from '../../../../components/handlePriceDisCount';
import * as actions from '../../../../store/actions';
import Comment from '../../../../components/Plugin/Comment';
import FooterChuk from '../FooterChuk';

function DetailProduct() {
    const [isDescription, setDescription] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState({});
    const [listSize, setListSize] = useState([]);
    const [count, setCount] = useState(1);

    const params = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();

    const language = useSelector((state) => state.app.language);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleSwitch = (type) => {
        if (type === 'yes') {
            if (isDescription) {
                return;
            }

            setDescription(true);
        }

        if (type === 'no') {
            if (!isDescription) {
                return;
            }

            setDescription(false);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetDetailProductByCustomer(params.id);

            if (Res && Res.errCode === 0) {
                setDetail(Res.data);
            }
        };

        fetch();
    }, [params.id]);

    useEffect(() => {
        // Mặc dù nếu đặt tên fetch giống nhau thì chúng vẫn chạy bởi vì scope của chúng nó nằm trong cái phạm vi block nhưng
        // vì viết thế khó hiểu cho người review nên đổi tên

        const fetchTwo = async () => {
            const Res = await GetAllSizeProduct();

            if (Res && Res.errCode === 0) {
                const listItem = [];
                // eslint-disable-next-line array-callback-return
                Res.data.map((item) => {
                    item.isActive = false;
                    listItem.push(item);
                });

                setListSize(listItem);
            }
        };

        fetchTwo();
    }, [params]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleHideShowLightBox = () => {
        setIsOpen(!isOpen);
    };

    const handleChooseSize = (id) => {
        // eslint-disable-next-line array-callback-return
        const itemIsActiveList = listSize.map((item) => {
            item.isActive = false;

            if (item.id === id) {
                item.isActive = !item.isActive;
            }

            return item;
        });

        setListSize(itemIsActiveList);
    };

    const handleClickCount = (type) => {
        if (type === 'up') {
            if (count < 5) {
                setCount((prev) => prev + 1);
            } else {
                alert('Chỉ có thể mua tối đa 5 sản phẩm trên một lần !');
            }
        }

        if (type === 'down') {
            if (count > 1) {
                setCount((prev) => prev - 1);
            } else {
                alert('Tối thiểu có 1 sản phẩm !');
            }
        }
    };

    const handleSubmit = async () => {
        if (!isLoggedIn) {
            history('/system/login-register-account');
            return;
        }

        // eslint-disable-next-line array-callback-return
        let getSize = listSize.filter((item) => item.isActive);

        if (getSize && getSize.length > 0) {
            getSize = getSize.map((item) => item.keyMap);
        } else {
            alert('Bạn hãy chọn size cho sản phẩm của bạn');
            return;
        }

        const dataBuild = {
            size: getSize.join(','),
            count,
            userId: userInfo.id,
            productId: params.id,
            shopId: +detail.userId,
        };

        const Res = await AddProductToCart(dataBuild);

        if (Res && Res.errCode === 0) {
            dispatch(actions.getAllProductToCart(userInfo.id));
            alert('Bạn đã thêm sản phẩm thành công!');
        } else {
            alert(Res.msg);
        }
    };

    const handleViewCart = () => {
        history('/cart');
    };

    console.log('check details : ', detail);

    return (
        <div className="detail-product-wrapper">
            <Header />
            {!_.isEmpty(detail) && (
                <div className="body-detail-product">
                    <div className="container">
                        <>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-7 left-content">
                                    <div
                                        className="image-introduction"
                                        style={{
                                            backgroundImage: `url(${detail.thumbnail})`,
                                        }}
                                        onClick={handleHideShowLightBox}
                                    ></div>
                                    {detail.discount && (
                                        <>
                                            <span>SALE</span>
                                            <b></b>
                                        </>
                                    )}
                                </div>
                                <div className="col-12 col-md-12 col-lg-5 right-content">
                                    <div className="category">
                                        <span className="jsx-span">
                                            <FormattedMessage id="detail.home" />
                                        </span>
                                        <span className="mx-2">/</span>
                                        <span className="jsx-span">
                                            <FormattedMessage id="detail.production" />
                                        </span>
                                        <span className="mx-2">/</span>
                                        <span className="jsx-span name">
                                            {language === languages.VI
                                                ? detail.categoryData.valueVI
                                                : detail.categoryData.valueEN}
                                        </span>
                                    </div>
                                    <div className="title">
                                        <h1>{detail.title}</h1>
                                    </div>
                                    <div className="star">
                                        <span className="jsx-star">5.0</span>
                                        <Star />
                                        <span className="mx-3">|</span>
                                        <span className="jsx-no-sre">
                                            <FormattedMessage id="detail.stocking" />
                                        </span>
                                    </div>
                                    <div className="price">
                                        {detail.discount ? (
                                            <>
                                                <span className="price-introduction">
                                                    <CurrencyFormat
                                                        onValueChange={() => () => {}}
                                                        value={handlePriceDisCount(detail.price, detail.discount)}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        disabled
                                                        className="jsx-input-add disable"
                                                    />
                                                </span>
                                                <span className="jsx-discount">
                                                    <CurrencyFormat
                                                        onValueChange={() => () => {}}
                                                        value={detail.price}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        disabled
                                                        className="jsx-input-add disable"
                                                    />
                                                </span>
                                                <span className="jsx-percent-discount">Giảm {detail.discount}%</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="price-introduction">
                                                    <CurrencyFormat
                                                        // defaultValue={0}
                                                        onValueChange={() => {}}
                                                        value={detail.price}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        disabled
                                                        className="jsx-input-add disable"
                                                    />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="size">
                                        <span className="title">
                                            <b>SIZE</b>
                                        </span>
                                        <div className="size-btn">
                                            {listSize &&
                                                listSize.length > 0 &&
                                                listSize.map((item) => (
                                                    <button
                                                        className={item.isActive ? 'active' : ''}
                                                        onClick={() => handleChooseSize(item.id)}
                                                        key={item.id}
                                                    >
                                                        {item.valueVI}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="count-order">
                                        <span className="title">
                                            <b>
                                                <FormattedMessage id="detail.countPro" />
                                            </b>
                                        </span>
                                        <div className="jsx-btn">
                                            <button onClick={() => handleClickCount('down')}>-</button>
                                            <input
                                                value={count}
                                                onChange={(e) => setCount(+e.target.value)}
                                                type="text"
                                            />
                                            <button onClick={() => handleClickCount('up')}>+</button>
                                        </div>
                                    </div>
                                    <div className="add-cart">
                                        <button className="btn" onClick={handleSubmit}>
                                            <FontAwesomeIcon icon={faCartPlus} />
                                            <FormattedMessage id="detail.addCart" />
                                        </button>
                                    </div>
                                    <div className="view-cart">
                                        <button className="btn" onClick={handleViewCart}>
                                            <FontAwesomeIcon icon={faHeart} />
                                            <FormattedMessage id="detail.viewCart" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 pt-4">
                                    <div className="navication-detail">
                                        <div className="jsx-parents">
                                            <span
                                                className={isDescription ? 'border-jsx' : ''}
                                                onClick={() => handleSwitch('yes')}
                                            >
                                                <FormattedMessage id="detail.description" />
                                            </span>
                                            <span
                                                className={!isDescription ? 'border-jsx' : ''}
                                                onClick={() => handleSwitch('no')}
                                            >
                                                <FormattedMessage id="detail.csvc" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="render-data-detail">
                                        {isDescription ? (
                                            <div className="description">
                                                <div dangerouslySetInnerHTML={{ __html: detail.contentHTML }}></div>
                                            </div>
                                        ) : (
                                            <div className="jsx-csvc">
                                                <RenderCSVC />
                                            </div>
                                        )}
                                    </div>
                                    <div className="plugin-comment-fb overflow-hidden">
                                        <label>
                                            <strong>Phản ánh giả mạo sản phẩm</strong>
                                        </label>
                                        <div className="py-2">
                                            <iframe
                                                className="jax-customize"
                                                title="myFrame"
                                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100087270383166&tabs=timeline&width=340&height=135&small_header=false&adapt_container_width=false&hide_cover=true&show_facepile=true&appId=584691163324326"
                                                width="400"
                                                height="135"
                                                style={{
                                                    border: 'none',
                                                    overflow: 'hidden',
                                                }}
                                                scrolling="no"
                                                frameBorder="0"
                                                allowFullScreen
                                                allow="autoplay, clipboard-write, encrypted-media, picture-in-picture, web-share"
                                            />
                                        </div>
                                        <Comment
                                            link={`https://gioi-thieu-doi-chut-son-khum-muon-di-hoc.vercel.app/product-details-customer-secret/${params.id}`}
                                        />
                                    </div>
                                    <div className="product-can-like">
                                        <div className="mt-4">
                                            <span>
                                                <strong>
                                                    <FormattedMessage id="detail.orderPro" />
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="jsx-home-production-trending">
                                            <div className="jsx-responsive text-center p-5">
                                                <h2>
                                                    <FormattedMessage id="home.titleTwo" />
                                                </h2>
                                            </div>
                                            <div className="jsx-section-slider col-12">
                                                <ProductTrend target={true} />
                                            </div>
                                        </div>
                                        <div className="jsx-home-production-trending py-4 mb-4">
                                            <div className="jsx-responsive text-center p-5">
                                                <h2>
                                                    <FormattedMessage id="home.titleThree" />
                                                </h2>
                                            </div>
                                            <div className="jsx-section-slider col-12">
                                                <ProductNew target={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    {isOpen && (
                        <Lightbox
                            className="lightbox-custom"
                            onCloseRequest={() => handleHideShowLightBox()}
                            mainSrc={detail.thumbnail}
                        />
                    )}
                </div>
            )}
            <FooterChuk />
        </div>
    );
}

function Star() {
    return (
        <>
            <span>
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
                <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
                <FontAwesomeIcon icon={faStar} />
            </span>
        </>
    );
}

function RenderCSVC() {
    return (
        <>
            <h2>THÔNG TIN VẬN CHUYỂN HÀNG:</h2>
            <p>Giá cước vận chuyển phụ thuộc vào kích thước hàng và quãng đường vận chuyển:</p>
            <p>
                <strong>1. Hình thức vận chuyển</strong>
            </p>
            <p>
                - Trường hợp các bạn lấy số lượng nhiều thì kiện hàng ưu tiên vận chuyển qua chành xe; nhà xe họ tính
                cước theo kiện hàng gửi, 1 kiện tối đa 60kg; cước phí không vượt quá 250k/kiện; nếu có xe quen thì nhắn
                thông tin, bên mình sẽ liên lạc gửi hàng theo xe của các bạn;
            </p>
            <p>
                - Trường hợp hàng có nguy cơ vỡ hỏng (ví dụ như các sản phẩm đóng chai thủy tinh), dù lấy số lượng ít
                hay nhiều đều bắt buộc gửi theo xe hoặc ship nhanh trong ngày để tránh nguy cơ vỡ hỏng hàng;
            </p>
            <p>
                - Trường hợp hàng số lượng ít (hàng không có nguy cơ vỡ hỏng) có thể gửi bưu điện hoặc gửi ship nhanh
                nhận trong ngày:
            </p>
            <p>+ Ship COD bưu điện áp dụng với khách ở xa khu vực trung tâm Hà Nội;</p>
            <p>+ Ship nhanh nhận trong ngày chỉ áp dụng với khách hàng nhận tại các quận nội thành Hà Nội</p>
            <p>
                <strong>2. Biểu phí vận chuyển:</strong>
            </p>
            <p>
                - Đối với các đơn ship cod bưu điện: Hiện tại công ty mình hợp tác với Viettel Post nên hầu hết các đơn
                hàng gửi ở đây và biểu phí phụ thuộc vào Viettel Post;
            </p>
            <p>
                - Đối với các đơn ship nhanh trong ngày: Bên mình book ship qua ứng dụng giao hàng: Ahamove; Săn Ship;
                v.v...; biểu phí theo ứng dụng họ cài đặt; trung bình là 5.000đ - 6.000đ/km; các bạn cũng có thể tự book
                ship qua địa chỉ công ty: 107C1 ngõ 815 Giải Phóng lấy hàng;
            </p>
            <p>
                - Đối với các đơn gửi qua chành xe: Phụ thuộc vào nhà xe, tuyến đường và khối lượng hàng gửi sẽ có báo
                giá vận chuyển chi tiết.
            </p>
            <p>
                <span>
                    Cảm ơn các bạn đã tin tưởng mua hàng, cần thêm thông tin hỗ trợ vui lòng liên hệ tới số hotline để
                    nhận phản hồi nhanh nhất nhé!
                </span>
            </p>
            <p>
                <span>Thanks</span>
            </p>
        </>
    );
}

export default DetailProduct;
