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

        <UserForm userData={userData} show={show} onHide={() => setShow(false)} admin/>


        </>
    );
};

export default UserDisplay;
  