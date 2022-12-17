import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PropTypes from 'prop-types';

ModalWrapper.propTypes = {
    bodyRender: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
    handleToggle: PropTypes.func,
    handleSubmit: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    centered: PropTypes.bool,
    size: PropTypes.string,
    isSubmit: PropTypes.bool,
};

ModalWrapper.defaultProps = {
    isOpen: false,
    handleToggle: () => {},
    handleSubmit: () => {},
    title: 'Modal Title',
    className: '',
    centered: false,
    bodyRender: `<div></div>`,
    size: 'lg',
    isSubmit: true,
};

function ModalWrapper({ size, isOpen, isSubmit, handleToggle, centered, handleSubmit, title, bodyRender, className }) {
    return (
        <div>
            <Modal size={size} centered={centered} isOpen={isOpen} toggle={handleToggle} className={className}>
                <ModalHeader toggle={handleToggle}>{title}</ModalHeader>
                <ModalBody>{bodyRender}</ModalBody>
                <ModalFooter>
                    {isSubmit && (
                        <Button color="primary" onClick={handleSubmit}>
                            Do Something
                        </Button>
                    )}
                    <Button color="secondary" onClick={handleToggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalWrapper;
