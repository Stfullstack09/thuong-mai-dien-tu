import { useEffect } from 'react';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { FormattedMessage } from 'react-intl';

import { GetAllProductDeletedByAdmin, RestoreProductDeletedByAdmin } from '../../../../../../../../services';

function TrashProduct() {
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetAllProductDeletedByAdmin();

            if (Res && Res.errCode === 0) {
                setListProduct(Res.data);
            }
        };

        fetch();
    }, []);

    const handleRestoreProduct = async (id) => {
        const Res = await RestoreProductDeletedByAdmin(id);

        if (Res && Res.errCode === 0) {
            const ResTwo = await GetAllProductDeletedByAdmin();

            if (ResTwo && ResTwo.errCode === 0) {
                setListProduct(ResTwo.data);
            }
        }
    };

    return (
        <div className="trash-product-by-admin">
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
                    {listProduct && listProduct.length > 0 ? (
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
                                    <button
                                        onClick={() => handleRestoreProduct(item.id)}
                                        className="btn"
                                        title="Khôi phục"
                                    >
                                        <i class="bi bi-arrow-repeat"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <th scope="row" colSpan={5} className="text-center pt-4">
                            <FormattedMessage id="admin.product.noTrash" />
                        </th>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TrashProduct;
