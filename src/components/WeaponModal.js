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
        <button className="btn-apex" onClick={handleOpen}>
            {props.weapon.weaponName}
        </button>

        <Modal className='modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className='modal-header' closeButton>
            <Modal.Title>{props.weapon.weaponName} │││ {props.weapon.weaponType}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
            <img className='responsiveImage' src={`http://localhost:5001${props.weapon.weaponImg}`} crossOrigin='anonymous' alt={'Fetching...'}/>
            DPS: {props.weapon.stats.dps} <br/>
            RPM: {props.weapon.stats.rpm} <br/>
            Ammo Type: {props.weapon.stats.ammoType.charAt(0).toUpperCase() + props.weapon.stats.ammoType.slice(1)}
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <button className={'btn-apex'} onClick={handleClose}>
                    Close
                </button>
                {!props.isFavorite && <button className={'btn-apex'} onClick={() => props.onFavorite(props.weapon)}>
                    Favorite
                </button>}
                {props.isFavorite && <button className={'btn-apex'} onClick={() => props.onFavorite(props.weapon)}>
                    Unfavorite
                </button>}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default WeaponModal;