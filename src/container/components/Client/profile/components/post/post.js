import { Routes, Route } from 'react-router-dom';
import CreateNewPost from './components/CreateNewPost';
import './post.scss';

function Post() {
    return (
        <div className="post-wrapper">
            <Routes>
                <Route path="/create-new-post" element={<CreateNewPost />} />
            </Routes>
        </div>
    );
}

export default Post;
