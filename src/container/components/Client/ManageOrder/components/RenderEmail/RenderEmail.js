import classNames from 'classnames/bind';
import _ from 'lodash';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import styles from '../../ManageOrder.module.scss';
import PacmanLoaderLoading from '../../../../../../components/loading/PacmanLoader';
import { UploadImageComment } from '../../../../../../services';

const cx = classNames.bind(styles);

const RenderEmail = ({ setDataEmail, setContentHtml, dataEmail, setContentText, contentText, data, isLoadingSend }) => {
    const [loading, setIsLoading] = useState(false);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

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

    const handleEditorChange = ({ html, text }) => {
        setContentHtml(html);
        setContentText(text);
    };

    return (
        <>
            {isLoadingSend && <PacmanLoaderLoading />}
            {loading && <PacmanLoaderLoading />}
            <div>
                {!_.isEmpty(dataEmail) ? (
                    <div>
                        <div className="my-2">
                            <p className="my-1">
                                <span>
                                    Email nhận thư : <b>{dataEmail.userData.email}</b>
                                </span>
                            </p>
                            <p className="my-1">
                                <span>
                                    Tên khách hàng :{' '}
                                    <b>{`${dataEmail.userData.firstName} ${dataEmail.userData.lastName}`}</b>
                                </span>
                            </p>
                            <div className="my-2">
                                <button className="btn btn-success my-2" onClick={() => setDataEmail({})}>
                                    Thay đổi khách hàng
                                </button>
                            </div>
                        </div>
                        <MdEditor
                            value={contentText ? contentText : ''}
                            style={{ height: '500px' }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                            placeholder="Nhập thông tin ở đây..."
                            onImageUpload={handleImageUpload}
                        />
                    </div>
                ) : (
                    <>
                        <h4 className={cx('py-2', 'title-modal-body')}>Chọn khách hàng bạn muốn gửi email</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">email</th>
                                    <th scope="col">firstName</th>
                                    <th scope="col">lastName</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((item, index) => {
                                        const id = uuidv4();
                                        return (
                                            <tr key={id}>
                                                {!_.isEmpty(item) ? (
                                                    <>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.userData.email}</td>
                                                        <td>{item.userData.firstName}</td>
                                                        <td>{item.userData.lastName}</td>
                                                        <td>
                                                            <button className="btn" onClick={() => setDataEmail(item)}>
                                                                <i className="bi bi-send-check"></i>
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td className="text-center" colSpan={5}>
                                                        Có một chút lỗi xảy ra với dữ liệu của bạn
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan={5}>
                                            Có một chút lỗi xảy ra với dữ liệu của bạn
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
};

export default RenderEmail;
