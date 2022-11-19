import React from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../../../../../components/loading/loading';
import Loadingske from '../../../../../../components/loadingSkeloton/Loadingske';
import OTPRegisterSell from '../../../../../../components/OTP/OTPRegisterSell';
import { GetCurrentUser, RegisterSellByCustomer } from '../../../../../../services';

function RegisterSell() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSendEmail, setIsSendEmail] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const fetCh = async () => {
            setIsLoading(true);

            const Res = await GetCurrentUser();

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                if (!_.isEmpty(Res.data)) {
                    if (Res.data.roleId !== 'R3') {
                        setIsValid(false);
                    }
                }
            }
        };

        fetCh();
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);

        const Res = await RegisterSellByCustomer();

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            setIsSendEmail(true);
        }
    };

    return (
        <>
            {isValid ? (
                <>
                    <div className="register-sell-wrapper">
                        <div className="container">
                            <div className="h2 fw-bold text-center my-4">
                                Chào mừng bạn đã đến với đăng ký để trở thành người bán hàng
                            </div>
                            {isSendEmail ? (
                                <OTPRegisterSell setIsLoading={setIsLoading} />
                            ) : (
                                <div className="body-content-register-sell">
                                    <div className="jsx-warning">
                                        <p className="text-warning mb-1">
                                            <span>
                                                <strong>Lưu ý : </strong>
                                                bạn nên đọc ký các điều khoản trước khi đồng ý để chúng ta có một sự làm
                                                việc hiệu quả
                                            </span>
                                        </p>
                                        <p className="text-warning">
                                            <span>
                                                <strong>
                                                    Dưới đây là toàn bộ thông tin của bạn bạn nên xem thật kỹ trước khi
                                                    thay đổi và xác minh vì chúng tôi sẽ không cho phép sửa đổi thông
                                                    tin khi email đã được xác nhận!
                                                </strong>
                                                <a
                                                    href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {' '}
                                                    chính sách bảo mật
                                                </a>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="content-jsx-register mt-3 p-5 m-5">
                                        <p>
                                            FirstName : <strong>Trường</strong>
                                        </p>
                                        <p>
                                            LatName : <strong>Sơn</strong>
                                        </p>
                                        <p>
                                            email : <input placeholder="truongsonpt.80@gmail.com" />
                                        </p>
                                        <p>
                                            Address : <strong>Phú Thọ</strong>
                                        </p>
                                        <div className="text-center">
                                            <button onClick={handleSubmit} className="btn btn-success m-2">
                                                Xác Nhận Email
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-5 text-center">
                            <p className="mb-2">
                                <strong>UNOMO</strong> khuyến cáo bạn nên khai báo đúng thông tin cá nhân của bạn !
                            </p>
                            <p className="mb-2">
                                <span>để tránh gặp rủi do trong các trường hợp lừa đảo</span>
                            </p>
                            <p className="mb-2">
                                <span>
                                    nếu bạn cảm thấy có sự lừa đảo hay không chân thực hãy liên hệ với đội ngũ của chúng
                                    tôi <a href="/">tại đây</a>
                                </span>
                            </p>
                            <p className="mb-2">
                                <span>
                                    vì lí do bảo mật, nếu bạn muốn đổi mật khẩu vui lòng click{' '}
                                    <a
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        tại đây
                                    </a>
                                </span>
                            </p>
                            <p className="mb-2">
                                <span>
                                    xem chính sách bảo mật của chúng tôi{' '}
                                    <a
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        tại đây
                                    </a>
                                </span>
                            </p>
                        </div>
                    </div>
                    {isLoading && (
                        <div>
                            <Loading />
                            <Loadingske />
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center mt-5">
                    <strong>Bạn đã trở thành người bán</strong>
                    <span className="mx-1">
                        <Link to="/profile/me">click vào đây để quay lại</Link>
                    </span>
                </p>
            )}
        </>
    );
}

export default RegisterSell;
