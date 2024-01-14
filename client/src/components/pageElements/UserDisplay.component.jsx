import React, { useState } from 'react';
import { GuestForm } from '../forms';
import { Card, Button, Modal } from 'react-bootstrap';



const UserDisplay = ( { userData, admin } ) => {
    
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
                    

                    <Button className='formButton' href={`${window.location.origin}/admin/party/${userData?._id}`} >Admin</Button>
                    </div>   
                        

                    

                </li>


            </ul>

        </div>

        

        </>
    );
};

export default UserDisplay;
  