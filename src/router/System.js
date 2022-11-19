import React from 'react';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import Auth from '../container/components/auth';
import { path } from '../utils/constant';
import Redirect from './components/redirect';
import Logout from '../container/components/auth/logout';
import AuthAdmin from '../container/components/Admin/AuthAdmin';
import NotFound from '../container/components/Client/components/404NotFound/404NotFound';
import PageAdmin from '../container/components/Admin/page/PageAdmin';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';

        if (token) {
            const decoded = jwt_decode(token);

            if (!_.isEmpty(decoded) && decoded.roleId !== 'R3') {
                this.setState({
                    isValid: true,
                });
            }
        }
    }

    render() {
        const { isValid } = this.state;

        return (
            <div>
                <Routes>
                    <Route path={path.stystemRoter.loginandregister} element={<Auth />} />
                    <Route path={path.stystemRoter.loginadmin} element={<AuthAdmin />} />
                    {isValid && <Route path={path.stystemRoter.pageAdmin} element={<PageAdmin />} />}
                    <Route path={path.stystemRoter.logout} element={<Logout />} />
                    <Route path="/" element={<Redirect link={'/system/login'} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
