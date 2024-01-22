import React, { useState } from 'react';
import { UserForm } from '../forms';
import { Card, Button, Modal } from 'react-bootstrap';


const UserDisplay = ( { userData, admin } ) => {
    
    const [show, setShow] = useState(false);

    console.log(userData)
    return (

        
        <div style={{display: "flex"}}>
            <Card style={{flex: "1 1"}}>
                <Card.Body>
                    <Card.Title>{userData?.guestProfile?.name || userData?.email}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{userData?.guestProfile?.email || userData?.email}</Card.Subtitle>
                    <Card.Text>
                        {userData?.admin ? 'admin' : 'user'}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setShow(true)}>edit</Button>
                </Card.Body>
            </Card>
            


        <UserForm userData={userData} show={show} onHide={() => setShow(false)} admin/>


        </div>
    );
};

export default UserDisplay;
  