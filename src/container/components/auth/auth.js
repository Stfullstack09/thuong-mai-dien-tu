import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import validator from 'email-validator';
import { faEye } from '@fortawesome/free-regular-svg-icons';

import './auth.scss';
import Redirect from '../../../router/components/redirect';
import * as actions from '../../.././store/actions';
import { languages } from '../../../utils/constant';
import {
    IconFacebookAuth,
    IconGoogleAuth,
    IconHidePassWord,
    IconLogo,
    IconShowPassWord,
    IconTwitterAuth,
} from '../../../components/icons/icons';
import { UserLogin, UserRegister } from '../../../services';
import Bg from '../../.././assets/image/illustration_login.png';
import Bg1 from '../../.././assets/image/illustration_register.png';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLogin: true,
            isLoggedIn: this.props.isLoggedIn,
            isShowPassword: false,

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
        this.props.getListGender();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.language !== this.props.language) {
            const dataBuild = this.handleBuildData(this.props.listAddress);
            this.setState({
                listAddress: dataBuild,
            });
        }

        if (prevProps.language !== this.props.language) {
            const dataBuild = this.handleBuildData(this.props.listGender);
            this.setState({
                listGender: dataBuild,
            });
        }

        if (prevProps.listAddress !== this.props.listAddress) {
            const dataBuild = this.handleBuildData(this.props.listAddress);
            this.setState({
                listAddress: dataBuild,
            });
        }

        if (prevProps.listGender !== this.props.listGender) {
            const dataBuild = this.handleBuildData(this.props.listGender);
            this.setState({
                listGender: dataBuild,
            });
        }

        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
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

        const checkEmail = validator.validate(this.state.email);

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
                if (!this.state[cloneState[i]]) {
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
        }

        if (!checkEmail) {
            isValidate = false;

            this.setState({
                isEmail: false,
            });
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
            isShowPassword: false,
        });
    };

    handleSwitchLoginAndRegister = () => {
        this.setState({
            isLogin: !this.state.isLogin,
        });
    };

    handleSubmit = async () => {
        const check = this.handleValidateData();

        if (check) {
            if (this.state.isLogin) {
                const dataBuild = {
                    email: this.state.email,
                    password: this.state.password,
                };

                const Res = await UserLogin(dataBuild);

                console.log('check Res :', Res);

                if (Res && Res.errCode === 0) {
                    this.props.userLoginSuccess(Res.user);
                    localStorage.setItem('accessToken', Res.user.accessToken);
                } else {
                    alert(Res.errMessage);
                }
            } else {
                const dataBuild = {
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.selectedAddress,
                    gender: this.state.selectedGender,
                };

                const Res = await UserRegister(dataBuild);

                if (Res && Res.errCode === 0) {
                    this.props.userLoginSuccess(Res.user);
                    localStorage.setItem('accessToken', Res.user.accessToken);
                } else {
                    alert(Res.errMessage);
                }
            }
        }
    };

    handleIsShowPassWord = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeyDownSubmit = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    };

    render() {
        const { isLogin, isLoggedIn } = this.state;
        const { language } = this.props;

        return (
            <div className="auth-container" onKeyDown={(e) => this.handleKeyDownSubmit(e)}>
                {/* <div className="wrapper-jax"> */}
                {isLoggedIn && <Redirect link="/" />}
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
                    <div className="row-authentication">
                        <div className="col-0 jsx-lef-authentication">
                            <div className="content-left">
                                <Link to="/">
                                    <IconLogo />
                                </Link>
                                <h3>{isLogin ? 'Hi, Welcome Back' : 'Manage the job more effectively with Minimal'}</h3>
                                <img src={isLogin ? Bg : Bg1} alt="Bg" loading="lazy" />
                            </div>
                        </div>
                        <div className="jsx-right-authentication">
                            <span className="jax-sd">
                                Don't have an account?{' '}
                                <Link
                                    to="/"
                                    onClick={(e) => {
                                        e.preventDefault();
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
                                </Link>
                            </span>

                            <div className="row-jax">
                                {isLogin ? (
                                    <div className="chuk-jax-auth login-jax">
                                        <div className="title-authentication login">
                                            <h1>Sign in to Minimal</h1>
                                            <p>Enter your details below.</p>
                                        </div>
                                        <div className="py-3 login-mildware">
                                            <button>
                                                <IconGoogleAuth />
                                            </button>
                                            <button>
                                                <IconFacebookAuth />
                                            </button>
                                            <button>
                                                <IconTwitterAuth />
                                            </button>
                                        </div>
                                        <div className="text-center jsx-or-options">
                                            <b></b>
                                            <span>or</span>
                                            <b></b>
                                        </div>
                                        <div className="jsx-parents-input-and-label">
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
                                        <div className="jsx-parents-input-and-label login">
                                            <label>Password</label>
                                            <input
                                                type={this.state.isShowPassword ? 'text' : 'password'}
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
                                            <p className="show-password" onClick={this.handleIsShowPassWord}>
                                                {this.state.isShowPassword ? (
                                                    <IconShowPassWord />
                                                ) : (
                                                    <IconHidePassWord />
                                                )}
                                            </p>
                                        </div>
                                        <div className="py-1 d-flex justify-content-end forgot-pass">
                                            <button>Forgot password?</button>
                                        </div>
                                        <div className="text-center button-submit-jsx login">
                                            <button onClick={this.handleSubmit}>
                                                <FormattedMessage id="authentication.together.btnLogin" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chuk-jax-auth login-jax">
                                        <div className="title-authentication login my-0">
                                            <h1>Register to UNOMO</h1>
                                            <p>Free forever. No credit card needed.</p>
                                        </div>
                                        <div className="py-3 login-mildware">
                                            <button>
                                                <IconGoogleAuth />
                                            </button>
                                            <button>
                                                <IconFacebookAuth />
                                            </button>
                                            <button>
                                                <IconTwitterAuth />
                                            </button>
                                        </div>
                                        <div className="text-center jsx-or-options">
                                            <b></b>
                                            <span>or</span>
                                            <b></b>
                                        </div>
                                        <div className="register-jax">
                                            <div className="jsx-parents-input-and-label c-6">
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
                                            <div className="jsx-parents-input-and-label c-6">
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
                                            <div className="jsx-parents-input-and-label c-12">
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
                                            <div className="jsx-parents-input-and-label c-12">
                                                <label>Password</label>
                                                <input
                                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                                    value={this.state.password}
                                                    className="jsx-input-authentication"
                                                    placeholder={
                                                        language === languages.VI
                                                            ? 'Nhập password của bạn'
                                                            : 'Enter your password'
                                                    }
                                                    onChange={(e) => this.handleChangeInputAndSelect(e, 'password')}
                                                />
                                                {!this.state.isPassword && (
                                                    <span>
                                                        <FormattedMessage id="authentication.together.isRequired" />
                                                    </span>
                                                )}
                                                <p
                                                    className="show-password register"
                                                    onClick={this.handleIsShowPassWord}
                                                >
                                                    {this.state.isShowPassword ? (
                                                        <IconShowPassWord />
                                                    ) : (
                                                        <IconHidePassWord />
                                                    )}
                                                </p>
                                            </div>

                                            <div className="jsx-parents-input-and-label c-6">
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

                                            <div className="jsx-parents-input-and-label c-6">
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
                                                            <option value={item.value} key={index}>
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
                                        </div>
                                        <div className="col-12 text-center button-submit-jsx">
                                            <button onClick={this.handleSubmit}>
                                                <FormattedMessage id="authentication.together.btnRegister" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listAddress: state.SiteReducer.listAddress,
        listGender: state.SiteReducer.listGender,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListAddress: () => dispatch(actions.getListAddress()),
        getListGender: () => dispatch(actions.getListGender()),
        ChangeLanguageApp: (language) => dispatch(actions.ChangeLanguageApp(language)),
        userLoginSuccess: (user) => dispatch(actions.userLoginSuccess(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
