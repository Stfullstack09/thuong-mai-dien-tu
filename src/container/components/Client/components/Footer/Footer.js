import React from 'react';
import { FormattedMessage } from 'react-intl';
import { faFacebook, faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.scss';

import './Footer.scss';

function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 left-content">
                        <p className="nickName">
                            <strong>
                                <FormattedMessage id="footer.trademark" />
                            </strong>
                        </p>
                        <p>
                            <span>
                                <b>
                                    <FormattedMessage id="footer.des-one" />
                                </b>
                                <FormattedMessage id="footer.des-span-one" />
                                <b>
                                    <FormattedMessage id="footer.des-span-two" />
                                </b>
                            </span>
                            <span>
                                <FormattedMessage id="footer.des-two" />
                            </span>
                            <span>
                                <FormattedMessage id="footer.des-three" />
                                <b>
                                    <FormattedMessage id="footer.des-span" />
                                </b>
                            </span>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-12">
                                <label className="my-2">
                                    <FormattedMessage id="footer.send-email" />
                                </label>
                                <input className="form-control" placeholder="eg: ts@gmail.com" />
                            </div>
                            <div className="col-12 my-3">
                                <button className=" ms-auto d-block btn btn-success">
                                    <FormattedMessage id="footer.btn-send" />
                                </button>
                            </div>
                            {/* <div className="col-12">
                                <label className="my-2">
                                    <FormattedMessage id="footer.error" />
                                </label>
                                <div className="border-radius-4 overflow-hidden">
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
                            </div> */}
                        </div>
                    </div>
                    <div className="col-12 d-flex fsoesdsds-s align-items-center">
                        <p>
                            <span className="me-3">
                                <FormattedMessage id="footer.link-to" />
                            </span>
                            <span>
                                <a className="mx-2" href="//">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a className="mx-2" href="//">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a className="mx-2" href="//">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a className="mx-2" href="//">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
