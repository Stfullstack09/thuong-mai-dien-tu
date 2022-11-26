import classnames from 'classnames/bind';

import styles from './RenderSearch.module.scss';

const cx = classnames.bind(styles);

function ItemResult() {
    return (
        <div className={cx('item-result-wrapper')}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <img
                        className={cx('img-render-result')}
                        src="https://res.cloudinary.com/dnn5yfz32/image/upload/v1665201963/ix6arbrsgcakivufthsv.jpg"
                        alt="ds"
                    />
                    <div className={cx('intro')}>
                        <h3>
                            Váy bé gái thu đông NHẬT HÀ cổ thủy thủ kèm nơ xinh xắn dáng tay dài size đại từ 11-45kg
                        </h3>
                        <p>Thời trang nữ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemResult;
