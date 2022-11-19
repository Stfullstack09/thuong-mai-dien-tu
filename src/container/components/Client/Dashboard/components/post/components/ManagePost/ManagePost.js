import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import AllPost from './components/AllPost';
import EditPost from './components/EditPost';

function ManagePost() {
    return (
        <div className="manage-post-wrapper">
            <div className="py-4">
                <h2 className="text-center fw-bold">Quản lí bài viết</h2>
            </div>
            <div className="py-2">
                <div className="container">
                    <header>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'active btn btn-success px-1 py-1 my-2 mx-1'
                                    : 'px-1 btn-primary btn py-1 my-2 mx-1'
                            }
                            end
                            to="/dashboard/post/manage-posts"
                        >
                            Quản lí sản phẩm
                        </NavLink>
                    </header>
                </div>
            </div>
            <div className="py-2 container">
                <span className="border-jax-px"></span>
            </div>
            <Routes>
                <Route path="/" element={<AllPost />} />
                <Route path="/edit" element={<EditPost />} />
            </Routes>
        </div>
    );
}

export default ManagePost;
