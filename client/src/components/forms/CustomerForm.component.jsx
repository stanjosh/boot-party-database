import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../../util/mutations';
import { BootSelect } from './';


const CustomerForm = ({ setCurrentStep }) => {
    const [customerForm, setCustomerFormData] = useState({});
    const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER);
    //const [validated, setValidated] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(customerForm);
        await createCustomer({
            variables: {
                customerInput: { ...customerForm },           
               
            }
        })
        .then((res) => {
        // Handle success
        console.log('Event created:', res.data);
        localStorage.setItem('customer', JSON.stringify(res.data.createCustomer));
        setCurrentStep('stepB');
        })
        .catch((err) => {
        // Handle error
        console.error('Error creating event:', err);
        });

};

    const handleCustomerInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerFormData({ ...customerForm, [name]: value });
        //checkValidity();
        //console.log(customerForm);
    }



    // const checkValidity = () => {
    //     const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     const email = String(customerForm.email).trim() !== '' && customerForm.email
    //         .toLowerCase()
    //         .match(emailRegEx);
    //     setValidated((!loading && email))
    //     console.log(validated)
    //     return validated;
    // }


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
            flex: "0 1 50%",
            borderRadius: "0 0 3px 0",
        }}>
            next: where and when
        </Button>
            {error && <Alert>Error creating customer</Alert>}
        </Form.Group>

                


    </Form>



  );
};

export default CustomerForm;
