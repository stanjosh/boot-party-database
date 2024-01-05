import { useEffect, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER, EVENT_ADD_SIGNUP } from '../../util/mutations';
import { RemoveGuestButton } from './buttons';
import { BootSelect } from '.';
import { useForm } from '../../util/hooks';
import SizeSelect from './bootSelect/SizeSelect.component';

const CustomerForm = ({ customer, eventId, formTitle, submitText, success, updating, joining, admin }) => {
    const [updateCustomer, { loading, error }] = useMutation(UPDATE_CUSTOMER);
    const [addGuest, { loading: addGuestLoading, error: addGuestError }] = useMutation(EVENT_ADD_SIGNUP);
   
    
    

    const customerFormRef = useRef(null)
    const { formData, handleInputChange, handleSubmit, setFormData } = useForm({
            name: customer?.name,
            email: customer?.email,
            phone: customer?.phone,
            bootName: customer?.bootName,
            shoeWidth: customer?.shoeWidth ,
            shoeSize: customer?.shoeSize,
            bootSku: customer?.bootSku,
            bootImgSrc: customer?.bootImgSrc,
        },
        (formData) => writeCustomer(formData)
    );
    

    useEffect(() => {
        
    })

    console.log(formData)

    const { name, email, phone, shoeWidth, shoeSize, bootImgSrc, bootName, bootSku } = formData;

    const writeCustomer = async (formData) => {
        
        await updateCustomer({
            variables: {
                customerInput: { ...formData },           
            }
        })
        .then((res) => {
    
            console.log('Customer created: ', res.data);
            localStorage.setItem('customer', JSON.stringify(res.data.editCustomer));
            if (eventId && joining) {
                addGuestToParty(res.data.updateCustomer._id);
            } else {
                success(res.data.updateCustomer._id);
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
    <Form onSubmit={handleSubmit} ref={customerFormRef} className='main-form'>
        
        {formTitle 
            ? <h4 className='formTitle'>{formTitle}</h4> 
            : <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>
        }

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
            <div>You can pick your boots later if you're not sure.</div>
            <SizeSelect formData={{ shoeWidth, shoeSize, bootSku }} handleInputChange={handleInputChange} />
            
            <BootSelect formData={{ shoeWidth, shoeSize, bootImgSrc, bootName, bootSku}} setFormData={setFormData} scrollBackTo={scrollto} />
        </Form.Group>

        <div style={{display: "flex", flexWrap: "nowrap", justifyContent:"flex-end", width: "100%"}}>
        
        { (admin && eventId && customer?._id) 
            ? <RemoveGuestButton customerId={customer?._id} eventId={eventId}/> 
            : null
        }
        
        <Form.Group controlId="formSubmit"  style={{flex: "0 1 50%", padding: "5px"}}>
            <Button type="submit" disabled={ loading } className='formButton'>
                {submitText 
                    ? submitText
                    : <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>
                }
            </Button>
        </Form.Group>
        
        

        </div>
        {error && <Alert variant='danger'>Error updating customer</Alert>}
                


    </Form>



  );
};

export default CustomerForm;
