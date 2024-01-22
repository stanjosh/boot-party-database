import React, { useState } from 'react';
 import { Card, Button, Modal } from 'react-bootstrap';
import { PartnerForm } from '../forms';

const PartnerDisplay = ({partnerData, admin}) => {
    const [show, setShow] = useState(false);

    const onHide = () => {
        setShow(false);
    }



    return (
        <div style={{flex: "1 0 400px"}}>
            <Card onClick={() => setShow(true)}>
                <Card.Body>
                    <Card.Title>{partnerData?.name}</Card.Title>
                    
                    <Card.Text>
                        <div>Users: {partnerData?.users?.length}</div>
                        <div>Events: {partnerData?.events?.length}</div>
                    </Card.Text>
                    
                </Card.Body>
            </Card>
            
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton className='bg-dark text-light'>
                    <Modal.Title className='bg-dark text-light'>Edit Partner</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-light'>
                    <PartnerForm partnerData={partnerData} onHide={onHide} admin/>
                </Modal.Body>
            </Modal>



        </div>       
    );
};

export default PartnerDisplay;
