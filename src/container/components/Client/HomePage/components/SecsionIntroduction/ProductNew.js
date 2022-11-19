import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import { GetProductOther } from '../../../../../../services';
import { Link } from 'react-router-dom';

import { NextArrow, PrevArrow } from '../../../../../../Styles/ArrowSlick';
import '../section.scss';
import { handlePriceDisCount } from '../../../../../../components/handlePriceDisCount';
import { languages } from '../../../../../../utils/constant';

function ProductNew({ target = false }) {
    const language = useSelector((state) => state.app.language);

    const [listProduct, setListProduct] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: listProduct.length > 4 ? 4 : listProduct.length,
        // autoplay: true,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetch = async () => {
            const Res = await GetProductOther('new', '6');

            if (Res && Res.errCode === 0) {
                setListProduct(Res.data);
            } else {
                alert(Res.msg);
            }
        };

        fetch();
    }, []);

    return (
        <div className="section-introduction-wrapper trend-product">
            <Slider {...settings}>
                {listProduct &&
                    listProduct.length > 0 &&
                    listProduct.map((item) => (
                        <Link
                            to={`/product-details-customer-secret/${item.id}`}
                            target={target ? '_blank' : ''}
                            rel="noreferrer"
                            key={item.id}
                        >
                            <div className="image-section product-trend">
                                <div className="image-section-children">
                                    <div
                                        className="image-product-trend"
                                        style={{
                                            backgroundImage: `url('${item.thumbnail}')`,
                                        }}
                                    >
                                        <div className="jsx-nav-redirect">
                                            <span>
                                                <FontAwesomeIcon icon={faSearch} />
                                                XEM
                                            </span>
                                        </div>
                                    </div>
                                    <p className="introduction-text-product-trend">
                                        <span className="d-block text-start text-intro-trend-category">
                                            {language === languages.VI
                                                ? item.categoryData.valueVI
                                                : item.categoryData.valueEN}
                                        </span>
                                        <span className="text-start text-intro-trend-name">
                                            <strong>{item.title}</strong>
                                        </span>
                                        <span className="d-block text-start text-intro-trend-price">
                                            {item.discount !== null ? (
                                                <>
                                                    <CurrencyFormat
                                                        value={handlePriceDisCount(item.price, item.discount)}
                                                        thousandSeparator={true}
                                                        suffix={' VND'}
                                                        disabled
                                                        className="jsx-input-add disable"
                                                    />
                                                    <span className="ms-1 discount-section">
                                                        giảm: {item.discount}%
                                                    </span>
                                                </>
                                            ) : (
                                                <CurrencyFormat
                                                    value={+item.price}
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                    disabled
                                                    className="jsx-input-add disable"
                                                />
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </Slider>
        </div>
    );
}

export default ProductNew;
