import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../container/components/Client/HomePage/Home';
import { homeRouter } from './components/constantRouter';

class HomeRouter extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path={homeRouter.home} element={<HomePage />} />
                </Routes>
            </div>
        );
    }
}

export default HomeRouter;
