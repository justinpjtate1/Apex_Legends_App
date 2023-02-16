import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeactivateAccountModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleOpen = () => {
        setShow(true);
    }

    return(
        <>
        <button className="btn-apex" onClick={handleOpen}>
            Deactivate Account
        </button>

        <Modal className='modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title>Confirm you want to Deactivate</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <button onClick={() => props.deactivateAccount()}>YES</button>
                <button onClick={handleClose}>NO</button>
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default DeactivateAccountModal