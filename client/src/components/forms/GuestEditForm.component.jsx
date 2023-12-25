import React, { useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { CustomerForm } from '../forms';
import { useMutation } from '@apollo/client';
import { EDIT_CUSTOMER } from '../../util/mutations';


const GuestEditForm = ({ guest, eventId, index }) => {
    const [customerJoinForm, setJoinFormData] = useState({ name: guest.name, email: guest.email, phone: guest.phone, bootName: guest.bootName});
    const [editGuest, { loading: editGuestLoading, error: editGuestError }] = useMutation(EDIT_CUSTOMER);

    const [success, setSuccess] = useState(false);

    

    console.log(customerJoinForm);

       
    
    
        const handleEditGuest = async (e) => {
            e.preventDefault();
            await editGuest({
              variables: {
                  customerId: eventId,
                  customerInput: { ...customerJoinForm },           
                 
              }
          })
          .then((res) => {
          // Handle success
          console.log('Joined party:', res.data);
          setSuccess(true);
          
          })
          .catch((err) => {
          // Handle error
          console.error('Error joining party:', err);
          });
         }


    return (
       
        <Container key={guest._id} style={{backgroundColor: "aliceblue", padding: "2px", margin: "2px", borderRadius: "3px"}}>

        <CustomerForm 
            customerForm={ customerJoinForm } 
            setCustomerFormData={ setJoinFormData } 
            handleSubmit={ handleEditGuest }
            loading={ editGuestLoading } 
            error={ editGuestError } 
            formTitle={<h4 style={{fontSize: "2cqh", color: "var(--alviesDarkBlue"}}>guest {index}</h4>}
            submitText={'edit'}
            deleteId={guest._id}
        />   
            
            {success && <Alert >edited! </Alert>}
        </Container>
    );
};

export default GuestEditForm;
