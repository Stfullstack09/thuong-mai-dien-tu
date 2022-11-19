import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Typewriter from 'typewriter-effect';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { handlePriceDisCount } from '../../../../../../../components/handlePriceDisCount';
import useDebounce from '../../../../../../../components/hook/useDebounce';
import { SearchProduct } from '../../../../../../../services';
import { languages } from '../../../../../../../utils/constant';

SearchHeader.porpsTypes = {
    isOpenSearch: PropTypes.bool.isRequired,
    setIsOpenSearch: PropTypes.func.isRequired,
};

function SearchHeader({ isOpenSearch, setIsOpenSearch }) {
    const handleClickContent = (e) => {
        e.stopPropagation();
    };

    const history = useNavigate();
    const language = useSelector((state) => state.app.language);

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const debounceValue = useDebounce(text, 500);

    const handleRedirect = () => {
        if (debounceValue) {
            history(`/search/${debounceValue}`);
        }
    };

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);

        const fetchApi = async () => {
            setIsLoading(true);

            const results = await SearchProduct(debounceValue);

            setIsLoading(false);

            if (results && results.data.length > 0) {
                setSearchResults(results.data);
            } else {
                setSearchResults([]);
            }
        };

        const handleSearchBtn = async () => {
            if (!debounceValue.trim()) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);

            setIsLoading(true);

            const results = await SearchProduct(debounceValue);

            setIsLoading(false);

            if (results && results.data.length > 0) {
                setSearchResults(results.data);
            } else {
                setSearchResults([]);
            }
        };

        fetchApi();
    }, [debounceValue]);

    return (
        <>
            {isOpenSearch && (
                <div
                    className="search-header-wrapper"
                    onScroll={(e) => e.preventDefault()}
                    onClick={() => setIsOpenSearch(!isOpenSearch)}
                >
                    <div className="children-search-header"></div>
                    <div className="content-search-header-wrapper" onClick={(e) => handleClickContent(e)}>
                        <div className="title text-center">
                            <Typewriter
                                options={{
                                    strings:
                                        language === languages.VI
                                            ? [
                                                  'Bạn muốn tìm kiếm sản phẩm ?',
                                                  'Hãy để chúng tôi giúp bạn làm điều đó nhé ❤️',
                                                  'Một số sản phẩm HOT như áo hoodie hay như là áo thun áo phông nó trông thật đẹp',
                                                  'Chúng có thể là một trong những gợi ý cực kỳ phù hợp với bạn ❤️❤️',
                                                  'Bạn có thể tham khảo điều đó từ trợ lí như tôi ❤️❤️😁',
                                              ]
                                            : [
                                                  'Want to search for products?',
                                                  'Let us help you do it ❤️',
                                                  'Some products are HOT like hoodies or like t-shirts, it looks so good',
                                                  'They can be one of the suggestions that are extremely suitable for you ❤️❤️',
                                                  'You can refer to that from an assistant like me ❤️❤️😁',
                                              ],

                                    autoStart: true,
                                    pauseFor: 4000,
                                    delay: 50,
                                    loop: true,
                                }}
                            />
                        </div>
                        <div className="search-input my-3">
                            <div className="jsx-om-two-element">
                                <input
                                    value={text}
                                    placeholder={
                                        language === languages.VI
                                            ? 'Bạn hãy nhập thứ gì mà bạn muốn tìm'
                                            : 'Please enter what you want to find'
                                    }
                                    className="jsx-search-input-header"
                                    onChange={(e) => setText(e.target.value)}
                                    autoFocus={true}
                                />
                                {isLoading && (
                                    <p className="loading-spinner-input">
                                        <ClipLoader color="#36d7b7" />
                                    </p>
                                )}
                                <span>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                            <div className="jsx-render-result">
                                {searchResults && searchResults.length > 0 ? (
                                    searchResults.map((item) => (
                                        <div className="item-result d-flex align-items-center" key={item.id}>
                                            <div
                                                className="image-jsx-search"
                                                style={{
                                                    backgroundImage: `url(${item.thumbnail})`,
                                                }}
                                            ></div>
                                            <div className="body-jsx-search">
                                                <h2>{item.title}</h2>
                                                <p>
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
                                                                {language === languages.VI
                                                                    ? `giảm: ${item.discount}%`
                                                                    : `reducer: ${item.discount}%`}
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
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center mt-5">
                                        <FormattedMessage id="search.noResult" />
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchHeader;
