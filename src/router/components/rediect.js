import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';

Redirect.propTypes = {
    link: PropTypes.string.isRequired,
};

function Redirect({ link }) {
    return (
        <div>
            <Routes>
                <Route path="*" element={<Navigate to={link || '/'} replace />} />
            </Routes>
        </div>
    );
}

export default Redirect;
