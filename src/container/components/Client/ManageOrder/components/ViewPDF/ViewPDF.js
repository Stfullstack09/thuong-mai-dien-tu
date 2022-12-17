import { PDFViewer } from '@react-pdf/renderer';
import classNames from 'classnames/bind';

import ModalWrapper from '../../../../../../components/ModalWrapper/ModalWrapper';
import ExportPDF from '../ExportPDF';

import styles from '../../ManageOrder.module.scss';

const cx = classNames.bind(styles);

function ViewPDF({ isViewPDF, handleSubmit = () => {}, handleToggleVewPDF, data }) {
    return (
        <>
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
                isSubmit={false}
            />
        </>
    );
}

export default ViewPDF;
