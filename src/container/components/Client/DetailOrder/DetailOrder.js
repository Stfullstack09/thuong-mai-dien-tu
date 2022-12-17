import React from 'react';
import { faCalendarWeek, faHandHoldingHeart, faMoneyCheck, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { handlePriceDisCount } from '../../../../components/handlePriceDisCount';
import Loading from '../../../../components/loading/loading';
import {
    GetOrderByID,
    RestoreProductByCustomer,
    UpdateStatusOderByCustomer,
    UpdateStatusProductOrder,
} from '../../../../services';
import { languages } from '../../../../utils/constant';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';

import './DetailOrder.scss';

function DetailOrder() {
    const [detail, setDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const history = useNavigate();

    const language = useSelector((state) => state.app.language);

    const fetch = useCallback(async () => {
        setIsLoading(true);

        const Res = await GetOrderByID(params.id);

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            if (!_.isEmpty(Res.data)) {
                setDetail(Res.data);
            }
        } else {
            alert(Res.msg);
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            fetch();
        }
    }, [fetch, params.id]);

    const handleRedirect = (link) => {
        history(link);
    };

    const handleRestoreProduct = async (id, productId) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm(
            'Bạn chắc chắn mua lại sản phẩm này chứ? khi thực hiện mua lại bạn sẽ phải chịu sự thay đổi về giá nếu của hàng thay đổi sau khi bạn hủy đơn hàng trước đó',
        );

        if (!check) return;

        setIsLoading(true);

        const res = await RestoreProductByCustomer({ id, productId });

        setIsLoading(false);

        if (res && res.errCode === 0) {
            fetch();
        }
    };

    const handleSubmit = async (item) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm(`Bạn có chắc chắn hủy sản phẩm ${item.productDataOder.title}`);

        if (check) {
            setIsLoading(true);

            const Res = await UpdateStatusOderByCustomer(item.id);

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                fetch();
            }
        }
    };

    const handleConfirm = async (data) => {
        const dataBuid = {
            type: 'done',
            time: new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Ho_Chi_Minh' })).getTime(),
            id: data ? data.id : 0,
        };

        setIsLoading(true);

        const Res = await UpdateStatusProductOrder(dataBuid);

        if (Res && Res.errCode === 0) {
            fetch();
            setIsLoading(false);
        } else {
            setIsLoading(false);
            alert(Res.msg);
        }
    };

    return (
        <>
            {!_.isEmpty(detail) && (
                <div className="detail-oder-wrapper">
                    <Header />
                    <div className="content-jsx mb-4">
                        <div className="container py-sm-4">
                            <div className="p-xl-3 p-sm-1">
                                <div>
                                    <h2 className="text-center fw-bold fz-20 mb-md-3">
                                        <FormattedMessage id="detailOrder.title" />
                                    </h2>
                                    <div className="d-flex justify-content-between align-items-center px-2 flex-sm-ct-column-mobile">
                                        <button
                                            onClick={() => handleRedirect(-1)}
                                            className="btn jsx-btn-back"
                                            title="Quay lại trang trước"
                                        >
                                            <FormattedMessage id="detailOrder.btnBack" />
                                        </button>
                                        <div className="mt-sm-1">
                                            <span className="id-order d-sm-block-cs f-sm-11">
                                                <FormattedMessage id="detailOrder.ID" /> {detail.uuid}
                                            </span>
                                            <span className="mx-2 d-sm-none-cs">|</span>
                                            <span className="status-order d-sm-block-cs mt-sm-1">
                                                {language === languages.VI
                                                    ? !_.isEmpty(detail.statusData) && detail.statusData.valueVI
                                                    : !_.isEmpty(detail.statusData) && detail.statusData.valueEN}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overview-detail mt-3">
                                        <div className="px-5">
                                            <div className="jsx-chart overflow-hidden">
                                                <div className="jsx-item-chuk">
                                                    <div className="d-flex justify-content-center">
                                                        <div
                                                            className={
                                                                detail.statusId === 'S1'
                                                                    ? 'item-svg-jsx active'
                                                                    : 'item-svg-jsx'
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faCalendarWeek} />
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        <p className="mb-0 jax-chuk-title">
                                                            <FormattedMessage id="detailOrder.desOne" />
                                                        </p>
                                                        <p className="jax-ds-render">
                                                            {detail.timeOder
                                                                ? `${new Date(+detail.timeOder).toLocaleTimeString(
                                                                      'vi-VI',
                                                                  )} ${new Date(+detail.timeOder).toLocaleDateString(
                                                                      'vi-VI',
                                                                  )}`
                                                                : 'Đang cập nhật'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-item-chuk">
                                                    <div className="d-flex justify-content-center">
                                                        <div
                                                            className={
                                                                detail.statusId === 'S2'
                                                                    ? 'item-svg-jsx active'
                                                                    : 'item-svg-jsx'
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faMoneyCheck} />
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        <p className="mb-0 jax-chuk-title">
                                                            <FormattedMessage id="detailOrder.desTwo" />
                                                        </p>
                                                        <p className="jax-ds-render">
                                                            {detail.timeBank
                                                                ? `${new Date(+detail.timeBank).toLocaleTimeString(
                                                                      'vi-VI',
                                                                  )} ${new Date(+detail.timeBank).toLocaleDateString(
                                                                      'vi-VI',
                                                                  )}`
                                                                : 'Đang cập nhật'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-item-chuk">
                                                    <div className="d-flex justify-content-center">
                                                        <div
                                                            className={
                                                                detail.statusId === 'S3'
                                                                    ? 'item-svg-jsx active'
                                                                    : 'item-svg-jsx'
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faTruckArrowRight} />
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        <p className="mb-0 jax-chuk-title">
                                                            <FormattedMessage id="detailOrder.desThree" />
                                                        </p>
                                                        <p className="jax-ds-render">
                                                            {detail.timeVC
                                                                ? `${new Date(+detail.timeVC).toLocaleTimeString(
                                                                      'vi-VI',
                                                                  )} ${new Date(+detail.timeVC).toLocaleDateString(
                                                                      'vi-VI',
                                                                  )}`
                                                                : 'Đang cập nhật'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-item-chuk">
                                                    <div className="d-flex justify-content-center">
                                                        <div
                                                            className={
                                                                detail.statusId === 'S6'
                                                                    ? 'item-svg-jsx active'
                                                                    : 'item-svg-jsx'
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faHandHoldingHeart} />
                                                        </div>
                                                    </div>
                                                    <div className="text-center mt-3">
                                                        <p className="mb-0 jax-chuk-title">
                                                            <FormattedMessage id="detailOrder.desFour" />
                                                        </p>
                                                        <p className="jax-ds-render">
                                                            {detail.timeDone
                                                                ? `${new Date(+detail.timeDone).toLocaleTimeString(
                                                                      'vi-VI',
                                                                  )} ${new Date(+detail.timeDone).toLocaleDateString(
                                                                      'vi-VI',
                                                                  )}`
                                                                : 'Đang cập nhật'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="line-nowrap-jsx">
                                                    <div className="stepper__line-background"></div>
                                                    <div className="stepper__line-foreground"></div>
                                                </div>
                                            </div>
                                            <div className="contact-jsx-overview">
                                                <div className="jsx-chuk-contact-overview jsx-sd-he-sm d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <span>
                                                            <FormattedMessage id="detailOrder.contactTitle" />
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={`mailto:${detail.userData.email}`}
                                                        className="jsx-button-chuk-details jax-contact-shop mt-sm-1"
                                                    >
                                                        <FormattedMessage id="detailOrder.btnContact" />
                                                    </a>
                                                </div>
                                                <div className="jsx-chuk-contact-overview d-flex justify-content-end align-items-center">
                                                    {detail.statusId !== 'S5' ? (
                                                        detail.statusId === 'S4' ? (
                                                            <button
                                                                className="jsx-button-chuk-details"
                                                                onClick={() =>
                                                                    handleRestoreProduct(detail.id, detail.productId)
                                                                }
                                                            >
                                                                <FormattedMessage id="detailOrder.btnRestore" />
                                                            </button>
                                                        ) : detail.statusId === 'S3' ? (
                                                            <button
                                                                onClick={() => handleConfirm(detail)}
                                                                className="jsx-button-chuk-details"
                                                            >
                                                                <FormattedMessage id="detailOrder.btnConfirm" />
                                                            </button>
                                                        ) : detail.statusId === 'S6' ? (
                                                            <span>
                                                                Đơn hàng của bạn đã hoàn thành chúc bạn một ngày mới vui
                                                                vẻ
                                                            </span>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSubmit(detail)}
                                                                className="jsx-button-chuk-details"
                                                            >
                                                                <FormattedMessage id="detailOrder.btnCancel" />
                                                            </button>
                                                        )
                                                    ) : (
                                                        <span>
                                                            Đơn hàng của bạn đã xảy ra một chút mà chúng tôi không muốn
                                                            xảy ra đó là đơn hàng của bạn đã bị hủy bởi của hàng, nhưng
                                                            không sao chúng tôi còn có rất nhiều đơn vị bán mà bạn hoàn
                                                            toàn có thể tham khảo
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="jsx-border-overview"></div>
                                            </div>
                                            <div className="detail-jsx-address overflow-hidden py-4">
                                                <div className="row">
                                                    <div className="col-xl-6 col-md-6 col-12 mt-sm-1">
                                                        <p>
                                                            <strong>
                                                                <FormattedMessage id="detailOrder.addRess" />
                                                            </strong>
                                                        </p>
                                                        <div className="jsx-render-data">
                                                            <p>{`${detail.userData.firstName} ${detail.userData.lastName}`}</p>
                                                            <p>email. {detail.userData.email}</p>
                                                            <p>{detail.address}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-md-6 col-12 mt-sm-1 right-content">
                                                        <p>
                                                            <strong>
                                                                <FormattedMessage id="detailOrder.note" />
                                                            </strong>
                                                        </p>
                                                        <div>
                                                            <p>{detail.note}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-jax scroll-none">
                                                <div className="d-flex justify-content-space-between jax-item min-sm-450">
                                                    <div className="left-content">
                                                        <div
                                                            className="image"
                                                            style={{
                                                                backgroundImage: `url('${detail.productDataOder.thumbnail}')`,
                                                            }}
                                                            onClick={() =>
                                                                handleRedirect(
                                                                    `/product-details-customer-secret/${detail.productId}`,
                                                                )
                                                            }
                                                        ></div>
                                                        <div className="introduction">
                                                            <p>
                                                                <strong
                                                                    onClick={() =>
                                                                        handleRedirect(
                                                                            `/product-details-customer-secret/${detail.productId}`,
                                                                        )
                                                                    }
                                                                >
                                                                    {detail.productDataOder.title}
                                                                </strong>
                                                            </p>
                                                            <div className="om-jax">
                                                                <p className="size">
                                                                    size: {detail.SizeOderData.valueVI}
                                                                </p>
                                                                <span>x{detail.count}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="right-content">
                                                        <p className="text-end over-hidden-sm">
                                                            <CurrencyFormat
                                                                onValueChange={() => () => {}}
                                                                value={handlePriceDisCount(
                                                                    detail.price,
                                                                    detail.discount,
                                                                )}
                                                                thousandSeparator={true}
                                                                suffix={' VND'}
                                                                disabled
                                                                className="jsx-input-add disable"
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                .
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
            {isLoading && <Loading />}
        </>
    );
}

export default DetailOrder;
