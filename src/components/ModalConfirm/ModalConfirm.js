import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';

ModalConfirm.prototype = {
    show: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

function ModalConfirm({ show, handleToggle, handleSubmit, id }) {
    return (
        <>
            <Modal className="customize-modal-confirm" show={show} onHide={handleToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <b className="jsx-hsd-title">Bạn chắc chắn với hành động của mình</b>
                    </Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleToggle}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit(id)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
