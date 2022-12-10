import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import LogoImg from '../../../../../../assets/image/aa3f1d1e.png';
import { languages } from '../../../../../../utils/constant';
import TippyRender from '../../../../../../components/TippyRender/RenderHeader/TippyRender';
import * as actions from '../../../../../.././store/actions';
import RenderSearch from '../../../../../../components/TippyRender/RenderSearch';
import { MenuItem, userMenu } from '../../../../../.././utils/constant';
import ItemResult from '../../../../../../components/TippyRender/RenderSearch/ItemResult';
import Wrapper from '../../../../../../components/Popper/Wrapper';
import styles from '../../ManageOrder.module.scss';
import useDebounce from '../../../../../../components/hook/useDebounce';
import { SearchProductInShop } from '../../../../../../services';

const cx = classNames.bind(styles);

function HeaderManageOrder() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    const history = useNavigate();

    const language = useSelector((state) => state.app.language);
    const currentUser = useSelector((state) => state.SiteReducer.currentUser);

    const [user, setUser] = useState({});
    const [textSearch, setTextSearch] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    useEffect(() => {
        if (_.isEmpty(currentUser)) {
            dispatch(actions.getCurrentUser());
        }
    }, [dispatch, currentUser]);

    const Text = useDebounce(textSearch, 700);

    useEffect(() => {
        if (textSearch.length === 0) {
            setListSearch([]);
        }
    }, [textSearch]);

    useEffect(() => {
        if (!Text.trim()) {
            return;
        }

        const fetCh = async () => {
            setIsLoading(true);

            const Res = await SearchProductInShop(Text);

            setIsLoading(false);

            if (Res && Res.errCode === 0 && Res.data.length > 0) {
                setListSearch(Res.data);
                setIsValid(true);
                setIsShow(true);
            } else if (Res && Res.errCode === 0 && Res.data.length === 0) {
                setIsValid(false);
                setIsShow(true);
            } else {
                alert(Res.msg);
            }
        };

        fetCh();
    }, [Text]);

    function handleMenuChange(menuItem) {
        console.log(menuItem);
    }

    const hdeOnClick = () => {
        setIsShow(false);
    };

    const handleRedirect = (link) => {
        if (!link) {
            link = '/';
        }

        history(link);
    };

    const ResultRender = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <Wrapper custom>
                {/* {history.length > 1 && <Header title={current.title} custom onBack={handleBack} />} */}
                <div className={cx('menu-body')}>
                    {isValid ? (
                        listSearch &&
                        listSearch.length > 0 &&
                        listSearch.map((item) => {
                            const key = uuidv4();

                            return <ItemResult key={key} data={item} />;
                        })
                    ) : (
                        <ItemResult isValid />
                    )}
                </div>
            </Wrapper>
        </div>
    );

    const handleClickClearText = () => {
        setTextSearch('');
        setListSearch([]);
    };

    return (
        <div className={cx('header-manage-order-wrapper')}>
            <div className={cx('container-customize')}>
                <div>
                    <img onClick={() => handleRedirect()} className={cx('img-logo')} src={LogoImg} alt="LogoImg" />
                </div>
                <div className={cx('right-jax-manage-order')}>
                    {
                        <RenderSearch
                            listSearch={listSearch}
                            isShow={isShow}
                            hdeOnClick={hdeOnClick}
                            ResultRender={ResultRender}
                            isValid={isValid}
                        >
                            <span className={cx('span-sesrch')}>
                                <input
                                    onFocus={() => {
                                        setIsShow(true);
                                    }}
                                    onChange={(e) => setTextSearch(e.target.value)}
                                    value={textSearch}
                                    placeholder="Tìm kiếm đơn hàng qua ID"
                                />
                                {isLoading ? (
                                    <FontAwesomeIcon className="rotate" icon={faSpinner} />
                                ) : (
                                    <i onClick={handleClickClearText} className="bi bi-x-circle"></i>
                                )}
                            </span>
                        </RenderSearch>
                    }
                    {!_.isEmpty(user) && (
                        <TippyRender items={isLoggedIn ? MenuItem : userMenu} onChange={handleMenuChange}>
                            {isLoggedIn ? (
                                <img className={cx('img-avatar')} src={user.avatar} alt={user.avatar} />
                            ) : (
                                <img
                                    className={cx('img-avatar')}
                                    src="https://cdn-icons-png.flaticon.com/512/483/483343.png"
                                    alt="https://cdn-icons-png.flaticon.com/512/483/483343.png"
                                />
                            )}
                        </TippyRender>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderManageOrder;
