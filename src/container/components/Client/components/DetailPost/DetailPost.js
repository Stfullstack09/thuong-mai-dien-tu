import React from 'react';
import { faComment, faEye } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { GetDetailPost } from '../../../../../services';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import * as actions from '../../../../../store/actions';
import './DetailPost.scss';
import Comment from '../../../../../components/Plugin/Comment';

function DetailPost() {
    const [detail, setDetail] = useState({});
    const [listPost, setListPost] = useState([]);
    const [isValid, setIsValid] = useState(true);

    const dispatch = useDispatch();
    const params = useParams();
    const history = useNavigate();

    const listPostRelated = useSelector((state) => state.SiteReducer.listPostRelated);

    useEffect(() => {
        if (params.id) {
            dispatch(actions.getPostRelated(params.id, 4));
        }
    }, [params, dispatch]);

    useEffect(() => {
        setListPost(listPostRelated);
    }, [listPostRelated]);

    useEffect(() => {
        const fetch = async () => {
            if (params.id) {
                const Res = await GetDetailPost(params.id);

                if (Res && Res.errCode === 0 && !_.isEmpty(Res.data)) {
                    setDetail(Res.data);
                }

                console.log('check Res.errCode === 4', Res.errCode === 4);

                if (Res && Res.errCode === 4) {
                    setIsValid(false);
                }
            }
        };

        fetch();
    }, [params]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRedirect = (link) => {
        setDetail({});
        setListPost([]);
        window.scrollTo(0, 0);
        history(link);
    };

    const handleRedirectLink = (link) => {
        history(link);
    };

    const handleFormatcount = (count) => {
        if (!count) return 0;

        let value = '';

        if (count >= 1000 && count < 1000000) {
            value = (count / 1000).toFixed(1) + 'k';
        }

        if (count < 1000) {
            value = count;
        }

        if (count >= 1000000) {
            value = (count / 1000000).toFixed(1) + 'M';
        }

        return value;
    };

    return (
        <>
            <div className="detail-post-wrapper">
                <div className="wrapper-post-parents">
                    <Header />
                    <div className="body-content">
                        {!_.isEmpty(detail) && (
                            <div className="container jax-mt-100 py-4">
                                <div className="row">
                                    <div className="col-xl-2 col-0 left-content">
                                        <p className="name-author text-center">
                                            <strong>{`${detail.userDataPost.firstName} ${detail.userDataPost.lastName}`}</strong>
                                        </p>
                                        <span className="border-jax"></span>
                                        <p className="d-flex justify-content-center align-items-center gap-4 jax-heart-cmt">
                                            <span className="">
                                                <span className="d-block text-center">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </span>
                                                <span className="d-block text-center">
                                                    {handleFormatcount(detail.countLike)}
                                                </span>
                                            </span>
                                            <span className="">
                                                <span className="d-block text-center">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </span>
                                                <span className="d-block text-center">20</span>
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-xl-10 col-12 right-content">
                                        <h1 className="title-post">
                                            {detail.title}{' '}
                                            <span className="mx-2 jax-show-mobile">
                                                <span className="me-1">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </span>
                                                <span>{handleFormatcount(detail.countLike)}</span>
                                            </span>
                                        </h1>
                                        <div className="p-2 my-4 profile-author">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img
                                                        onClick={() => handleRedirectLink('/profile/me')}
                                                        src={detail.userDataPost.avatar}
                                                        alt={detail.userDataPost.avatar}
                                                    />
                                                </div>
                                                <div>
                                                    <p>
                                                        <strong
                                                            onClick={() => handleRedirectLink('/profile/me')}
                                                        >{`${detail.userDataPost.firstName} ${detail.userDataPost.lastName}`}</strong>
                                                    </p>
                                                    <p>
                                                        Bài viết từ {new Date(+detail.time).toLocaleTimeString('vi-VI')}{' '}
                                                        {new Date(+detail.time).toLocaleDateString('vi-VI')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-3 cursor-pointer">
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </div>
                                        </div>
                                        <div
                                            className="render-content"
                                            dangerouslySetInnerHTML={{
                                                __html: detail.contentHTML,
                                            }}
                                        ></div>
                                        <div className="plugin-page">
                                            <p>
                                                <strong>Liên hệ page nếu gặp sự cố</strong>
                                            </p>
                                            <div className="d-flex justify-content-between jsx-two-ifame">
                                                <div className="plugin-page-one overflow-hidden">
                                                    <iframe
                                                        className="jax-customize"
                                                        title="myFrame"
                                                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100087270383166&tabs=timeline&width=340&height=135&small_header=false&adapt_container_width=false&hide_cover=true&show_facepile=true&appId=584691163324326"
                                                        width="400"
                                                        height="135"
                                                        style={{
                                                            border: 'none',
                                                            overflow: 'hidden',
                                                        }}
                                                        scrolling="no"
                                                        frameBorder="0"
                                                        allowFullScreen
                                                        allow="autoplay, clipboard-write, encrypted-media, picture-in-picture, web-share"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <Comment
                                                link={`https://gioi-thieu-doi-chut-son-khum-muon-di-hoc.vercel.app/${params.id}`}
                                            />
                                        </div>
                                        <div className="post-related-post">
                                            <div className="post-title-related">
                                                <p>
                                                    <strong>Bài viết nổi bật khác</strong>
                                                </p>
                                            </div>
                                            <div className="post-related">
                                                {listPost &&
                                                    listPost.length > 0 &&
                                                    listPost.map((item) => (
                                                        <div className="post-related-render py-2" key={item.id}>
                                                            {/* <a href={`/detail-post-create-new-by-customer/${item.id}`}> */}
                                                            <h3
                                                                className="py-2"
                                                                onClick={() =>
                                                                    handleRedirect(
                                                                        `/detail-post-create-new-by-customer/${item.id}`,
                                                                    )
                                                                }
                                                            >
                                                                {item.title}
                                                            </h3>
                                                            <div
                                                                className="image"
                                                                onClick={() =>
                                                                    handleRedirect(
                                                                        `/detail-post-create-new-by-customer/${item.id}`,
                                                                    )
                                                                }
                                                            >
                                                                <div className="overlay-img"></div>
                                                                <span>xem bài viết</span>
                                                                <img src={item.thumbnail} alt={item.thumbnail} />
                                                            </div>
                                                            {/* </a> */}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {!isValid && (
                        <p className="jax-no-access text-center py-2 fw-bold">
                            There is no access to this resource or the resource does not exist!
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailPost;
