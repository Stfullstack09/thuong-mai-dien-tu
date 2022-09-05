import PropTypes from 'prop-types';

import './Overlay.scss';
Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

function Overlay({ children, toggle = () => {}, isOpen = false }) {
    return (
        <div className={isOpen && 'overlay-wrapper'} onClick={toggle}>
            {children}
        </div>
    );
}

export default Overlay;
