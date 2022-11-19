import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import PacmanLoaderLoading from '../../../../../../../../../../components/loading/PacmanLoader';
import { GetAllPostManage, UpdateStatusPost } from '../../../../../../../../../../services';

const limit = 3;

function AllPost() {
    const [page, setPage] = useState(1);
    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isNextPage, setNextPage] = useState(false);

    const history = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);

            const Res = await GetAllPostManage(limit, page);

            setIsLoading(false);

            if (Res && Res.errCode === 0) {
                setListPost((prev) => {
                    return [...prev, ...Res.data];
                });
                setNextPage(Res.isValidNextPage);
            } else {
                alert(Res.msg);
            }
        };

        fetch();
    }, [page]);

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
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

    const handleInputChangeSelect = async (id, e) => {
        // eslint-disable-next-line no-restricted-globals
        const check = confirm('Bạn chắc chắn thực hiện thay đổi?');

        if (!check) return;

        setIsLoading(true);

        const Res = await UpdateStatusPost(id, e.target.value);

        setIsLoading(false);

        if (Res && Res.errCode === 0) {
            if (!_.isEmpty(Res.post)) {
                setListPost((prev) => {
                    // eslint-disable-next-line array-callback-return
                    const Change = prev.map((item) => {
                        if (item.id === Res.post.id) {
                            item = Res.post;
                        }

                        return item;
                    });

                    return [...Change];
                });
                alert('Bạn đã sửa đổi trạng thái thành công !');
            }
        } else {
            alert(Res.msg);
        }
    };

    const handleRedirect = (link) => {
        history(link);
    };

    return (
        <>
            {isLoading && <PacmanLoaderLoading />}
            <div className="all-post-wrapper">
                <div className="container">
                    <p className="m-0 py-2">
                        <strong>Tất cả bài viết của bạn</strong>
                    </p>
                    <div className="py-1">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">#</th>
                                    <th scope="col">Tên bài viết</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Hành động</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPost &&
                                    listPost.length > 0 &&
                                    listPost.map((item, index) => (
                                        <tr className="text-center" key={item.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td className="text-jax-title">
                                                <p>{item.title}</p>
                                            </td>
                                            <td>{handleFormatcount(item.countLike)}</td>
                                            <td>
                                                {new Date(+item.time).toLocaleDateString('en', {
                                                    timeZone: 'Asia/Ho_Chi_Minh',
                                                })}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleRedirect(
                                                            `/dashboard/post/manage-posts/edit?id=${item.id}`,
                                                        )
                                                    }
                                                    title="Chỉnh sửa bài viết"
                                                    className="btn btn-primary mx-1"
                                                >
                                                    <i className="bi bi-blockquote-right"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <select
                                                    value={item.isPublic}
                                                    onChange={(e) => handleInputChangeSelect(item.id, e)}
                                                >
                                                    <option value="1">Công khai</option>
                                                    <option value="0">Riêng tư</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {isNextPage && (
                            <div className="d-flex justify-content-center align-items-center">
                                <button onClick={handleNextPage} className="btn btn-primary m-2">
                                    Xem thêm
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllPost;
