import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { handlePriceDisCount } from '../../../../../../components/handlePriceDisCount';
import Loading from '../../../../../../components/loading/loading';
import { GetProductOrderNoConfirm } from '../../../../../../services';

import './CheckOutDone.scss';
import * as actions from '../../../../../.././store/actions';

function CheckOutDone() {
    const [listProduct, setListProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);

            const Res = await GetProductOrderNoConfirm();

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                setListProduct(Res.data);
            } else {
                alert(Res.msg);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(actions.getAllProductToCart(userInfo.id));
        }
    }, [dispatch, userInfo, isLoggedIn]);

    return (
        <>
            <div
                className="checkout-done-wrapper"
                style={{
                    backgroundImage: `url('https://internetviettel.vn/wp-content/uploads/2017/05/1-2.jpg')`,
                }}
            >
                <div className="blur"></div>
                <div className="container-parents">
                    <div className="container">
                        <h1 className="title text-center pt-5 fw-bold">
                            Cảm Ơn Bạn Đã Mua Hàng Tại Website Của Chúng Tôi
                        </h1>
                        <div className="body mt-4">
                            <h2 className="text-h2-jsx">Đơn hàng mà bạn đã đặt tại trang web của chúng tôi</h2>
                            <div className="h-90vh">
                                <div className="mt-3 table">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tên sản phẩm</th>
                                                <th scope="col" className="text-center">
                                                    Giá
                                                </th>
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col">Địa chỉ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProduct &&
                                                listProduct.length > 0 &&
                                                listProduct.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.productDataOder.title}</td>
                                                        <td>
                                                            <CurrencyFormat
                                                                onValueChange={() => () => {}}
                                                                value={handlePriceDisCount(
                                                                    item.productDataOder.price,
                                                                    item.productDataOder.discount,
                                                                )}
                                                                thousandSeparator={true}
                                                                suffix={' VND'}
                                                                disabled
                                                                className="jsx-input-add disable"
                                                            />
                                                        </td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.address}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3">
                                    <p className="text-end mb-2">
                                        <span>
                                            Xem lịch sử đặt hàng tại <Link to="/">đây</Link>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="pt-5 text-center h-10vh">
                                <h3>UNNO Xin Cảm Ơn</h3>
                                <p className="mb-2">
                                    Quay lại trang chủ <Link to="/">tại đây</Link>
                                    <span className="mx-3">
                                        quay lại giỏ hàng <Link to="/cart">tại đây</Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </>
    );
}

export default CheckOutDone;
