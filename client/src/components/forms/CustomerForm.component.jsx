import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../../util/mutations';
import { BootSelect } from './';


const CustomerForm = ({ customerForm, setCustomerFormData, handleSubmit, loading, error }) => {
    const handleCustomerInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerFormData({ ...customerForm, [name]: value });
    }





  return (
    <Form onSubmit={handleSubmit} >
        <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>
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
            justifyContent: "flex-end",
            width: "100%", 
            height: "100%",
            position: "relative",
            bottom: "0",
            left: "0",
            right: "0",

        }}>
        <Button type="submit" disabled={loading} style={{
            flex: "0 1 40%",
            boxShadow: "2px 2px 3px black",
            borderRadius: "0 0 3px 0",
            margin: "8px",
        }}>
            <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>
        </Button>
            {error && <Alert>Error creating customer</Alert>}
        </Form.Group>

                


    </Form>



  );
};

export default CustomerForm;
