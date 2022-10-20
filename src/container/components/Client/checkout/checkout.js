import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import './checkout.scss';
import { GetInformationUserCheckOut, GetTotalMoney } from '../../../../services';
import * as actions from '../../../../store/actions';
import { handlePriceDisCount } from '../../../../components/handlePriceDisCount';
import ModalCancel from './components/modalCancel/modalCancel';

function CheckOut() {
    const [time, setTime] = useState(10);
    const [minute, setMinute] = useState(5);
    const [second, setSecond] = useState(0);
    const [isValid, setIsValid] = useState(true);
    const [checked, setChecked] = useState(true);
    const [information, setInformation] = useState({});
    const [money, setMoney] = useState(0);
    const [listCart, setListCart] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');

    // ghi chú thường không quá 200 ký tự

    const dispatch = useDispatch();

    const history = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const listAllProduct = useSelector((state) => state.SiteReducer.listAllProduct);

    const handleRedirect = (link = '/') => {
        history(link);
    };

    useEffect(() => {
        setListCart(listAllProduct);
    }, [listAllProduct]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(actions.getAllProductToCart(userInfo.id));
        }
    }, [dispatch, userInfo, isLoggedIn]);

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetInformationUserCheckOut();

            if (Res && Res.errCode === 0) {
                setInformation(Res.data);
            } else {
                alert(Res.msg);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        const fetchTwo = async () => {
            const Res = await GetTotalMoney();

            if (Res && Res.errCode === 0) {
                setMoney(Res.data);
            } else {
                alert(Res.msg);
            }
        };

        fetchTwo();
    }, []);

    useEffect(() => {
        if (time >= 0) {
            const timeInterval = setInterval(() => {
                const mui = Math.floor(time / 60);
                const seco = time - mui * 60;

                setMinute(mui);
                setSecond(seco);

                setTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timeInterval);
        } else {
            setIsValid(false);
        }
    }, [minute, second, time]);

    const handleOnchangeNote = (e) => {
        if (note.length > 200) {
            alert('Ghi chú không quá 200 ký tự');
            // vì trên data base là kiểu string chỉ lưu tối đa 250 ký tự ( varchar )
            return;
        }

        setNote(e.target.value);
    };

    const handleValidate = () => {
        let isValid = true;

        const arrClone = [phoneNumber];

        for (let i = 0; i < arrClone.length; i++) {
            if (!arrClone[i]) {
                alert('Bạn đã nhập thiếu trường ' + arrClone[i]);
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    const handleSubmitData = () => {
        const check = handleValidate();

        if (!check) {
            return;
        }

        const dataBuild = {
            phoneNumber, // ES6
            note,
        };

        console.log('check data send database :', dataBuild);
    };

    return (
        <>
            <div className="checkout-wrapper">
                {!_.isEmpty(information) && (
                    <>
                        <div className="container">
                            <div>
                                <div className="header-logo pt-5 pb-3">
                                    <h1 className="text-center text-logo">
                                        <span onClick={() => handleRedirect('/')}>UNOMO</span>
                                    </h1>
                                </div>
                                <div className="close-checkout-too-time">
                                    <div className="content-too-time">
                                        {isValid ? (
                                            <p>
                                                Đơn hàng của bạn tự động hủy sau
                                                <span>{` ${minute}:${second >= 10 ? second : `0${second}`}`}</span>{' '}
                                                {minute >= 1 ? 'phút' : 'giây'}.
                                            </p>
                                        ) : (
                                            <p>Đơn hàng của bạn đã hết thời gian chờ.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="body-wrapper-checkout overflow-hidden p-4">
                                <p className="header-checkout m-0 py-3">
                                    <span className="home-jsx" onClick={() => handleRedirect('/')}>
                                        Trang Chủ
                                    </span>
                                    <span className="mx-2">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </span>
                                    <span className="cursor-pointer" onClick={() => handleRedirect('/cart')}>
                                        Giỏ Hàng
                                    </span>
                                </p>
                                <div className="row">
                                    <div className="col-12 col-lg-7 left-content">
                                        <h2 className="my-3">Địa Chỉ Ship Hàng</h2>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label>Họ & Tên (*)</label>
                                                <input
                                                    placeholder={`${information.firstName} ${information.lastName}`}
                                                    className="form-control-customize"
                                                    type="text"
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label>Email (*)</label>
                                                <input
                                                    className="form-control-customize"
                                                    type="text"
                                                    disabled
                                                    placeholder={information.email}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label>Số Điện Thoại (*)</label>
                                                <input
                                                    value={phoneNumber}
                                                    className="form-control-customize"
                                                    type="text"
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="Bạn hãy nhập số điện thoại đặt hàng"
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label>Địa Chỉ (*)</label>
                                                <input
                                                    className="form-control-customize"
                                                    disabled
                                                    type="text"
                                                    placeholder={information.addressData.valueVI}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label>Ghi Chú</label>
                                                <textarea
                                                    value={note}
                                                    className="form-control-customize"
                                                    type="text"
                                                    placeholder="Bạn hãy nhập ghi chú"
                                                    onChange={(e) => handleOnchangeNote(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="bank-checkout">
                                            <p className="title-bank fw-bolder">Thanh Toán</p>
                                            <p>
                                                <input
                                                    checked={checked}
                                                    onChange={() => setChecked(true)}
                                                    type="radio"
                                                    id="checkout-1"
                                                    name="checked"
                                                />
                                                <label htmlFor="checkout-1">Thanh Toán Khi Nhận Hàng</label>
                                            </p>
                                            <p>
                                                <input
                                                    checked={!checked}
                                                    onChange={() => setChecked(false)}
                                                    type="radio"
                                                    id="checkout-2"
                                                    name="checked"
                                                />
                                                <label htmlFor="checkout-2">Chuyển Khoản</label>
                                            </p>
                                            {!checked && (
                                                <div className="bank-checkout-cart">
                                                    <p className="title">
                                                        <span>
                                                            <strong className="me-2">Số Tài Khoản:</strong> 0869224813
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <strong className="me-2">Ngân Hàng</strong>: MB Bank
                                                    </p>
                                                    <p>
                                                        <strong className="me-2">Chủ Tài Khoản:</strong> Nguyễn Trường
                                                        Sơn
                                                    </p>
                                                    <p className="hotline py-3">
                                                        <strong className="me-2">HOTLINE:</strong> 0869.224.813
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="checkout-end mt-4">
                                            <button onClick={handleSubmitData} className="w-100 btn btn-primary">
                                                Thanh Toán
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-5 right-content px-4 mt-mobile-2">
                                        <p className="my-3 p-0 d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>Đơn Hàng Của Bạn</strong>
                                            </span>
                                            <span className="count-cart">{listCart ? listCart.length : 0}</span>
                                        </p>
                                        <div className="body-payment">
                                            <div>
                                                {listCart &&
                                                    listCart.length > 0 &&
                                                    listCart.map((item) => (
                                                        <div className="item" key={item.id}>
                                                            <div className="up-checkout-payment d-flex justify-content-between align-items-center">
                                                                <span className="title-checkout-item-jsx">
                                                                    <strong
                                                                        onClick={() =>
                                                                            handleRedirect(
                                                                                `/product-details-customer-secret/${item.productId}`,
                                                                            )
                                                                        }
                                                                    >
                                                                        {item.productData.title}
                                                                    </strong>
                                                                    <strong> ({item.sizeData.valueVI})</strong>
                                                                </span>
                                                                <span>
                                                                    <CurrencyFormat
                                                                        onValueChange={() => () => {}}
                                                                        value={
                                                                            item.count *
                                                                            handlePriceDisCount(
                                                                                item.productData.price,
                                                                                item.productData.discount,
                                                                            )
                                                                        }
                                                                        thousandSeparator={true}
                                                                        suffix={' VND'}
                                                                        disabled
                                                                        className="jsx-input-add disable"
                                                                    />
                                                                </span>
                                                            </div>
                                                            <div className="down-checkout-payment">
                                                                <span>x{item.count}</span>
                                                            </div>
                                                        </div>
                                                    ))}

                                                <div className="total-checkout d-flex justify-content-between align-items-center">
                                                    <span>Tổng Tiền</span>
                                                    <span>
                                                        <strong>
                                                            <CurrencyFormat
                                                                onValueChange={() => () => {}}
                                                                value={money}
                                                                thousandSeparator={true}
                                                                suffix={' VND'}
                                                                disabled
                                                                className="jsx-input-add disable"
                                                            />
                                                        </strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-checkout pt-5 pb-2">
                            <div className="text-center">
                                <p>
                                    <span>UNOMO</span> Thương Mại Điện Tử Phù Hợp Với Tất Cả Mọi Người | © 2022 Trường
                                    Sơn Website - Thiết Kế Web Chuyên Nghiệp
                                </p>
                                <p>
                                    Nếu Bạn Quan Tâm Đến Sản Phẩm <strong>UNOMO</strong> Này Hãy Liên Hệ Tới Tôi{' '}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://gioi-thieu-doi-chut-son-khum-muon-di-hoc.vercel.app/#"
                                    >
                                        tại đây
                                    </a>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {!isValid && <ModalCancel />}
        </>
    );
}

export default CheckOut;
