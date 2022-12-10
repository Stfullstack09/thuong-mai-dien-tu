import React from 'react';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';

import ModalWrapper from '../../../../components/ModalWrapper/ModalWrapper';
import ExportPDF from './components/ExportPDF';
import HeaderManageOrder from './components/HeaderManageOrder/HeaderManageOrder';

import styles from './ManageOrder.module.scss';
import RenderEmail from './components/RenderEmail';
import { GetAllInformationByAdmin, SendEmailToCustomer } from '../../../../services';
import _ from 'lodash';
import { handlePriceDisCount } from '../../../../components/handlePriceDisCount';
import CurrencyFormat from 'react-currency-format';

const cx = classNames.bind(styles);

function ManageOrder() {
    const [isOpen, setIsOpen] = useState(false);
    const [isViewPDF, setIsViewPDF] = useState(false);
    const [list, setList] = useState([]);
    const [isLoadingSend, setIsLoadingSend] = useState(false);
    const [dataEmail, setDataEmail] = useState({});
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetAllInformationByAdmin();

            if (Res && Res.errCode === 0) {
                setList(Res.data);
            }
        };

        fetch();
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleViewPDF = (data) => {
        setData(data);
        setIsViewPDF(true);
    };

    const handleToggleVewPDF = () => {
        setIsViewPDF(!isViewPDF);
    };

    const handleSubmit = async () => {
        if (!contentHtml || _.isEmpty(dataEmail)) {
            alert('Bạn đã nhập thiếu trường!');
            return;
        }

        const dataBuild = {
            contentHtml,
            emailSend: dataEmail.userData.email,
        };

        setIsLoadingSend(true);

        const Res = await SendEmailToCustomer(dataBuild);

        if (Res && Res.errCode === 0) {
            setIsLoadingSend(false);
            setContentText('');
            setContentText('');
            setDataEmail({});
        }
    };

    useEffect(() => {
        document.title = 'UNOMO Kênh Người Bán';
    });

    return (
        <>
            <div className={cx('manage-order-wrapper')}>
                <HeaderManageOrder />
                <div className={cx('body-content')}>
                    <h2 className={cx('title', 'text-center')}>Đơn hàng trong shop của bạn!</h2>
                    <div className={cx('product-as')}>
                        <div className={cx('select')}>
                            <select>
                                <option value="">Tất cả đơn hàng</option>
                                <option value="">Đơn hàng đã xác nhận</option>
                                <option value="">Đơn hàng chưa xác nhận</option>
                                <option value="">Đơn hàng đã hủy</option>
                            </select>
                            <button onClick={handleToggle}>Gửi email</button>
                            <button onClick={handleViewPDF}>Xem hóa đơn</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">fullName</th>
                                    <th scope="col">title</th>
                                    <th scope="col">price</th>
                                    <th scope="col" className="text-center">
                                        actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list &&
                                    list.length > 0 &&
                                    list.map((item, index) => {
                                        const id = uuidv4();

                                        return (
                                            <tr key={id}>
                                                {!_.isEmpty(item) && (
                                                    <>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{`${item.userData.firstName} ${item.userData.lastName}`}</td>
                                                        <td>{item.productDataOder.title}</td>
                                                        <td>
                                                            {
                                                                <CurrencyFormat
                                                                    onValueChange={() => () => {}}
                                                                    value={handlePriceDisCount(
                                                                        item.price,
                                                                        item.discount,
                                                                    )}
                                                                    thousandSeparator={true}
                                                                    suffix={' VND'}
                                                                    disabled
                                                                    className={cx('jsx-input-add')}
                                                                />
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            <button className="btn" onClick={() => handleViewPDF(item)}>
                                                                <i className="bi bi-arrows-angle-contract"></i>
                                                            </button>
                                                            <button className="btn">
                                                                <i className="bi bi-bag-check-fill"></i>
                                                            </button>
                                                            <button className="btn">
                                                                <i className="bi bi-trash2-fill"></i>
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalWrapper
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                handleToggle={handleToggle}
                bodyRender={
                    <RenderEmail
                        setDataEmail={setDataEmail}
                        setContentHtml={setContentHtml}
                        setContentText={setContentText}
                        contentText={contentText}
                        isLoadingSend={isLoadingSend}
                        dataEmail={dataEmail}
                        data={list}
                    />
                }
                title="Gửi email đến khách hàng của bạn!"
                centered
                className={cx('send-email-modal')}
            />
            <ModalWrapper
                size="xl"
                isOpen={isViewPDF}
                handleSubmit={handleSubmit}
                handleToggle={handleToggleVewPDF}
                bodyRender={
                    <PDFViewer className={cx('preview-pdf')}>
                        <ExportPDF data={data} />
                    </PDFViewer>
                }
                title="Xem hóa đơn của khách hàng"
                className={'modal-viewer-pdf'}
            />
        </>
    );
}

export default ManageOrder;
