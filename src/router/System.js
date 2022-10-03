import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../container/components/auth';
import { path } from '../utils/constant';
import Redirect from './components/redirect';
import Logout from '../container/components/auth/logout';

class System extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                <Routes>
                    && <Route path={path.stystemRoter.loginandregister} element={<Auth />} />
                    <Route path={path.stystemRoter.logout} element={<Logout />} />
                    <Route path="/" element={<Redirect link={'/system/login'} />} />
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
