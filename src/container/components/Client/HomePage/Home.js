import { FormattedMessage } from 'react-intl';

import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import PostNews from './components/SecsionIntroduction/PostNews';
import ProductChildren from './components/SecsionIntroduction/ProductChildren';
import ProductFeMale from './components/SecsionIntroduction/ProductFeMale';
import ProductMale from './components/SecsionIntroduction/ProductMale';
import ProductNew from './components/SecsionIntroduction/ProductNew';
import ProductTrend from './components/SecsionIntroduction/ProductTrend';
import SectionIntroduction from './components/SecsionIntroduction/SectionIntroduction';
import './Home.scss';

function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <div className="introduction-section-home">
                <SectionIntroduction />
            </div>
            <div className="jsx-home-body">
                <div className="text-introduce">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleOne" />
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleTwo" />
                                </h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <ProductTrend />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending product-new mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleThree" />
                                </h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <ProductNew />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending product-gender-male mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleFour" />
                                </h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <ProductMale />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending product-gender-female mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleFive" />
                                </h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <ProductFeMale />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending product-children mt-5 mb-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>
                                    <FormattedMessage id="home.titleSix" />
                                </h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <ProductChildren />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jsx-home-production-trending product-children jsx-post-home mt-5 mb-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center p-5 jsx-responsive">
                                <h2>Một số bài viết nổi bật từ khách hàng</h2>
                            </div>
                            <div className="jsx-section-slider col-12">
                                <PostNews />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
