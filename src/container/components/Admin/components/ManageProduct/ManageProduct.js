import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ActionManage from './components/ActionManage/ActionManage';

import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './ManageProduct.scss';

function ManageProduct() {
    return (
        <div className="manage-product-wrapper">
            <div className="content">
                <Routes>
                    <Route path="/add-new-product" element={<AddProduct />} />
                    <Route path="/edit-product" element={<EditProduct />} />
                    <Route path="/all-action-product/*" element={<ActionManage />} />
                </Routes>
            </div>
        </div>
    );
}

export default ManageProduct;
