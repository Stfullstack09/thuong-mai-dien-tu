import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../../../../../.././store/actions';
import { DeleteProductByAdmin, GetAllProductByAdmin } from '../../../../../../../../services';

const limit = 8;

function AllProduct() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [listProduct, setListProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [isValidNextPage, setIsValidNextPage] = useState(false);

    const handleRedirect = (id) => {
        history(`/system/admin-page/manage-product/edit-product?id=${id}`);
    };

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetAllProductByAdmin(limit, page);

            if (Res && Res.errCode === 0) {
                setListProduct((prev) => {
                    return [...prev, ...Res.data];
                });
                setIsValidNextPage(Res.isValidNextPage);
            } else {
                console.error(Res.msg);
                alert(Res.msg);
            }
        };

        fetch();
    }, [page]);

    const handleDeleteProduct = async (id) => {
        dispatch(actions.setIsLoading());

        const Res = await DeleteProductByAdmin(id);

        dispatch(actions.setIsLoading());

        if (Res && Res.errCode === 0) {
            dispatch(actions.getAllProductByAdmin());
        }
    };

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th className="text-center" scope="col">
                            <FormattedMessage id="admin.product.namePro" />
                        </th>
                        <th className="text-center" scope="col">
                            <FormattedMessage id="admin.product.price" />
                        </th>
                        <th className="text-center" scope="col">
                            <FormattedMessage id="admin.product.discount" />
                        </th>
                        <th scope="col" className="text-center">
                            <FormattedMessage id="admin.product.action" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct &&
                        listProduct.length > 0 &&
                        listProduct.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{item.title}</td>
                                <td className="text-center">
                                    <CurrencyFormat
                                        value={item.price}
                                        thousandSeparator={true}
                                        suffix={' vnd'}
                                        disabled
                                        className="jsx-input-add disable"
                                    />
                                </td>
                                <td className="text-center">{item.discount ? `${item.discount}%` : 'Không có'}</td>
                                <td className="text-center">
                                    <button onClick={() => handleRedirect(item.id)} className="btn" title="Chỉnh sửa">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn" title="Xóa" onClick={() => handleDeleteProduct(item.id)}>
                                        <i className="bi bi-trash2"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {isValidNextPage && (
                <div className="d-flex justify-content-center align-items-center">
                    <button onClick={handleNextPage} className="btn btn-primary m-2">
                        Xem Thêm
                    </button>
                </div>
            )}
        </>
    );
}

export default AllProduct;
