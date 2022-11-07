import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Loadingske from '../../../../../../components/loadingSkeloton/Loadingske';
import { GetCurrentUser, UpdateCurrentUser, UploadImage } from '../../../../../../services';
import { languages } from '../../../../../../utils/constant';
import * as actions from '../../../../../../store/actions';

function HomeProfile() {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [thumbnail, setThumbnail] = useState(null);
    const [linkPreview, setLinkPreview] = useState('');
    const [linkPreviewChange, setLinkPreviewChange] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [listAdressRender, setListAdressRender] = useState([]);
    const [listGenderRender, setListGenderRender] = useState([]);

    const listAddress = useSelector((state) => state.SiteReducer.listAddress);
    const listGender = useSelector((state) => state.SiteReducer.listGender);
    const language = useSelector((state) => state.app.language);

    const fetch = async () => {
        setIsLoading(true);

        const Res = await GetCurrentUser();

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            const data = Res.data;

            setAddress(data.address);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setGender(data.gender);
            setLinkPreview(data.avatar ? data.avatar : null);
            setEmail(data.email);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        dispatch(actions.getListAddress());
        dispatch(actions.getListGender());
    }, [dispatch]);

    useEffect(() => {
        setListAdressRender(listAddress);
    }, [listAddress]);

    useEffect(() => {
        setListGenderRender(listGender);
    }, [listGender]);

    const handleClickChoooAvatar = () => {
        const input = ref.current;

        if (!linkPreview) {
            if (input) {
                input.click();
            }
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (!linkPreview) {
            if (file) {
                // file >= 1.5MB
                if (file.size >= 1500000) {
                    alert('Vui lòng chọn file có dung lượng dưới 1.5MB');
                    return;
                }

                setThumbnail(file);
                setLinkPreviewChange(URL.createObjectURL(file));
            }
        }
    };

    const handleValidate = () => {
        let isValid = true;

        const arrClone = [firstName, lastName, address, gender];

        for (let i = 0; i < arrClone.length; i++) {
            if (!arrClone[i]) {
                alert('Bạn nhập thiếu trường');
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    const handleSubmitData = async () => {
        const check = handleValidate();

        // eslint-disable-next-line no-restricted-globals
        const checkTwo = confirm('Bạn đã chắc chắn với hành động của mình chứ?');

        if (!checkTwo) return;

        if (!linkPreview && thumbnail && check) {
            const Res = await UploadImage({
                file: thumbnail,
                upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
            });

            if (!_.isEmpty(Res)) {
                const dataBuild = {
                    firstName,
                    lastName,
                    address,
                    gender,
                    avatar: Res.url,
                };
                setIsLoading(true);

                const res = await UpdateCurrentUser(dataBuild);

                if (res && res.errCode === 0) {
                    fetch();
                }
            } else {
                alert('Đã có lỗi xảy ra vui lòng thử lại sau !');
                return;
            }

            return;
        }

        if (check) {
            const dataBuild = {
                firstName,
                lastName,
                address,
                gender,
                avatar: linkPreview ? linkPreview : null,
            };
            setIsLoading(true);

            const Res = await UpdateCurrentUser(dataBuild);

            if (Res && Res.errCode === 0) {
                fetch();
            }
        }
    };

    return (
        <>
            {isLoading && <Loadingske />}
            <div className="home-profile-jsx">
                <div className="text-center fw-bold my-4">Xin chào bạn Trườnghông tin của bạn</div>
                <div className="image">
                    <div
                        className="show-img"
                        onClick={handleClickChoooAvatar}
                        style={{
                            backgroundImage: `url('${linkPreview || linkPreviewChange}')`,
                        }}
                    >
                        {!linkPreview && (
                            <span>
                                <FontAwesomeIcon icon={faCamera} />
                            </span>
                        )}
                    </div>
                    <input
                        ref={ref}
                        onChange={(e) => handleChangeFile(e)}
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                    />
                </div>
                <div className="content-body mt-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 mb-2">
                                <label>Link avatar</label>
                                <input
                                    placeholder={linkPreview ? linkPreview : 'Bạn chưa cập nhật ảnh đại diện'}
                                    type="text"
                                    disabled
                                    className="form-control-customize"
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>First Name</label>
                                <input
                                    value={firstName}
                                    type="text"
                                    className="form-control-customize"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Last Name</label>
                                <input
                                    value={lastName}
                                    type="text"
                                    className="form-control-customize"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Email</label>
                                <input placeholder={email} disabled type="text" className="form-control-customize" />
                            </div>
                            <div className="col-6 mb-2">
                                <label>Address</label>
                                <select value={address} onChange={(e) => setAddress(e.target.value)}>
                                    <option value="....choose...">
                                        {language === languages.VI ? 'Chọn tỉnh của bạn' : 'Choose your province'}
                                    </option>
                                    {listAdressRender &&
                                        listAdressRender.length > 0 &&
                                        listAdressRender.map((item) => (
                                            <option value={item.keyMap} key={item.id}>
                                                {language === languages.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-6 mb-2">
                                <label>Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="....choose...">
                                        {language === languages.VI ? 'Chọn giới tính của bạn' : 'Choose your gender'}
                                    </option>
                                    {listGenderRender &&
                                        listGenderRender.length > 0 &&
                                        listGenderRender.map((item) => (
                                            <option value={item.keyMap} key={item.id}>
                                                {language === languages.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-12 mt-3 text-end">
                                <button onClick={handleSubmitData} className="btn btn-primary">
                                    Lưu Thông Tin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 pt-5 text-center">
                    <p className="mb-2">
                        <strong>UNOMO</strong> khuyến cáo bạn nên khai báo đúng thông tin cá nhân của bạn !
                    </p>
                    <p className="mb-2">
                        <span>để tránh gặp rủi do trong các trường hợp lừa đảo</span>
                    </p>
                    <p className="mb-2">
                        <span>
                            nếu bạn cảm thấy có sự lừa đảo hay không chân thực hãy liên hệ với đội ngũ của chúng tôi{' '}
                            <a href="/">tại đây</a>
                        </span>
                    </p>
                    <p className="mb-2">
                        <span>
                            vì lí do bảo mật, nếu bạn muốn đổi mật khẩu vui lòng click{' '}
                            <a
                                href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                target="_blank"
                                rel="noreferrer"
                            >
                                tại đây
                            </a>
                        </span>
                    </p>
                    <p className="mb-2">
                        <span>
                            xem chính sách bảo mật của chúng tôi{' '}
                            <a
                                href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                target="_blank"
                                rel="noreferrer"
                            >
                                tại đây
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default HomeProfile;
