import { Component } from 'react';
import { connect } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './auth.scss';
import Redirect from '../../../router/components/redirect';
import * as actions from '../../.././store/actions';
import { languages } from '../../../utils/constant';
import { IconGoogle } from '../../../components/icons/icons';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLogin: true,

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            selectedAddress: '',
            selectedGender: '',

            isFirstName: true,
            isLastName: true,
            isEmail: true,
            isPassword: true,
            isAddress: true,
            isGender: true,

            listAddress: [],
            listGender: [],
        };
    }

    componentDidMount() {
        this.props.getListAddress();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.language !== this.props.language) {
            const dataBuild = this.handleBuildData(this.props.listAddress);
            this.setState({
                listAddress: dataBuild,
            });
        }

        if (prevProps.listAddress !== this.props.listAddress) {
            const dataBuild = this.handleBuildData(this.props.listAddress);
            this.setState({
                listAddress: dataBuild,
            });
        }
    }
    handleBuildData = (data) => {
        const { language } = this.props;
        const Result = [];
        if (data && data.length > 0) {
            // eslint-disable-next-line array-callback-return
            data.map((item) => {
                const Obj = {};
                Obj.value = item.keyMap;
                Obj.label = language === languages.VI ? item.valueVI : item.valueEN;
                Result.push(Obj);
            });
        }
        return Result;
    };

    handleChangeInputAndSelect = (e, type) => {
        const cloneState = { ...this.state };

        cloneState[type] = e.target.value;

        this.setState({
            ...cloneState,
        });

        if (type === 'firstName') {
            this.setState({
                isFirstName: true,
            });
        }

        if (type === 'lastName') {
            this.setState({
                isLastName: true,
            });
        }

        if (type === 'email') {
            this.setState({
                isEmail: true,
            });
        }

        if (type === 'password') {
            this.setState({
                isPassword: true,
            });
        }

        if (type === 'selectedAddress') {
            this.setState({
                isAddress: true,
            });
        }

        if (type === 'selectedGender') {
            this.setState({
                isGender: true,
            });
        }
    };

    handleChangeLanguage = (language) => {
        console.log('check language :', language);
        this.props.ChangeLanguageApp(language);
    };

    handleChangeLanguageNext = (language) => {
        console.log('check language :', language);
    };

    handleValidateData = () => {
        let isValidate = true;

        if (this.state.isLogin) {
            const cloneState = ['email', 'password'];

            for (let i = 0; i < cloneState.length; i++) {
                if (!this.state[cloneState[i]]) {
                    if (cloneState[i] === 'email') {
                        isValidate = false;
                        this.setState({
                            isEmail: false,
                        });
                    }

                    if (cloneState[i] === 'password') {
                        isValidate = false;
                        this.setState({
                            isPassword: false,
                        });
                    }
                }
            }
        } else {
            const cloneState = ['firstName', 'lastName', 'email', 'password', 'selectedAddress', 'selectedGender'];

            for (let i = 0; i < cloneState.length; i++) {
                if (cloneState[i] === 'firstName') {
                    isValidate = false;
                    this.setState({
                        isFirstName: false,
                    });
                }

                if (cloneState[i] === 'lastName') {
                    isValidate = false;
                    this.setState({
                        isLastName: false,
                    });
                }

                if (!this.state[cloneState[i]]) {
                    if (cloneState[i] === 'email') {
                        isValidate = false;
                        this.setState({
                            isEmail: false,
                        });
                    }

                    if (cloneState[i] === 'password') {
                        isValidate = false;
                        this.setState({
                            isPassword: false,
                        });
                    }

                    if (cloneState[i] === 'selectedAddress') {
                        isValidate = false;
                        this.setState({
                            isAddress: false,
                        });
                    }

                    if (cloneState[i] === 'selectedGender') {
                        isValidate = false;
                        this.setState({
                            isGender: false,
                        });
                    }
                }
            }
        }

        return isValidate;
    };

    handleOnInputClickSwitch = () => {
        this.setState({
            isFirstName: true,
            isLastName: true,
            isEmail: true,
            isPassword: true,
            isAddress: true,
            isGender: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            selectedAddress: '',
            selectedGender: '',
        });
    };

    handleSwitchLoginAndRegister = () => {
        this.setState({
            isLogin: !this.state.isLogin,
        });
    };

    handleSubmit = () => {
        const check = this.handleValidateData();

        if (check) {
            console.log('check state :', this.state);
        }
    };

    render() {
        const { isLogin } = this.state;
        const { language } = this.props;

        return (
            <div className="auth-container">
                <div className="content-authentication">
                    <span
                        onClick={() => this.handleChangeLanguage(languages.EN)}
                        className="nav-authentication vi"
                        title="Tiếng anh"
                    >
                        en
                    </span>
                    <button
                        onClick={() => this.handleChangeLanguage(languages.VI)}
                        className="nav-authentication en"
                        title="Tiếng việt"
                    >
                        vi
                    </button>
                    <Link to="/" className="nav-authentication" title="Back to home">
                        <FontAwesomeIcon icon={faClose} />
                    </Link>
                    <div className="container">
                        <div className="row row-authentication">
                            <div className="col-md-6 col-0 jsx-lef-authentication"></div>
                            <div className="col-md-6 jsx-right-authentication">
                                <div className="row">
                                    {isLogin ? (
                                        <>
                                            <div className="col-12 title-authentication login">
                                                <h1>
                                                    <Typewriter
                                                        options={{
                                                            strings: [
                                                                language === languages.VI
                                                                    ? 'Đăng nhập tài khoản của bạn'
                                                                    : 'Log in to your account',
                                                            ],
                                                            autoStart: true,
                                                            pauseFor: 20000,
                                                            delay: 100,
                                                            loop: true,
                                                        }}
                                                    />
                                                </h1>
                                            </div>
                                            <div className="col-12 px-5 jsx-parents-input-and-label">
                                                <label>Email</label>
                                                <input
                                                    value={this.state.email}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập email của bạn eg: abc@gmail.com'
                                                            : 'Enter your email eg: abc@gmail.com'
                                                    }
                                                    onChange={(e) => {
                                                        this.handleChangeInputAndSelect(e, 'email');
                                                    }}
                                                />
                                                {!this.state.isEmail && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.valiEmail" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 px-5 jsx-parents-input-and-label login">
                                                <label>Password</label>
                                                <input
                                                    value={this.state.password}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập password của bạn eg: matkhaucauban'
                                                            : 'Enter your password eg: matkhaucauban'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'password')}
                                                />
                                                {!this.state.isPassword && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 text-center button-submit-jsx login">
                                                <button onClick={this.handleSubmit}>
                                                    <FormattedMessage id="authentication.together.btnLogin" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-12 title-authentication">
                                                <h1>
                                                    <Typewriter
                                                        options={{
                                                            strings: [
                                                                language === languages.VI
                                                                    ? 'Đăng ký tài khoản của bạn'
                                                                    : 'Register your account',
                                                            ],
                                                            autoStart: true,
                                                            pauseFor: 20000,
                                                            delay: 100,
                                                            loop: true,
                                                        }}
                                                    />
                                                </h1>
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>First Name</label>
                                                <input
                                                    value={this.state.firstName}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập họ và tên đệm của bạn'
                                                            : 'Enter your first and last name'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'firstName')}
                                                />
                                                {!this.state.isFirstName && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>Last Name</label>
                                                <input
                                                    value={this.state.lastName}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập tên của bạn'
                                                            : 'Enter your name'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'lastName')}
                                                />
                                                {!this.state.isLastName && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>Email</label>
                                                <input
                                                    value={this.state.email}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập email của bạn eg: abc@gmail.com'
                                                            : 'Enter your email eg: abc@gmail.com'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'email')}
                                                />
                                                {!this.state.isEmail && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>Password</label>
                                                <input
                                                    value={this.state.password}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập password của bạn eg: matkhaucauban'
                                                            : 'Enter your password eg: matkhaucauban'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'password')}
                                                />
                                                {!this.state.isPassword && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />,
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>
                                                    <FormattedMessage id="authentication.together.address" />
                                                </label>
                                                <select
                                                    value={this.state.selectedAddress}
                                                    className="jsx-input-authentication"
                                                    onChange={(e) =>
                                                        this.handleChangeInputAndSelect(e, 'selectedAddress')
                                                    }
                                                >
                                                    <option value="....choose...">
                                                        {language === languages.VI
                                                            ? 'Chọn tỉnh của bạn'
                                                            : 'Choose your province'}
                                                    </option>
                                                    {this.state.listAddress &&
                                                        this.state.listAddress.length > 0 &&
                                                        this.state.listAddress.map((item, index) => (
                                                            <option value={item.value} key={index}>
                                                                {item.label}
                                                            </option>
                                                        ))}
                                                </select>
                                                {!this.state.isAddress && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 col-md-12 col-lg-6 jsx-parents-input-and-label">
                                                <label>
                                                    <FormattedMessage id="authentication.together.gender" />
                                                </label>
                                                <select
                                                    value={this.state.selectedGender}
                                                    className="jsx-input-authentication"
                                                    onChange={(e) =>
                                                        this.handleChangeInputAndSelect(e, 'selectedGender')
                                                    }
                                                >
                                                    <option value="....choose...">
                                                        {language === languages.VI
                                                            ? 'Chọn giới tính của bạn'
                                                            : 'Choose your gender'}
                                                    </option>
                                                    {this.state.listGender &&
                                                        this.state.listGender.length > 0 &&
                                                        this.state.listGender.map((item, index) => (
                                                            <option value={item.keyMap} key={index}>
                                                                {item.label}
                                                            </option>
                                                        ))}
                                                </select>
                                                {!this.state.isGender && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-12 text-center button-submit-jsx">
                                                <button onClick={this.handleSubmit}>
                                                    <FormattedMessage id="authentication.together.btnRegister" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    <div className="col-12 text-center jsx-or-options">
                                        <b></b>
                                        <span>or</span>
                                        <b></b>
                                    </div>
                                    <div className="col-12 text-center jsx-sign-with-google">
                                        <span>
                                            <IconGoogle />
                                            <FormattedMessage id="authentication.together.loginWithGoogle" />
                                        </span>
                                    </div>
                                    <div className="col-12 text-center jsx-switch-login-register">
                                        <span>
                                            {isLogin ? (
                                                <>
                                                    <FormattedMessage id="authentication.together.switchRegister" />
                                                    <button
                                                        onClick={() => {
                                                            this.handleOnInputClickSwitch();
                                                            this.setState({
                                                                isLogin: !this.state.isLogin,
                                                            });
                                                        }}
                                                    >
                                                        {isLogin ? (
                                                            <FormattedMessage id="authentication.together.btnRegister" />
                                                        ) : (
                                                            <FormattedMessage id="authentication.together.btnLogin" />
                                                        )}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <FormattedMessage id="authentication.together.switchLogin" />
                                                    <button
                                                        onClick={() => {
                                                            this.handleOnInputClickSwitch();
                                                            this.handleSwitchLoginAndRegister();
                                                        }}
                                                    >
                                                        {isLogin ? (
                                                            <FormattedMessage id="authentication.together.btnRegister" />
                                                        ) : (
                                                            <FormattedMessage id="authentication.together.btnLogin" />
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listAddress: state.SiteReducer.listAddress,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListAddress: () => dispatch(actions.getListAddress()),
        ChangeLanguageApp: (language) => dispatch(actions.ChangeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
