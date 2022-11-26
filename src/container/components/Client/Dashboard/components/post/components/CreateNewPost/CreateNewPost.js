import React from 'react';
import { useEffect, useState, createRef, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';

import { CreateNewPostServices, UploadImageComment } from '../../../../../../../../services';
import Loadingske from '../../../../../../../../components/loadingSkeloton/Loadingske';
import PacmanLoaderLoading from '../../../../../../../../components/loading/PacmanLoader';
import { toast } from 'react-toastify';

function CreateNewPost() {
    const [valueTitle, setValueTitle] = useState('');
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [linkPreview, setLinkPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);

    const contentEditable = createRef();
    const ref = useRef(null);
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    useEffect(() => {
        if (valueTitle.length > 0) {
            document.title = valueTitle;
        } else {
            document.title = 'UNOMO Hãy Tạo Bài Viết Để Được Nhiều Người Biết Đến';
        }
    }, [valueTitle]);

    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const handleUnload = (e) => {
        e.preventDefault();
        e.returnValue = 'sdsdsd';
        console.log('hey');
    };

    const handleChangeTitle = (e) => {
        setValueTitle(e.target.value);
    };

    const handleEditorChange = ({ html, text }) => {
        setContentHtml(html);
        setContentText(text);
    };

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

    const handleOnChangFileImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size >= 1500000) {
                alert('Vui lòng chọn file có dung lượng dưới 1.5MB');
                return;
            }

            setThumbnail(file);
            setLinkPreview(URL.createObjectURL(file));
            setIsOpen(true);
        }
    };

    const handleHideShowLightBox = () => {
        setIsOpenLightBox(!isOpenLightBox);
    };

    const handleClickChooseAgainImg = (e) => {
        e.stopPropagation();

        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Bạn có chắc chắn muốn chọn lại ảnh chứ?');

        if (!check) return;

        URL.revokeObjectURL(linkPreview);

        setLinkPreview('');
        setThumbnail(null);
        setIsOpen(false);

        const inputEle = ref.current;

        if (inputEle) {
            inputEle.value = null;
        }
    };

    const handleClickChooseImage = () => {
        const inputElement = ref.current;

        if (inputElement) {
            inputElement.click();
        }
    };

    const handleValidate = () => {
        let isValid = true;

        const cloneArr = [valueTitle, contentHtml, contentText, thumbnail];

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
        const check = handleValidate();

        if (!check) return;

        // eslint-disable-next-line no-restricted-globals
        const checkConfirm = confirm('Bạn chắc chắn xuất bản bài viết?');

        if (!checkConfirm) return;

        setIsLoading(true);
        setLoadingTwo(true);

        const ResThumbnail = await UploadImageComment({
            file: thumbnail,
            upload_preset: process.env.REACT_APP_UPLOAD_PRESET_COMMENT,
        });

        if (_.isEmpty(ResThumbnail)) {
            alert('Đã xảy ra lỗi khi đăng tải ảnh lên!');
            return;
        }

        const dataBuild = {
            title: valueTitle,
            contentHTML: contentHtml,
            contentTEXT: contentText,
            thumbnail: ResThumbnail.url,
            time: new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Ho_Chi_Minh' })).getTime(),
        };

        const Res = await CreateNewPostServices(dataBuild);

        setIsLoading(false);
        setLoadingTwo(false);

        if (Res && Res.errCode === 0) {
            toast.success('🦄 Bạn đã tạo thành công bài viết !', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setValueTitle('');
            setContentHtml('');
            setContentText('');

            URL.revokeObjectURL(linkPreview);

            setLinkPreview('');
            setThumbnail(null);
            setIsOpen(false);

            const inputEle = ref.current;

            if (inputEle) {
                inputEle.value = null;
            }
        }
    };

    return (
        <>
            {isLoading && <Loadingske />}
            {loadingTwo && <PacmanLoaderLoading />}
            <div className="create-new-post-wrapper">
                <h2 className="fw-bold text-center py-4">Tạo bài viết hãy viết những rì bạn thấy thỏa mái</h2>
                <div className="body-content py-3">
                    <input
                        onChange={(e) => handleOnChangFileImage(e)}
                        type="file"
                        ref={ref}
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                    />
                    <div className="ps-3 py-4 pe-4 jax-image-wrapper">
                        {!isOpen ? (
                            <div className="jax-sd-parents" onClick={handleClickChooseImage}>
                                <div className="overlay-filter"></div>
                                <div className="select-image">
                                    <span>Choose img</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={handleHideShowLightBox}
                                className="jax-sd-parents cursor-pointer"
                                style={{
                                    backgroundImage: `url('${linkPreview}')`,
                                }}
                            >
                                <div className="select-image">
                                    <span onClick={(e) => handleClickChooseAgainImg(e)}>Chọn lại hình ảnh</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {isOpenLightBox && (
                        <Lightbox onCloseRequest={() => handleHideShowLightBox()} mainSrc={linkPreview} />
                    )}
                    <ContentEditable
                        data-empty-text="Tiêu đề"
                        className={valueTitle.length > 0 ? 'title-post empty' : 'title-post'}
                        innerRef={contentEditable}
                        html={valueTitle} // innerHTML of the editable div
                        disabled={false} // use true to disable editing
                        onChange={handleChangeTitle} // handle innerHTML change
                        tagName="article" // Use a custom HTML tag (uses a div by default)
                    />
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
                            Xuất Bản
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateNewPost;
