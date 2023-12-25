import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EVENT_REMOVE_SIGNUP } from '../../util/mutations';
import { BootSelect } from './';


const CustomerForm = ({ customerForm, setCustomerFormData, handleSubmit, loading, error, formTitle, submitText, deleteId }) => {
    const [removeGuest, { loading: removeGuestLoading, error: removeGuestError }] = useMutation(EVENT_REMOVE_SIGNUP);

    const handleCustomerInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerFormData({ ...customerForm, [name]: value });
    }


    const handleRemoveGuest = async (e) => {
        e.preventDefault();
        console.log('CLICKED DELETE ' + e.target.dataset.customerid);
        const event = await removeGuest({
            variables: {
                eventId: eventId,
                customerId: e.target.dataset.customerid,           
               
            }
        })
        .then((res) => {
          // Handle success
          console.log('Joined party:', res.data);
          setJoinFormData({ name: '', email: '', phone: '' });
          setSuccess(true);
          
          })
          .catch((err) => {
          // Handle error
          console.error('Error joining party:', err);
          });
        }



  return (
    <Form onSubmit={handleSubmit} >
        {formTitle || <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>}
        <Form.Group controlId="formCustomerInfo" style={{marginRight: "15px", marginLeft: "15px", }} >
            <Form.Control
                type="text"
                placeholder='your name'
                name="name"
                value={customerForm.name}
                onChange={handleCustomerInputChange}
                required
                className='mb-3'
            />
            <Form.Control
                type="text"
                placeholder='your email'
                name="email"
                value={customerForm.email}
                onChange={handleCustomerInputChange}
                required
                className='mb-3'
            />
            <Form.Control
                type="text"
                placeholder='your phone number (optional)'
                name="phone"
                value={customerForm.phone}
                onChange={handleCustomerInputChange} 
                className='mb-3'
            />
            </Form.Group>
        <Form.Group >
            <BootSelect customerForm={customerForm} handleCustomerInputChange={handleCustomerInputChange} />
        </Form.Group>

        
        <Form.Group controlId="formSubmit" style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%", 
            maxWidth: "380px",
            height: "100%",
            position: "relative",
            bottom: "0",
            left: "0",
            right: "0",

        }}>

        {deleteId && <Button 
                type="button" 
                data-customerid={deleteId} 
                onClick={handleRemoveGuest}
                disabled={removeGuestLoading} style={{
                    flex: "0 1 40%",
                    boxShadow: "2px 2px 3px black",
                    borderRadius: "0 0 3px 0",
                    margin: "8px",
            }}>
                delete
            </Button> }


        <Button type="submit" disabled={loading} style={{
            flex: "0 1 40%",
            boxShadow: "2px 2px 3px black",
            borderRadius: "0 0 3px 0",
            margin: "8px",
        }}>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>}
        </Button>
            {error && <Alert>Error creating customer</Alert>}
        </Form.Group>

                


    </Form>



  );
};

export default CustomerForm;
