import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleLeft}
            className={className}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

export function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
            icon={faAngleRight}
            className={className}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}
