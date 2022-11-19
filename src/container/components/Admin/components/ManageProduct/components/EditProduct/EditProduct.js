import React from 'react';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import CurrencyFormat from 'react-currency-format';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../../../../.././store/actions';
import Anh1 from '../../../../../../../assets/image/background-dep-nhe-nhang-cho-powerpoint.jpg';
import { languages } from '../../../../../../../utils/constant';
import { UpdateProductByAdmin } from '../../../../../../../services';

function EditProduct() {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const listCategory = useSelector((state) => state.SiteReducer.listCategory);
    const listAllProductByAdmin = useSelector((state) => state.SiteReducer.listAllProductByAdmin);
    const detailProductByAdmin = useSelector((state) => state.SiteReducer.detailProductByAdmin);
    const language = useSelector((state) => state.app.language);

    const dispatch = useDispatch();
    const [isDiscount, setIsDiscount] = useState(false);
    const [linkPreview, setLinkPreview] = useState(Anh1);
    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [disCount, setDiscount] = useState(1);
    const [priceDiscount, setPriceDiscount] = useState(0);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');
    const [listCategoryState, setListCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState();

    useEffect(() => {
        setListProduct(listAllProductByAdmin);
    }, [listAllProductByAdmin]);

    useEffect(() => {
        setListCategory(listCategory);
    }, [listCategory]);

    useEffect(() => {
        if (!_.isEmpty(detailProductByAdmin)) {
            setLinkPreview(detailProductByAdmin.thumbnail);
            setPrice(detailProductByAdmin.price);
            setCategory(detailProductByAdmin.categoryId);
            setContentHtml(detailProductByAdmin.contentHTML);
            setContentText(detailProductByAdmin.contentTEXT);
            setName(detailProductByAdmin.title);

            if (detailProductByAdmin.discount) {
                setIsDiscount(true);
                setDiscount(detailProductByAdmin.discount);
            } else {
                setIsDiscount(false);
                setDiscount(null);
            }
        }
    }, [detailProductByAdmin]);

    useEffect(() => {
        dispatch(actions.getCateGory());
        dispatch(actions.getAllProductByAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (selectProduct) {
            dispatch(actions.getDetailProductByAdmin(selectProduct));
        }
    }, [selectProduct, dispatch]);

    const handleOnChangeInput = (e, type) => {
        if (type === 'price') {
            if (!_.isNaN(+e.target.value)) {
                setPrice(+e.target.value);
            } else {
                alert('Giá của bạn phải là số (number)');
            }
        }

        if (type === 'select') {
            setCategory(e.target.value);
        }

        if (type === 'selectproduct') {
            setSelectProduct(e.target.value);
        }

        if (type === 'name') {
            setName(e.target.value);
        }

        if (type === 'disCount') {
            if (!_.isNaN(+e.target.value)) {
                if (+e.target.value >= 100) {
                    alert('% giảm giá chỉ có thể từ 1% - 99%');
                    return;
                }

                setDiscount(+e.target.value);
            } else {
                alert('% giảm giá của bạn phải là số (number)');
            }
        }

        if (type === 'checkbox') {
            if (e.target.checked) {
                setIsDiscount(true);
            }
        }
    };

    useEffect(() => {
        const id = window.location.search.slice(4);

        console.log(id);

        if (id) {
            setSelectProduct(id);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.search]);

    useEffect(() => {
        setPriceDiscount(Number(price - (price * disCount) / 100));
    }, [price, disCount]);

    const handleEditorChange = ({ html, text }) => {
        setContentHtml(html);
        setContentText(text);
    };

    const handleClick = () => {
        handleHideShowLightBox();
    };

    const handleHideShowLightBox = () => {
        setIsOpen(!isOpen);
    };

    const handleClickAgainNoDisCount = () => {
        setIsDiscount(false);

        console.log('check discount :', disCount);
    };

    const hanedleValidate = () => {
        let isValid = true;
        const cloneArr = [];

        if (!isDiscount) {
            cloneArr.push(category, name, price, contentText, contentHtml, selectProduct);
        } else {
            cloneArr.push(category, name, price, disCount, contentText, contentHtml, selectProduct);
        }

        for (let i = 0; i < cloneArr.length; i++) {
            if (!cloneArr[i]) {
                alert('Bạn đã thiếu trường !');
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    const handleSubmit = async () => {
        const check = hanedleValidate();
        if (!check) {
            return;
        }
        const databuild = {
            title: name,
            categoryId: category,
            price,
            contentTEXT: contentText,
            contentHTML: contentHtml,
            disCount,
            id: selectProduct,
        };

        if (isDiscount) {
            if (disCount <= 0) {
                alert('Phần trăm giảm giá phải lớn hơn 0');
                return;
            }
        }

        dispatch(actions.setIsLoading());

        const Res = await UpdateProductByAdmin(databuild);

        dispatch(actions.setIsLoading());

        if (Res && Res.errCode === 0) {
            alert('Bạn đã cập nhật sản phẩm thành công');
        }
    };

    return (
        <>
            <div className="add-product-jsx-wrapper">
                <div className="add-product-jsx-content">
                    <div className="title text-center">
                        <h1>
                            <FormattedMessage id="admin.product.titleEdit" />
                        </h1>
                    </div>
                    <div className="body">
                        <div className="container">
                            <div
                                className="jsx-image-add-product"
                                onClick={handleClick}
                                style={{
                                    backgroundImage: `url(${linkPreview})`,
                                }}
                            ></div>

                            {isOpen && (
                                <Lightbox onCloseRequest={() => handleHideShowLightBox()} mainSrc={linkPreview} />
                            )}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-12 col-md-12 my-4 px-5 item-jsx-add-product">
                                            <label className="mb-2">
                                                <FormattedMessage id="admin.product.chooseProEdit" />
                                            </label>
                                            <select
                                                value={selectProduct}
                                                className="jsx-input-add text-center h-26"
                                                onChange={(e) => handleOnChangeInput(e, 'selectproduct')}
                                            >
                                                <option value="">
                                                    <FormattedMessage id="admin.product.choosePro" />
                                                </option>
                                                {listProduct &&
                                                    listProduct.length > 0 &&
                                                    listProduct.map((item) => (
                                                        <option className="my-3" value={item.id} key={item.id}>
                                                            {item.title}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                            <label className="mb-2">
                                                <FormattedMessage id="admin.product.chooseCategory" />
                                            </label>
                                            <select
                                                value={category}
                                                className="jsx-input-add text-center h-26"
                                                onChange={(e) => handleOnChangeInput(e, 'select')}
                                            >
                                                <option value="">
                                                    <FormattedMessage id="admin.product.chooseCategorySelect" />
                                                </option>
                                                {listCategoryState &&
                                                    listCategoryState.length > 0 &&
                                                    listCategoryState.map((item) => (
                                                        <option value={item.keyMap} key={item.id}>
                                                            {language === languages.VI ? item.valueVI : item.valueEN}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                            <label className="mb-2">
                                                <FormattedMessage id="admin.product.inputName" />
                                            </label>
                                            <input
                                                value={name}
                                                className="jsx-input-add"
                                                onChange={(e) => handleOnChangeInput(e, 'name')}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                            <label>
                                                <FormattedMessage id="admin.product.inputPrice" />
                                            </label>
                                            <input
                                                value={price}
                                                placeholder="Bạn hãy nhập giá sản phẩm"
                                                className="jsx-input-add"
                                                onChange={(e) => handleOnChangeInput(e, 'price')}
                                            />
                                        </div>
                                        {isDiscount ? (
                                            <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                                <label>
                                                    <FormattedMessage id="admin.product.inputDiscount" />
                                                </label>
                                                <input
                                                    value={disCount}
                                                    className="jsx-input-add"
                                                    onChange={(e) => handleOnChangeInput(e, 'disCount')}
                                                />
                                                <span
                                                    className="no-discount"
                                                    onClick={() => handleClickAgainNoDisCount()}
                                                >
                                                    <FormattedMessage id="admin.product.isDiscountAgain" />
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                                <input
                                                    className="jsx-input-add checkbox"
                                                    type="checkbox"
                                                    onChange={(e) => handleOnChangeInput(e, 'checkbox')}
                                                />
                                                <label className="text-center">
                                                    <FormattedMessage id="admin.product.isDiscount" />
                                                </label>
                                            </div>
                                        )}
                                        <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                            <label>
                                                {isDiscount ? (
                                                    <FormattedMessage id="admin.product.priceNoDiscount" />
                                                ) : (
                                                    <FormattedMessage id="admin.product.priceYesDiscount" />
                                                )}
                                            </label>
                                            <CurrencyFormat
                                                value={price}
                                                thousandSeparator={true}
                                                suffix={' vnd'}
                                                disabled
                                                className="jsx-input-add disable"
                                            />
                                        </div>
                                        {isDiscount && (
                                            <div className="col-12 col-md-6 my-2 item-jsx-add-product">
                                                <label>
                                                    <FormattedMessage id="admin.product.priceDiscountEnd" />
                                                </label>
                                                <CurrencyFormat
                                                    value={priceDiscount}
                                                    thousandSeparator={true}
                                                    suffix={' vnd'}
                                                    disabled
                                                    className="jsx-input-add disable"
                                                />
                                            </div>
                                        )}
                                        <div className="col-12 my-2 mt-4 item-jsx-add-product">
                                            <label>
                                                <FormattedMessage id="admin.product.description" />
                                            </label>
                                            <MdEditor
                                                value={contentText ? contentText : ''}
                                                style={{ height: '500px' }}
                                                renderHTML={(text) => mdParser.render(text)}
                                                onChange={handleEditorChange}
                                            />
                                        </div>
                                        <div className="my-3 pe-3 text-end">
                                            <button className="btn btn-primary my-2" onClick={handleSubmit}>
                                                <FormattedMessage id="admin.product.btnUpdate" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;
