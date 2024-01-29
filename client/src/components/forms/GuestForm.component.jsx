import { useState, useRef } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EVENT_ADD_GUEST } from '../../util/mutations';
import { RemoveGuestButton } from './buttons';
import { BootSelect } from '.';




const GuestForm = ({ guest, eventId, success, show, onHide }) => {
    const [addGuest, { loading, error }] = useMutation(EVENT_ADD_GUEST);
    const guestFormRef = useRef(null)


    const  [formData, setFormData] = useState({

        name: guest?.name || '',
        email: guest?.email || '',
        phone: guest?.phone || '',
        boots : guest?.boots || [],

    });


    

    

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSelectBoot = (e) => {
        const boot = JSON.parse(e.currentTarget.dataset.boot);
        console.log('bootdata', boot);
        
        if (boot) {
            
            setFormData({ ...formData, 
                boots: [...boot],
            });
            console.log('boot selected', formData);
        } else {
            setFormData({ ...formData, 
                boots: [],
            });

        }
    }

    const clearSelectedBoot = () => {
        setFormData({ ...formData, 
            boots: [],
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        writeGuest(formData);

    }


    const { name, email, phone } = formData;

    const writeGuest = async (formData) => {
        
        try {
            await addGuest({
                variables: { eventId, guestInput: formData },
            });
            success();
            setFormData({
                name: '',
                email: '',
                phone: '',
                boots: [],
            });
        } catch (e) {
            console.error(e);
        }
    
    };


    


    const scrollto = () => guestFormRef.current.scrollIntoView()    





  return (
    <Modal show={show} onHide={onHide} >
    <Modal.Header closeButton className='bg-dark text-light'>
      <Modal.Title>add guest</Modal.Title>
    </Modal.Header>
    <Modal.Body  className='bg-dark text-light'>
    
    
    <Form onSubmit={handleSubmit} ref={guestFormRef} >

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
                maxLength={14}
                value={phone.replace(/(\d{3})(\d{3})(\d{4})?/g,'($1)-$2-$3')}
                onChange={handleInputChange} 
                className='mb-3'
            />
            </Form.Group>
        <Form.Group >
            <BootSelect formData={ formData } onSelectBoot={handleSelectBoot} clearSelection={clearSelectedBoot} scrollBackTo={scrollto} />
        </Form.Group>

        <div style={{display: "flex", flexWrap: "nowrap", justifyContent:"flex-end", width: "100%"}}>
        { eventId && guest?._id && <RemoveGuestButton guestId={guest?._id} eventId={eventId}/> }
        
        <Form.Group controlId="formSubmit"  style={{flex: "0 1 60%", padding: "5px"}}>
        
        <Button type="submit" disabled={ !formData.name || !formData.email || loading || !email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) } className='formButtom'>
            JOIN THE PARTY
        </Button>
            
        </Form.Group>
        
        

        </div>
        {error && <Alert variant='danger'>Error updating guest</Alert>}
                


    </Form>
    </Modal.Body>
    <Modal.Footer  className='bg-dark text-light'>
    </Modal.Footer>
  </Modal>



  );
};

export default GuestForm;


