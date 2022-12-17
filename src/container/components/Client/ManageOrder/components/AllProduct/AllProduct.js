import React from 'react';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CurrencyFormat from 'react-currency-format';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { handlePriceDisCount } from '../../../../../../components/handlePriceDisCount';
import ModalWrapper from '../../../../../../components/ModalWrapper/ModalWrapper';

import styles from '../../ManageOrder.module.scss';
import ConfirmData from './ConfirmData';
import PacmanLoaderLoading from '../../../../../../components/loading/PacmanLoader';
import { UpdateStatusProductOrder } from '../../../../../../services';
import * as actions from '../../../../../.././store/actions';
import { languages } from '../../../../../../utils/constant';

const cx = classNames.bind(styles);

const AllProduct = ({ handleViewPDF, list }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const [dataConfirm, setDataConfirm] = useState({});
    const [dataSelect, setDataSelect] = useState({
        type: 'cancel',
    });

    const dispatch = useDispatch();
    const language = useSelector((state) => state.app.language);

    const handleToggleModalConfirm = () => {
        setIsOpenModalConfirm(!isOpenModalConfirm);
        setDataSelect({
            type: 'cancel',
        });
    };

    const handleShowConfirm = (item) => {
        setDataConfirm(item);
        setIsOpenModalConfirm(true);
    };

    const handleSubmitConfirm = async () => {
        setIsOpen(true);
        setIsOpenModalConfirm(false);

        const Res = await UpdateStatusProductOrder(dataSelect);

        if (Res && Res.errCode === 0) {
            toast('Bạn đã cập nhật trạng thái thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(actions.getAllOrderProduct());
            setIsOpen(false);
            setDataSelect({
                type: 'cancel',
            });
        } else {
            alert(Res.msg);
            setIsOpen(false);
        }
    };

    const handleCancel = async (data) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Bạn chắc chắn hủy sản phẩm này?');

        if (!check) {
            return;
        }

        const dataBuild = {
            type: 'cancel',
            id: data.id,
            time: 1,
        };

        setIsOpen(true);

        const Res = await UpdateStatusProductOrder(dataBuild);

        if (Res && Res.errCode === 0) {
            toast('Bạn đã hủy thành công đơn hàng!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch(actions.getAllOrderProduct());
            setIsOpen(false);
        } else {
            alert(Res.msg);
            setIsOpen(false);
        }
    };

    return (
        <>
            {isOpen && <PacmanLoaderLoading />}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">fullName</th>
                        <th scope="col">title</th>
                        <th scope="col">price</th>
                        <th scope="col">status</th>
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
                                    {!_.isEmpty(item) && item.userData && item.statusData && item.productDataOder && (
                                        <>
                                            <th scope="row">{index + 1}</th>
                                            <td>{`${item.userData.firstName} ${item.userData.lastName}`}</td>
                                            <td>{item.productDataOder.title}</td>
                                            <td>
                                                {
                                                    <CurrencyFormat
                                                        onValueChange={() => () => {}}
                                                        value={handlePriceDisCount(item.price, item.discount)}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        disabled
                                                        className={cx('jsx-input-add')}
                                                    />
                                                }
                                            </td>
                                            <td>
                                                {language === languages.VI
                                                    ? item.statusData.valueVI
                                                    : item.statusData.valueEN}
                                            </td>
                                            <td className="text-center">
                                                <button className="btn" onClick={() => handleViewPDF(item)}>
                                                    <i className="bi bi-arrows-angle-contract"></i>
                                                </button>
                                                {item.statusId !== 'S4' && item.statusId !== 'S5' && (
                                                    <>
                                                        <button className="btn" onClick={() => handleShowConfirm(item)}>
                                                            <i className="bi bi-bag-check-fill"></i>
                                                        </button>
                                                        {!item.timeDone && !item.timeVC && (
                                                            <button className="btn" onClick={() => handleCancel(item)}>
                                                                <i className="bi bi-trash2-fill"></i>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <ModalWrapper
                size="lg"
                centered
                isOpen={isOpenModalConfirm}
                handleSubmit={handleSubmitConfirm}
                handleToggle={handleToggleModalConfirm}
                bodyRender={<ConfirmData setDataSelect={setDataSelect} dataSelect={dataSelect} data={dataConfirm} />}
                title="Xác nhận đơn hàng của khách hàng"
            />
        </>
    );
};

export default AllProduct;
