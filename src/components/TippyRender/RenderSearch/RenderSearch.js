import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './RenderSearch.module.scss';

const cx = classNames.bind(styles);

function RenderSearch({ listSearch, isShow, isValid, hdeOnClick, children, ResultRender }) {
    const handleResetToFirstPage = () => {};

    return (
        <div className={cx('render-search-wrapper')}>
            <Tippy
                visible={(isShow && listSearch.length > 0) || (isShow && !isValid)}
                delay={[0, 700]}
                offset={[0, 2]}
                onClickOutside={hdeOnClick}
                interactive
                placement="bottom-end"
                render={ResultRender}
                onHide={handleResetToFirstPage}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default RenderSearch;
