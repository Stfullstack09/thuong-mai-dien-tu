import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../container/components/auth';
import { path } from '../utils/constant';
import Redirect from './components/redirect';
import Logout from '../container/components/auth/logout';
import AuthAdmin from '../container/components/Admin/AuthAdmin';
import NotFound from '../container/components/Client/components/404NotFound/404NotFound';
import PageAdmin from '../container/components/Admin/page/PageAdmin';

class System extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path={path.stystemRoter.loginandregister} element={<Auth />} />
                    <Route path={path.stystemRoter.loginadmin} element={<AuthAdmin />} />
                    <Route path={path.stystemRoter.pageAdmin} element={<PageAdmin />} />
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
