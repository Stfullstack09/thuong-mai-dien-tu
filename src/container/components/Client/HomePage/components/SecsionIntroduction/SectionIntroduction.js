import React from 'react';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import { NextArrow, PrevArrow } from '../../../../../../Styles/ArrowSlick';
import '../section.scss';

function SectionIntroduction() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="section-introduction-wrapper jsx-home-responsive">
            <Slider {...settings}>
                <div className="image-section">
                    <div className="image-section-children">
                        <div
                            className="image"
                            style={{
                                backgroundImage: `url('https://t004.gokisoft.com/uploads/2021/07/2-s-1634-banner-web.jpg')`,
                            }}
                        ></div>
                        <p className="introduction-text">
                            <span className="span-up">
                                <span className="d-inline-block text-intro">
                                    <FormattedMessage id="home.introduction" />
                                </span>
                            </span>
                            <span className="span-down">
                                <button>
                                    <FormattedMessage id="home.viewPro" />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="image-section">
                    <div className="image-section-children">
                        <div
                            className="image"
                            style={{
                                backgroundImage: `url('https://toplist.vn/images/800px/gumac-708482.jpg')`,
                            }}
                        ></div>
                        <p className="introduction-text">
                            <span className="span-up">
                                <span className="d-inline-block text-intro">
                                    <FormattedMessage id="home.introduction" />
                                </span>
                            </span>
                            <span className="span-down">
                                <button>
                                    <FormattedMessage id="home.viewPro" />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="image-section">
                    <div className="image-section-children">
                        <div
                            className="image"
                            style={{
                                backgroundImage: `url('https://kenh14cdn.com/203336854389633024/2022/5/5/photo-3-16517251027981400431953.jpg')`,
                            }}
                        ></div>
                        <p className="introduction-text">
                            <span className="span-up">
                                <span className="d-inline-block text-intro">
                                    <FormattedMessage id="home.introduction" />
                                </span>
                            </span>
                            <span className="span-down">
                                <button>
                                    <FormattedMessage id="home.viewPro" />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SectionIntroduction;
