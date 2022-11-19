import React from 'react';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import validator from 'email-validator';
import jwt_decode from 'jwt-decode';

import { languages } from '../../../../utils/constant';
import './AuthAdmin.scss';
import { UserLoginAdmin } from '../../../../services';
import * as actions from '../../../.././store/actions';
import Redirect from '../../../../router/components/redirect';
import { useEffect } from 'react';

function AuthAdmin() {
    const language = useSelector((state) => state.app.language);
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [isRedirect, setIsRedireact] = useState(false);

    const handleClickNext = () => {
        setIsNext(true);
    };

    const handleSwithcType = () => {
        setIsShowPassword(!isShowPassword);
    };

    const validateData = () => {
        const checkEmail = validator.validate(email);

        let isValid = true;
        const CloneArr = [email, password];

        for (let i = 0; i < CloneArr.length; i++) {
            if (!CloneArr[i]) {
                if (i === 0) {
                    setIsEmail(true);
                    isValid = false;
                }

                if (i === 1) {
                    setIsPassword(true);
                    isValid = false;
                }
            }
        }

        if (!checkEmail) {
            setIsEmail(true);
            isValid = false;
        }

        return isValid;
    };

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);

            if (decoded.roleId !== 'R3') {
                setIsRedireact(true);
            }
        }
    }, [token]);

    const handleOnInput = (type) => {
        if (type === 'email') {
            setIsEmail(false);
        }

        if (type === 'password') {
            setIsPassword(false);
        }
    };

    const handleSubmit = async () => {
        const Check = validateData();

        if (Check) {
            const dataBuild = {
                email,
                password,
            };

            console.log('check log :', dataBuild);

            const Res = await UserLoginAdmin(dataBuild);

            if (Res && Res.errCode === 0) {
                dispatch(actions.userLoginSuccess(Res.user));
                localStorage.setItem('accessToken', Res.user.accessToken);
            } else {
                alert(Res.errMessage);
            }
        }
    };

    return (
        <div className="auth-admin-wrapper">
            {isRedirect && <Redirect link="/" />}
            {!isNext && (
                <div className="jsx-introduce-next">
                    <div className="text-center p-4">
                        <h1>UNOMO Xin Chào Bạn Đã Đến Với Trang Của Admin</h1>
                        <button className="btn btn-primary p-3 mt-4" onClick={handleClickNext}>
                            Click Để Tiếp Tục
                        </button>
                    </div>
                </div>
            )}
            {isNext && (
                <div className="container">
                    <div className="row">
                        <div className="col-7 left-content">
                            <div></div>
                        </div>
                        <div className="col-5 right-content">
                            <div className="content-authentication">
                                <span className="nav-authentication vi" title="Tiếng anh">
                                    en
                                </span>
                                <button className="nav-authentication en" title="Tiếng việt">
                                    vi
                                </button>
                                <Link to="/" className="nav-authentication" title="Back to home">
                                    <FontAwesomeIcon icon={faClose} />
                                </Link>
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
                                        value={email}
                                        className="jsx-input-authentication"
                                        placeholder={
                                            language === languages.VI
                                                ? 'Nhập email của bạn eg: abc@gmail.com'
                                                : 'Enter your email eg: abc@gmail.com'
                                        }
                                        onChange={(e) => setEmail(e.target.value)}
                                        onInput={() => handleOnInput('email')}
                                    />
                                    {isEmail && (
                                        <span>
                                            <FormattedMessage id="authentication.together.valiEmail" />
                                        </span>
                                    )}
                                </div>
                                <div className="col-12 px-5 jsx-parents-input-and-label login">
                                    <label>Password</label>
                                    <input
                                        value={password}
                                        type={isShowPassword ? 'text' : 'password'}
                                        className="jsx-input-authentication"
                                        placeholder={
                                            language === languages.VI
                                                ? 'Nhập password của bạn eg: matkhaucauban'
                                                : 'Enter your password eg: matkhaucauban'
                                        }
                                        onChange={(e) => setPassword(e.target.value)}
                                        onInput={() => handleOnInput('password')}
                                    />
                                    {isPassword && (
                                        <span>
                                            <FormattedMessage id="authentication.together.isRequired" />
                                        </span>
                                    )}
                                    <p className="show-password" onClick={handleSwithcType}>
                                        {isShowPassword ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
                                    </p>
                                </div>
                                <div className="col-12 text-center button-submit-jsx login">
                                    <button onClick={handleSubmit}>
                                        <FormattedMessage id="authentication.together.btnLogin" />
                                    </button>
                                </div>
                                <div className="pt-5 text-center">
                                    <a
                                        href="https://www.facebook.com/truongsonworkspace09112003"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-link"
                                    >
                                        Bạn đang gặp vấn đề về đăng nhập liên hệ đến quản trị viên Website
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuthAdmin;
