import { useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EDIT_CUSTOMER } from '../../util/mutations';
import { BootSelect } from '.';
import { useForm } from '../../util/hooks';

const CustomerForm = ({ customer, formTitle, submitText, success }) => {
    const [editCustomer, { loading, error }] = useMutation(EDIT_CUSTOMER);
   
    
    

    const customerFormRef = useRef(null)
    const { formData, handleInputChange, handleSubmit } = useForm({
            name: customer?.name || '',
            email: customer?.email || '',
            phone: customer?.phone || '',
            bootName: customer?.bootName || '',
            shoeWidth: customer?.shoeWidth || '',
            shoeSize: customer?.shoeSize || '',
            bootSku: customer?.bootSku || '',
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
            success();
          
        })
        .catch((err) => {
            alert('Error creating customer:', err);
            console.error('Error creating customer:', err);
         
        });
    
    };

 

    const scrollto = () => customerFormRef.current.scrollIntoView()    

    // const handleRemoveGuest = async (e) => {
    //     e.preventDefault();
    //     console.log('CLICKED DELETE ' + e.target.dataset.customerid);
    //     const event = await removeGuest({
    //         variables: {
    //             eventId: eventId,
    //             customerId: e.target.dataset.customerid,           
               
    //         }
    //     })
    //     .then((res) => {
    //       // Handle success
    //       console.log('Joined party:', res.data);
    //       setJoinFormData({ name: '', email: '', phone: '' });
    //       setSuccess(true);
          
    //       })
    //       .catch((err) => {
    //       // Handle error
    //       console.error('Error joining party:', err);
    //       });
    //     }



  return (
    <Form onSubmit={handleSubmit} ref={customerFormRef} >
        {formTitle || <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>}
        <Form.Group controlId="formCustomerInfo" style={{marginRight: "15px", marginLeft: "15px", }} >
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

        {/* {deleteId && <Button 
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
            </Button> } */}


        <Button type="submit" disabled={ loading } style={{
            flex: "0 1 40%",
            boxShadow: "2px 2px 3px black",
            borderRadius: "0 0 3px 0",
            margin: "8px",
        }}>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>}
        </Button>
            {error && <Alert>Error updating customer</Alert>}
        </Form.Group>

                


    </Form>



  );
};

export default CustomerForm;
