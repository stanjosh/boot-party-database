import { useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EDIT_CUSTOMER, EVENT_ADD_SIGNUP } from '../../util/mutations';
import { RemoveGuestButton } from './buttons';
import { BootSelect } from '.';
import { useForm } from '../../util/hooks';

const CustomerForm = ({ customer, eventId, formTitle, submitText, success, updating, admin }) => {
    const [editCustomer, { loading, error }] = useMutation(EDIT_CUSTOMER);
    const [addGuest, { loading: addGuestLoading, error: addGuestError }] = useMutation(EVENT_ADD_SIGNUP);
   
    
    

    const customerFormRef = useRef(null)
    const { formData, handleInputChange, handleSubmit } = useForm({
            name: customer?.name ?? '',
            email: customer?.email ?? '',
            phone: customer?.phone ?? '',
            bootName: customer?.bootName ?? '',
            shoeWidth: customer?.shoeWidth ?? '',
            shoeSize: customer?.shoeSize ?? '',
            bootSku: customer?.bootSku ?? '',
        },
        (formData) => writeCustomer(formData)
    );
    
    const { name, email, phone, bootName, shoeWidth, shoeSize, bootSku } = formData;

    const writeCustomer = async (formData) => {
        
        await editCustomer({
            variables: {
                customerInput: { ...formData },           
            }
        })
        .then((res) => {
    
            console.log('Customer created: ', res.data);
            localStorage.setItem('customer', JSON.stringify(res.data.editCustomer));
            if (eventId) {
                addGuestToParty(res.data.editCustomer._id);
            } else {
                success();
            }
        })
        .catch((err) => {
            alert('Error creating customer:', err);
            console.error('Error creating customer:', err);
         
        });
    
    };

    const addGuestToParty = async (customerId) => {
        await addGuest({
            variables: {
                eventId: eventId,
                customerId: customerId,
            }
        })
        .then((res) => {
            console.log('Joined party:', res.data);
            localStorage.setItem('event', JSON.stringify(res.data.addSignup));
            success();
        })
        .catch((err) => {
            console.error('Error joining party:', err);
        });
    }


    const scrollto = () => customerFormRef.current.scrollIntoView()    





  return (
    <Form onSubmit={handleSubmit} ref={customerFormRef} >
        {<h4 style={{color: "aliceblue", marginBottom: "15px", marginTop: "15px", fontSize: "3cqb" }}>{formTitle}</h4> || <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>}
        <Form.Group controlId="formCustomerInfo" >
            <Form.Control
                type="text"
                placeholder='name'
                name="name"
                value={name}
                onChange={handleInputChange}
                required
                className='mb-3'
            />
            <Form.Control
                type="text"
                placeholder='email'
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                className='mb-3'
            />
            <Form.Control
                type="text"
                placeholder='phone (optional)'
                name="phone"
                value={phone}
                onChange={handleInputChange} 
                className='mb-3'
            />
            </Form.Group>
        <Form.Group >
            <BootSelect customerData={formData} handleInputChange={handleInputChange} scrollBackTo={scrollto} />
        </Form.Group>

        <div style={{display: "flex", flexWrap: "nowrap", justifyContent:"flex-end", width: "100%"}}>
        { admin && eventId && customer?._id && <RemoveGuestButton customerId={customer?._id} eventId={eventId}/> }
        
        <Form.Group controlId="formSubmit"  style={{flex: "0 1 60%", padding: "5px"}}>
        
        <Button type="submit" disabled={ loading || addGuestLoading } className='formButtom'>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>}
        </Button>
            
        </Form.Group>
        
        

        </div>
        {error && <Alert variant='danger'>Error updating customer</Alert>}
                


    </Form>



  );
};

export default CustomerForm;
