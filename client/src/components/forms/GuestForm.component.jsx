import { useEffect, useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_GUEST, EVENT_ADD_SIGNUP } from '../../util/mutations';
import { RemoveGuestButton } from './buttons';
import { BootSelect } from '.';

import SizeSelect from './bootSelect/SizeSelect.component';

const GuestForm = ({ guest, eventId, formTitle, submitText, success, updating, joining, admin }) => {
    const [updateGuest, { loading, error }] = useMutation(UPDATE_GUEST);
    const [addGuest, { loading: addGuestLoading, error: addGuestError }] = useMutation(EVENT_ADD_SIGNUP);


    const guestFormRef = useRef(null)
    
    const  [formData, setFormData] = useState({
        name: guest?.name ?? '',
        email: guest?.email ?? '',
        phone: guest?.phone ?? '',
        shoeWidth: guest?.shoeWidth ?? '',
        shoeSize: guest?.shoeSize ?? '',
        bootSku: guest?.bootSku ?? '',
        bootName: guest?.bootName ?? '',
        bootImgSrc: guest?.bootImgSrc ?? '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSelectBoot = (e) => {
        if (e) {
            const { bootsku, bootname, bootimgsrc } = e.currentTarget.dataset;
            setFormData({ ...formData, 
                bootSku: bootsku, 
                bootName: bootname, 
                bootImgSrc: bootimgsrc 
            });
        } else {
            setFormData({ ...formData, 
                bootSku: '', 
                bootName: '', 
                bootImgSrc: '' 
            });

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('GuestForm: ', formData)
        writeGuest(formData);
    }


    console.log(formData)

    const { name, email, phone, shoeWidth, shoeSize, bootImgSrc, bootName, bootSku } = formData;

    const writeGuest = async (formData) => {
        
        await updateGuest({
            variables: {
                guestInput: { ...formData },           
            }
        })
        .then((res) => {
    
            console.log('Guest created: ', res.data);
            localStorage.setItem('guest', JSON.stringify(res.data.editGuest));
            if (eventId && joining) {
                addGuestToParty(res.data.updateGuest._id);
            } else {
                success(res.data.updateGuest._id);
            }
        })
        .catch((err) => {
            alert('Error updating guest:', err);
            console.error('Error updating guest:', err);
         
        });
    
    };

    const addGuestToParty = async (guestId) => {
        await addGuest({
            variables: {
                eventId: eventId,
                guestId: guestId,
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


    const scrollto = () => guestFormRef.current.scrollIntoView()    





  return (
    <Form onSubmit={handleSubmit} ref={guestFormRef} >
        {formTitle 
            ? <h4 style={{color: "aliceblue", marginBottom: "15px", marginTop: "15px", fontSize: "3cqb" }}> {formTitle} </h4>
            : <h1 style={{fontSize: "5cqh" }}>Who are you?</h1>
        }
        <Form.Group controlId="formGuestInfo" >
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

            <SizeSelect formData={{ shoeWidth, shoeSize, bootSku }} handleInputChange={handleInputChange} />
            <BootSelect formData={{ shoeWidth, shoeSize, bootImgSrc, bootName, bootSku}} onSelectBoot={handleSelectBoot} scrollBackTo={scrollto} />
        </Form.Group>

        <div style={{display: "flex", flexWrap: "nowrap", justifyContent:"flex-end", width: "100%"}}>
        { admin && eventId && guest?._id && <RemoveGuestButton guestId={guest?._id} eventId={eventId}/> }
        
        <Form.Group controlId="formSubmit"  style={{flex: "0 1 60%", padding: "5px"}}>
        
        <Button type="submit" disabled={ loading || addGuestLoading } className='formButtom'>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>}
        </Button>
            
        </Form.Group>
        
        

        </div>
        {error && <Alert variant='danger'>Error updating guest</Alert>}
                


    </Form>



  );
};

export default GuestForm;
