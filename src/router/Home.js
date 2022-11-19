import React from 'react';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../container/components/Client/components/404NotFound/404NotFound';
import DetailProduct from '../container/components/Client/DetailProduct/DetailProduct';
import HomePage from '../container/components/Client/HomePage/Home';
import { homeRouter } from './components/constantRouter';

class HomeRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path={homeRouter.home} element={<HomePage />} />
                    <Route path={homeRouter.detail} element={<DetailProduct />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        );
    }
}

export default HomeRouter;
