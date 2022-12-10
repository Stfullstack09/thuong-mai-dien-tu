import Item from 'antd/es/list/Item';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './RenderSearch.module.scss';

const cx = classnames.bind(styles);

function ItemResult({ data, isValid = false }) {
    const history = useNavigate();

    const handleRedirect = (link) => {
        history(link);
    };

    return (
        <>
            {!isValid ? (
                <div
                    className={cx('item-result-wrapper')}
                    onClick={() => handleRedirect(`/system/admin-page/manage-product/edit-product?id=${data.id}`)}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                            <img className={cx('img-render-result')} src={data.thumbnail} alt={data.title} />
                            <div className={cx('intro')}>
                                <h3>{data.title}</h3>
                                <p>Thời trang nữ</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-center py-3">
                        <strong>Không tìm thấy bất cứ sản phẩm nào</strong>
                    </p>
                </div>
            )}
        </>
    );
}

export default ItemResult;
