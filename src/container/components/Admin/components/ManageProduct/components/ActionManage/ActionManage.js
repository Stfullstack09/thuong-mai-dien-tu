import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import AllProduct from './components/AllProduct';
import TrashProduct from './components/TrashProduct';

function ActionManage() {
    const history = useNavigate();

    const [value, setValue] = useState('/system/admin-page/manage-product/all-action-product');

    const handleRedirect = (e) => {
        setValue(e.target.value);
        history(e.target.value);
    };

    useEffect(() => {
        if (window.location.pathname) {
            setValue(window.location.pathname);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window && window.location.pathname]);

    return (
        <div className="action-manage-product-wrapper">
            <div className="container p-4">
                <div className="mx-4">
                    <select value={value} className="select-jsx-action-product" onChange={(e) => handleRedirect(e)}>
                        <option value={'/system/admin-page/manage-product/all-action-product'}>
                            <FormattedMessage id="admin.product.allPro" />
                        </option>
                        <option value={'/system/admin-page/manage-product/all-action-product/trash'}>
                            <FormattedMessage id="admin.product.trashPro" />
                        </option>
                    </select>
                </div>
                <div className="my-4">
                    <Routes>
                        <Route path="/" element={<AllProduct />} />
                        <Route path="/trash" element={<TrashProduct />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default ActionManage;
