import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../container/components/auth';
import Redirect from './components/redirect';

class System extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/" element={<Redirect link={'/system/login'} />} />
                </Routes>
            </div>
        );
    }
}

export default System;
