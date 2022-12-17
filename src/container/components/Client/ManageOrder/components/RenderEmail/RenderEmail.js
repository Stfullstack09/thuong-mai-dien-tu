import classNames from 'classnames/bind';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import styles from '../../ManageOrder.module.scss';
import { SendEmailToCustomer } from '../../../../../../services';
import ModalWrapper from '../../../../../../components/ModalWrapper/ModalWrapper';
import WraperEmail from './components/WraperEmail';

const cx = classNames.bind(styles);

const RenderEmail = ({ isOpen, handleToggle }) => {
    const [list, setList] = useState([]);
    const [isLoadingSend, setIsLoadingSend] = useState(false);
    const [dataEmail, setDataEmail] = useState({});
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');

    const listAllProduct = useSelector((state) => state.SiteReducer.listAllProduct);

    useEffect(() => {
        if (!_.isEmpty(listAllProduct)) {
            const array = listAllProduct.map((item) => item.userData);

            const arrayRender = [];

            // eslint-disable-next-line array-callback-return
            array.map((item) => {
                let arrayName = [];

                if (arrayRender && arrayRender.length > 0) {
                    arrayName = arrayRender.map((item) => item.email);
                }

                if (arrayRender && arrayRender.length > 0) {
                    const bool = arrayName.includes(item.email);

                    if (!bool) {
                        arrayRender.push(item);
                    }
                } else {
                    arrayRender.push(item);
                }
            });

            setList(arrayRender);
        }
    }, [listAllProduct]);

    const handleSubmit = async () => {
        if (!contentHtml || _.isEmpty(dataEmail)) {
            alert('Bạn đã nhập thiếu trường!');
            return;
        }

        const dataBuild = {
            contentHtml,
            emailSend: dataEmail.email,
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

    return (
        <>
            <ModalWrapper
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                handleToggle={handleToggle}
                bodyRender={
                    <WraperEmail
                        setDataEmail={setDataEmail}
                        setContentHtml={setContentHtml}
                        setContentText={setContentText}
                        contentText={contentText}
                        isLoadingSend={isLoadingSend}
                        dataEmail={dataEmail}
                        data={list}
                    />
                }
                isSubmit={!_.isEmpty(dataEmail)}
                title="Gửi email đến khách hàng của bạn!"
                centered
                className={cx('send-email-modal')}
            />
        </>
    );
};

export default RenderEmail;
