import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';

import { GetDetailPostEdit, UpdatePostEdit, UploadImageComment } from '../../../../../../../../../../services';
import Loadingske from '../../../../../../../../../../components/loadingSkeloton/Loadingske';
import PacmanLoaderLoading from '../../../../../../../../../../components/loading/PacmanLoader';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function EditPost() {
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [img, setImg] = useState(null);
    const [linkPreview, setLinkPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTwo, setIsLoadingTwo] = useState(true);
    const [details, setDetails] = useState({});
    const [isValid, setIsValid] = useState(true);

    const ref = useRef(null);

    const handleEditorChange = ({ html, text }) => {
        setContentHtml(html);
        setContentText(text);
    };

    useEffect(() => {
        if (!_.isEmpty(details)) {
            setContentHtml(details.contentHTML);
            setContentText(details.contentTEXT);
            setTitleValue(details.title);
            setLinkPreview(details.thumbnail);
        }
    }, [details]);

    const handleImageUpload = async (file, callback) => {
        if (!file) return;

        if (file) {
            if (file.size >= 1500000) {
                alert('Vui lòng chọn file có dung lượng dưới 1.5MB');
                return;
            }
        }

        setIsLoading(true);

        const Res = await UploadImageComment({
            file: file,
            upload_preset: process.env.REACT_APP_UPLOAD_PRESET_COMMENT,
        });

        setIsLoading(false);

        if (_.isEmpty(Res)) {
            alert('Có lỗi khi tải ảnh lên !');
            return;
        }

        // setImage(link);

        return Promise.resolve(Res.url);
    };

    const id = window && window.location && window.location.search ? window.location.search.slice(4) : 0;

    const fetch = useCallback(async () => {
        setIsLoadingTwo(true);

        const Res = await GetDetailPostEdit(id);

        setIsLoadingTwo(false);

        if (Res && Res.errCode === 0) {
            setDetails(Res.data);
        }

        if (Res && Res.errCode === 4) {
            setIsValid(false);
        }
    }, [id]);

    useEffect(() => {
        fetch();
    }, [id, fetch]);

    const handleOnChangFileImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size >= 2000000) {
                alert('Vui lòng chọn file có dung lượng dưới 2MB');
                return;
            }

            setImg(file);
            setLinkPreview(URL.createObjectURL(file));
        }
    };

    const handleChangeChooseAgainImage = () => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Bạn chắc chắn thay ảnh thumbnail của mình?');

        if (!check) return;

        const inputEle = ref.current;

        if (inputEle) {
            inputEle.click();
        }
    };

    const handleValidate = () => {
        let isValid = true;

        const ArrClone = [contentHtml, contentText, titleValue, linkPreview];

        for (let i = 0; i < ArrClone.length; i++) {
            if (!ArrClone[i]) {
                isValid = false;
                alert('Bạn đã nhập thiếu trường !');
                break;
            }
        }

        return isValid;
    };

    const handleSubmit = async () => {
        const check = handleValidate();

        if (!check) return;

        let linkThumbnail = linkPreview;

        setIsLoadingTwo(true);

        if (img) {
            const ResThumbnail = await UploadImageComment({
                file: img,
                upload_preset: process.env.REACT_APP_UPLOAD_PRESET_COMMENT,
            });

            if (_.isEmpty(ResThumbnail)) {
                alert('Đã xảy ra lỗi khi đăng tải ảnh lên!');
                return;
            }

            linkThumbnail = ResThumbnail.url;
        }

        const dataBuild = {
            title: titleValue,
            contentHTML: contentHtml,
            contentTEXT: contentText,
            thumbnail: linkThumbnail,
            time: details.time,
            id: details.id,
        };

        const Res = await UpdatePostEdit(dataBuild);

        setIsLoadingTwo(false);

        if (Res && Res.errCode === 0) {
            toast.success('🦄 Bạn đã cập nhật thành công bài viết của mình^^', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setImg(null);
            fetch();
        } else {
            console.error(Res.msg);
            alert(Res.msg);
        }
    };

    return (
        <>
            {isLoading && <Loadingske />}
            {isLoadingTwo && <PacmanLoaderLoading />}
            <div className="edit-post-wrapper pb-4">
                <div className="container">
                    {!_.isEmpty(details) && (
                        <>
                            <div className="img">
                                <input
                                    ref={ref}
                                    onChange={(e) => handleOnChangFileImage(e)}
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    hidden
                                />
                                <div
                                    className="render-img"
                                    style={{
                                        backgroundImage: `url('${linkPreview}')`,
                                    }}
                                >
                                    <span onClick={handleChangeChooseAgainImage}>Chọn lại hình ảnh</span>
                                    <div className="overlay"></div>
                                </div>
                            </div>
                            <div className="py-5">
                                <input
                                    onChange={(e) => setTitleValue(e.target.value)}
                                    className="title-jax"
                                    value={titleValue}
                                    placeholder="Tiêu đề của bạn"
                                />
                            </div>
                            <div className="mt-4 px-2 mark-down-wrapper">
                                <span className="notify-save">Đã lưu</span>
                                <MdEditor
                                    value={contentText ? contentText : ''}
                                    style={{ height: '500px' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    placeholder="Nhập thông tin ở đây..."
                                    onImageUpload={handleImageUpload}
                                />
                                <button onClick={handleSubmit} className="d-block mx-3 ms-auto my-3 btn btn-primary">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </>
                    )}
                    {!isValid && (
                        <p className="pt-5 text-center">
                            <strong>There is no access to this resource or the resource does not exist!</strong>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default EditPost;
