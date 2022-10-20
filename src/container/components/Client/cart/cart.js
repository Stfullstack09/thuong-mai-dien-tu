import { faAngleLeft, faAngleRight, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import './cart.scss';
import * as actions from '../../../.././store/actions';
import { handlePriceDisCount } from '../../../../components/handlePriceDisCount';
import { ChangeCountProductToCart, RemoveProductCart } from '../../../../services';

function Cart() {
    const [listCart, setListCart] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const history = useNavigate();

    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const listAllProduct = useSelector((state) => state.SiteReducer.listAllProduct);

    useEffect(() => {
        setListCart(listAllProduct);
    }, [listAllProduct]);

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        const ReqData = listCart.reduce((result, item) => {
            return result + handlePriceDisCount(item.productData.price, item.productData.discount) * item.count;
        }, 0);

        setTotal(ReqData);
    }, [listCart]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(actions.getAllProductToCart(userInfo.id));
        }
    }, [dispatch, userInfo, isLoggedIn]);

    const handleRemoveProduct = async (id) => {
        if (userInfo) {
            const Res = await RemoveProductCart(id, userInfo.id);

            if (Res && Res.errCode === 0) {
                if (isLoggedIn) {
                    dispatch(actions.getAllProductToCart(userInfo.id));
                }
            }
        }
    };

    const handleClickChangeCountBtn = async (type, id) => {
        if (type === 'down') {
            setTimeout(async () => {
                const Res = await ChangeCountProductToCart(type, id);

                if (Res && Res.errCode === 0) {
                    if (isLoggedIn) {
                        dispatch(actions.getAllProductToCart(userInfo.id));
                    }
                } else {
                    alert(Res.msg);
                }
            }, 1000);
        }

        if (type === 'up') {
            setTimeout(async () => {
                const Res = await ChangeCountProductToCart(type, id);

                if (Res && Res.errCode === 0) {
                    if (isLoggedIn) {
                        dispatch(actions.getAllProductToCart(userInfo.id));
                    }
                } else {
                    alert(Res.msg);
                }
            }, 1000);
        }
    };

    const handleRedirect = () => {
        history('/');
    };

    const handleViewProduct = (id) => {
        history(`/product-details-customer-secret/${id}`);
    };

    const handleRedirectCheckOut = () => {
        history('/checkout');
    };

    return (
        <>
            <div className="cart-wrapper">
                <div className="jsx-chuk">
                    <div className="header">
                        <Header />
                    </div>
                    <div className="body-jsx container">
                        <div className="cart-body overflow-hidden">
                            <div className="nav-jsx-cart">
                                <span className="home-jsx-cart" onClick={handleRedirect}>
                                    <FormattedMessage id="cart.home" />
                                </span>
                                <span className="mx-2">/</span>
                                <span>
                                    <FormattedMessage id="cart.cartCountOne" />
                                    {listCart.length}
                                    <FormattedMessage id="cart.cartCountTwo" />
                                </span>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-lg-8 sm-scroll-none">
                                    <div className="row header-cart d-flex justify-content-around align-items-center w-sm-600">
                                        <span className="col-4 text-center">
                                            <strong>
                                                <FormattedMessage id="cart.header.pro" />
                                            </strong>
                                        </span>
                                        <span className="col-2 text-center">
                                            <strong>
                                                <FormattedMessage id="cart.header.price" />
                                            </strong>
                                        </span>
                                        <span className="col-2 text-center">
                                            <strong>
                                                <FormattedMessage id="cart.header.count" />
                                            </strong>
                                        </span>
                                        <span className="col-4 text-center">
                                            <strong>
                                                <FormattedMessage id="cart.header.total" />
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="row jsx-render-pro w-sm-600">
                                        {listCart &&
                                            listCart.length > 0 &&
                                            listCart.map((item) => (
                                                <div className="col-12 item" key={item.id}>
                                                    <div className="row">
                                                        <div className="col-4 introduce">
                                                            <div
                                                                className="image"
                                                                style={{
                                                                    backgroundImage: `url('${item.productData.thumbnail}')`,
                                                                }}
                                                            ></div>
                                                            <div className="introduction">
                                                                <p>
                                                                    <strong
                                                                        onClick={() =>
                                                                            handleViewProduct(item.productId)
                                                                        }
                                                                    >
                                                                        {item.productData.title}
                                                                    </strong>
                                                                </p>
                                                                <span>size: {item.sizeData.valueVI}</span>
                                                                {item.productData.discount && (
                                                                    <span className="mx-2">
                                                                        giảm {item.productData.discount}%
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-2 price-pro d-inline-flex justify-content-center align-items-center customize-jsx-format">
                                                            {item.productData.discount ? (
                                                                <CurrencyFormat
                                                                    onValueChange={() => () => {}}
                                                                    value={handlePriceDisCount(
                                                                        item.productData.price,
                                                                        item.productData.discount,
                                                                    )}
                                                                    thousandSeparator={true}
                                                                    suffix={' VND'}
                                                                    disabled
                                                                    className="jsx-input-add disable"
                                                                />
                                                            ) : (
                                                                <CurrencyFormat
                                                                    onValueChange={() => () => {}}
                                                                    value={item.productData.price}
                                                                    thousandSeparator={true}
                                                                    suffix={' VND'}
                                                                    disabled
                                                                    className="jsx-input-add disable"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="col-2 count-pro d-inline-flex justify-content-center align-items-center">
                                                            <button
                                                                onClick={() =>
                                                                    handleClickChangeCountBtn('down', item.id)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <input disabled type="text" value={item.count} />
                                                            <button
                                                                onClick={() => handleClickChangeCountBtn('up', item.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="col-3 total-pro d-inline-flex justify-content-end align-items-center customize-jsx-format">
                                                            {item.productData.discount ? (
                                                                <CurrencyFormat
                                                                    onValueChange={() => () => {}}
                                                                    value={
                                                                        handlePriceDisCount(
                                                                            item.productData.price,
                                                                            item.productData.discount,
                                                                        ) * item.count
                                                                    }
                                                                    thousandSeparator={true}
                                                                    suffix={' VND'}
                                                                    disabled
                                                                    className="jsx-input-add disable"
                                                                />
                                                            ) : (
                                                                <CurrencyFormat
                                                                    onValueChange={() => () => {}}
                                                                    value={item.productData.price * item.count}
                                                                    thousandSeparator={true}
                                                                    suffix={' VND'}
                                                                    disabled
                                                                    className="jsx-input-add disable"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="col-1 total-pro d-inline-flex justify-content-end align-items-center cursor-pointer">
                                                            <span onClick={() => handleRemoveProduct(item.productId)}>
                                                                <FontAwesomeIcon icon={faClose} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-mobile-2">
                                    <div className="detail-cart">
                                        <p className="title-cart">
                                            <b>
                                                <FormattedMessage id="cart.header.des" />
                                            </b>
                                        </p>
                                        <p className="math-price">
                                            <FormattedMessage id="cart.header.mathPrice" />
                                        </p>
                                        <p className="price customize-jsx-format font-weight">
                                            <span>
                                                <FormattedMessage id="cart.header.priceOne" />
                                            </span>
                                            <span>
                                                <CurrencyFormat
                                                    onValueChange={() => () => {}}
                                                    value={total}
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                    disabled
                                                    className="jsx-input-add disable"
                                                />
                                            </span>
                                        </p>
                                        <p className="price-vc">
                                            <span>
                                                <FormattedMessage id="cart.header.priceShip" />
                                            </span>
                                            <span>0 VND</span>
                                        </p>
                                        <p className="price-thue">
                                            <span>
                                                <FormattedMessage id="cart.header.priceTwo" />
                                            </span>
                                            <span>0 VND</span>
                                        </p>
                                        <p className="price-thue sd-total customize-jsx-format font-weight">
                                            <span>Total</span>
                                            <span>
                                                <strong>
                                                    <span>
                                                        <CurrencyFormat
                                                            onValueChange={() => () => {}}
                                                            value={total}
                                                            thousandSeparator={true}
                                                            suffix={' VND'}
                                                            disabled
                                                            className="jsx-input-add disable"
                                                        />
                                                    </span>
                                                </strong>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-ds d-flex mt-4 mb-5 justify-content-between">
                                <span>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <FormattedMessage id="cart.header.continue" />
                                </span>
                                <button className="btn btn-success" onClick={handleRedirectCheckOut}>
                                    <FormattedMessage id="cart.header.bankment" />
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>
    );
}

export default Cart;
