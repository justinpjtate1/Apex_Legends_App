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
            <Modal.Title>{props.weapon.weaponName} │││ {props.weapon.weaponType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <img className='responsiveImage' src={`http://localhost:5001${props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
            DPS: {props.weapon.stats.dps} <br/>
            RPM: {props.weapon.stats.rpm} <br/>
            Ammo Type: {props.weapon.stats.ammoType.charAt(0).toUpperCase() + props.weapon.stats.ammoType.slice(1)}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="outline-primary" onClick={() => props.onFavorite(props.weapon)}>
                Favorite
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default WeaponModal;