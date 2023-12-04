import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../../util/mutations';
import { BootCarousel } from '../pageElements/';


const CustomerForm = ({ setCurrentStep }) => {
    const [customerForm, setCustomerFormData] = useState('');
    const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER);
    //const [validated, setValidated] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
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
    <Form onSubmit={handleSubmit} style={{backgroundColor: 'aliceblue', textAlign: 'center', padding: '7px'}}>
            <Form.Group className="mb-3" controlId="formCustomerInfo">
        <Form.Control
            type="text"
            placeholder='your name'
            name="name"
            value={customerForm.name}
            onChange={handleCustomerInputChange}
        />
        <Form.Control
            type="text"
            placeholder='your email'
            name="email"
            value={customerForm.email}
            onChange={handleCustomerInputChange}
        />
        <Form.Control
            type="text"
            placeholder='your phone number (optional)'
            name="phone"
            value={customerForm.phone}
            onChange={handleCustomerInputChange} 
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCustomerInfo" style={{display: 'flex'}}>
        


        
        </Form.Group>

        <Form.Group>
            <BootCarousel customerForm={customerForm} handleCustomerInputChange={handleCustomerInputChange} />
        </Form.Group>


        
        <Form.Group className="mb-3" controlId="formSubmit">
            <Button type="submit" disabled={loading}>
                next: where and when
            </Button>
            {error && <Alert>Error creating customer</Alert>}
        </Form.Group>

                


    </Form>



  );
};

export default CustomerForm;
