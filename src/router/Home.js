import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../container/components/Client/components/404NotFound/404NotFound';
import HomePage from '../container/components/Client/HomePage/Home';
import { homeRouter } from './components/constantRouter';

class HomeRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path={homeRouter.home} element={<HomePage />} />
                    <Route path={homeRouter.search} element={<div className="xin chao">ssdfds</div>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        );
    }
}

export default HomeRouter;
