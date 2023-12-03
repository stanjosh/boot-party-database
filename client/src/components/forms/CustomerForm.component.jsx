import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_CUSTOMER } from '../../util/mutations';


const CustomerForm = ({ setCurrentStep }) => {
    const [customerForm, setCustomerFormData] = useState('');
    const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER);

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
        console.log(customerForm);
    }




  return (
    <Form onSubmit={handleSubmit}>
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
            onChange={handleCustomerInputChange} />
        </Form.Group>
    <Form.Group className="mb-3" controlId="formSubmit">
      <Button type="submit" disabled={loading}>
        next: where and when
      </Button>
      {error && <p>Error creating customer</p>}
      </Form.Group>
    </Form>
  );
};

export default CustomerForm;
