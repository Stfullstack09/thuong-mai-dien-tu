import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { NextArrow, PrevArrow } from '../../../../../../Styles/ArrowSlick';
import '../section.scss';
import { GetLimitPosts } from '../../../../../../services';

function PostNews({ target = false }) {
    const [listPosts, setListPosts] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: listPosts.length > 4 ? 4 : listPosts.length,
        autoplay: true,
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
            const Res = await GetLimitPosts(5);

            if (Res && Res.errCode === 0) {
                setListPosts(Res.data);
            } else {
                alert(Res.msg);
            }
        };

        fetch();
    }, []);

    return (
        <div className="section-introduction-wrapper trend-product">
            <Slider {...settings}>
                {listPosts &&
                    listPosts.length > 0 &&
                    listPosts.map((item) => (
                        <Link
                            to={`/detail-post-create-new-by-customer/${item.id}`}
                            target={target ? '_blank' : ''}
                            rel="noreferrer"
                            key={item.id}
                        >
                            <div className="image-section product-trend">
                                <div className="image-section-children">
                                    <div
                                        className="image-product-trend jax-post-image"
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
                                        <span className="text-start text-intro-trend-name">
                                            <strong>{item.title}</strong>
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

export default PostNews;
