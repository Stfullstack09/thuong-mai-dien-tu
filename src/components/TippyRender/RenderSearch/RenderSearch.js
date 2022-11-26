import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

import Wrapper from '../../Popper/Wrapper';
import styles from './RenderSearch.module.scss';
import ItemResult from './ItemResult';

const cx = classNames.bind(styles);

function RenderSearch({ hdeOnClick, children, ResultRender }) {
    const RenderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <Wrapper custom>
                {/* {history.length > 1 && <Header title={current.title} custom onBack={handleBack} />} */}
                <div className={cx('menu-body')}>
                    <ItemResult />
                    <ItemResult />
                    <ItemResult />
                </div>
            </Wrapper>
        </div>
    );

    const handleResetToFirstPage = () => {};

    return (
        <div className={cx('render-search-wrapper')}>
            <Tippy
                visible={true}
                delay={[0, 700]}
                offset={[0, 2]}
                hideOnClick={hdeOnClick}
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
