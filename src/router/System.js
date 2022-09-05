import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../container/components/Client/HomePage/Home';
import Redirect from './components/rediect';

class System extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<HomePage />} />
                    <Route path="/" element={<Redirect link={'/system/login'} />} />
                </Routes>
            </div>
        );
    }
}

export default System;
