import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { EVENT_ADD_SIGNUP } from '../../util/mutations';
import { BootSelect } from './';


const JoinForm = () => {
    const { eventId } = useParams();
    const [ customerForm, setCustomerFormData ] = useState({ name: '', email: '', phone: '' });
    const [ joinParty, { loading, error }] = useMutation(EVENT_ADD_SIGNUP);
    const [success, setSuccess] = useState(false);
    //const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await joinParty({
            variables: {
                eventId: eventId,
                customerInput: { ...customerForm },           
               
            }
        })
        .then((res) => {
        // Handle success
        console.log('Event created:', res.data);
        setCustomerFormData({ name: '', email: '', phone: '' });
        setSuccess(true);
        
        })
        .catch((err) => {
        // Handle error
        console.error('Error joining event:', err);
        });

};

    const handleCustomerInputChange = (e) => {
        setSuccess(false);
        const { name, value } = e.target;
        setCustomerFormData({ ...customerForm, [name]: value });
        //checkValidity();
        console.log(customerForm);
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

    <Form onSubmit={handleSubmit} style={{backgroundColor: "aliceblue"}}>
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
        <Form.Group className="mb-3" controlId="formCustomerInfo">
            <BootSelect customerForm={customerForm} handleCustomerInputChange={handleCustomerInputChange} />
        </Form.Group>
    <Form.Group className="mb-3" controlId="formSubmit">
        <Button type="submit" disabled={loading}>
            Join the Party!
        </Button>
        
        </Form.Group>
        {success && <Alert >Thanks for joining! <Link to={`/party/${eventId}`}>Back to the party!</Link></Alert>}
        {error && <Alert>Error joining! <Link to={'mailto:holler@alvies.com'}>get at us</Link></Alert>}
    </Form>

  );
};

export default JoinForm;
