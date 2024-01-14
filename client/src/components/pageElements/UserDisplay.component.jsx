import React, { useState } from 'react';
import { UserForm } from '../forms';
import { Card, Button, Modal } from 'react-bootstrap';



const UserDisplay = ( { userData, admin } ) => {
    
    const [show, setShow] = useState(false);

    return (

        
        <>
      
        <div style={{ backgroundColor: "aliceblue"}}> 
            <ul>
                <li>
                    
                    <div>
                    name: {userData?.guestProfile?.name} <br />
                    email: {userData?.email} <br />
                    partner org: {userData?.partner} <br />
                    admin?: {userData?.admin ? 'yes' : 'no'} <br />
                    

                    {admin ? <Button className='formButton' onClick={() => setShow(true)} >Admin</Button> : null}
                    </div>   
                        

                    

                </li>


            </ul>

        </div>

        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton className='bg-dark text-light'>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark text-light'>
                <UserForm userData={userData} formTitle={'edit user info'}/>
             
            </Modal.Body>

        </Modal>

        </>
    );
};

export default UserDisplay;
  