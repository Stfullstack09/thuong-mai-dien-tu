import { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from '../../../router/components/redirect';

class Auth extends Component {
    render() {
        return <div
        
        ></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
