import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handlePriceDisCount } from '../../../../../../components/handlePriceDisCount';
import Loadingske from '../../../../../../components/loadingSkeloton/Loadingske';
import {
    GetProductOrderNoConfirm,
    RestoreProductByCustomer,
    UpdateStatusOderByCustomer,
} from '../../../../../../services';
import { languages } from '../../../../../../utils/constant';

function History() {
    const [isLoading, setIsLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);

    const history = useNavigate();

    const language = useSelector((state) => state.app.language);

    const fetch = async () => {
        setIsLoading(true);

        const Res = await GetProductOrderNoConfirm();

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            setListProduct(Res.data);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleRedirect = (link) => {
        history(link);
    };

    const handleSubmit = async (item) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm(`Bạn có chắc chắn hủy sản phẩm ${item.productDataOder.title}`);

        if (check) {
            setIsLoading(true);

            const Res = await UpdateStatusOderByCustomer(item.id);

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                fetch();
            }
        }
    };

    const handleRestoreProduct = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Bạn chắc chắn mua lại sản phẩm này chứ?');

        if (!check) return;

        setIsLoading(true);

        const res = await RestoreProductByCustomer({ id });

        setIsLoading(false);

        if (res && res.errCode === 0) {
            fetch();
        }
    };

    return (
        <>
            {isLoading && <Loadingske />}
            <div className="history-oder-wrapper">
                <h2 className="text-center fw-bold my-4">Lịch sử đặt hàng của bạn</h2>
                <div className="content-body mt-3">
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col" className="text-center">
                                        Hành động
                                    </th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct &&
                                    listProduct.length > 0 &&
                                    listProduct.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                <span
                                                    onClick={() =>
                                                        handleRedirect(
                                                            `/product-details-customer-secret/${item.productId}`,
                                                        )
                                                    }
                                                    className="jsx-hover-underline"
                                                >
                                                    {item.productDataOder.title}
                                                </span>
                                            </td>
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
                                            <td className="text-center">
                                                {item.statusId === 'S4' ? (
                                                    <button
                                                        className="btn btn-primary mx-1 mb-1"
                                                        onClick={() => handleRestoreProduct(item.id)}
                                                        title="Khôi Phục"
                                                    >
                                                        <FontAwesomeIcon icon={faRotateLeft} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary mx-1 mb-1"
                                                        onClick={() => handleSubmit(item)}
                                                        title="Hủy đơn hàng"
                                                    >
                                                        <i class="bi bi-trash2"></i>
                                                    </button>
                                                )}
                                                <button
                                                    className="btn btn-primary mx-1 mb-1"
                                                    onClick={() =>
                                                        handleRedirect(`/order-details-you-have-placed/${item.id}`)
                                                    }
                                                    title="Xem chi tiết"
                                                >
                                                    <i class="bi bi-terminal"></i>
                                                </button>
                                            </td>
                                            <td>
                                                {language === languages.VI
                                                    ? item.statusData.valueVI
                                                    : item.statusData.valueEN}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default History;
