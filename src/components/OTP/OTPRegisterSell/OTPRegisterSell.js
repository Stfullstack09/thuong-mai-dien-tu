import { useEffect } from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../OTP.scss';
import { CheckVerifyEmail } from '../../../services';
import { userLoginSuccess } from '../../../store/actions';

OTPRegisterSell.propsTypes = {
    setIsLoading: PropTypes.func.isRequired,
};

function OTPRegisterSell({ setIsLoading }) {
    const [otp, setOtp] = useState('');
    const [time, setTime] = useState(180);
    const [minute, setMinute] = useState(3);
    const [second, setSecond] = useState(0);
    const [isValid, setIsValid] = useState(true);

    const history = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (otp) => {
        setOtp(otp);
    };

    const handleClearOTP = () => {
        setOtp('');
    };

    useEffect(() => {
        if (time >= 0) {
            const timeInterval = setInterval(() => {
                const mui = Math.floor(time / 60);
                const seco = time - mui * 60;

                setMinute(mui);
                setSecond(seco);

                setTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timeInterval);
        } else {
            setIsValid(false);
        }
    }, [minute, second, time]);

    const handleSendOTP = async () => {
        if (!otp) {
            alert('Bạn hãy nhập OTP');
            return;
        }

        const dataBuild = {
            OTP: otp,
        };

        setIsLoading(true);

        const Res = await CheckVerifyEmail(dataBuild);

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            const data = Res.user;

            if (_.isEmpty(data)) return;

            localStorage.setItem('accessToken', data.accessToken);
            dispatch(userLoginSuccess(data));
            alert('Chúc mừng bạn đã xác minh thành công!');
            history('/system/admin-page/manage-product/add-new-product');
            return;
        } else {
            alert(Res.msg);
            return;
        }
    };

    return (
        <div className="otp-register-sell-wrapper">
            <div className="content">
                {isValid ? (
                    <>
                        <p className="mb-4">
                            <strong>Hãy nhập OTP của được gửi đến email của bạn!</strong>
                        </p>
                        <div className="d-flex justify-content-center">
                            <OtpInput
                                value={otp}
                                onChange={handleChange}
                                numInputs={6}
                                className="jsx-customize-input-otp"
                            />
                        </div>
                        <p className="time-out text-center mt-4">
                            <span>
                                OTP có thời hạn trong vòng{' '}
                                <strong>
                                    {`${minute < 10 ? `0${minute}` : minute} : ${second < 10 ? `0${second}` : second}`}{' '}
                                    phút nữa
                                </strong>
                            </span>
                        </p>
                        <div className="text-center mt-1">
                            <button onClick={handleClearOTP} className="bt-3 btn btn-success m-2">
                                Clear OTP
                            </button>
                            <button onClick={handleSendOTP} className="bt-3 btn btn-primary m-2">
                                Send OTP
                            </button>
                        </div>
                    </>
                ) : (
                    <p>
                        Bạn đã hết thời gian chờ vui lòng xác minh lại để lấy OTP mới
                        <Link to="/profile/me" className="mx-1">
                            tại đây
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default OTPRegisterSell;
