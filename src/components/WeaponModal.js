import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// Found template in technical docs
function WeaponModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleOpen = () => {
        setShow(true);
    }

    return (
        <>
        <Button variant="outline-primary" onClick={handleOpen}>
            {props.weapon.weaponName}
        </Button>

        <Modal className='modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Weapon Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <img className='responsiveImage' src={`http://localhost:5001${props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
            I will not close if you click outside me. Don't even try to press
            escape key.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default WeaponModal;