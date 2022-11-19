import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateNewPost from './components/CreateNewPost';
import ManagePost from './components/ManagePost';
import './post.scss';

function Post() {
    return (
        <div className="post-wrapper">
            <Routes>
                <Route path="/create-new-post" element={<CreateNewPost />} />
                <Route path="/manage-posts/*" element={<ManagePost />} />
            </Routes>
        </div>
    );
}

export default Post;
