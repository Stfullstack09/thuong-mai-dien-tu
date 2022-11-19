import React from 'react';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import CheckOut from './checkout';
import CheckOutDone from './components/checkOutDone';

class RouterCheckOut extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<CheckOut />} />
                    <Route path="/checkout-done" element={<CheckOutDone />} />
                </Routes>
            </>
        );
    }
}

export default RouterCheckOut;
