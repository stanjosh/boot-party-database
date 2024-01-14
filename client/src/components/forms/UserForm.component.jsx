import React, {useState} from 'react';
import { Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap';


const UserForm = ({ userData }) => {
    const [formState, setFormState] = useState(userData);

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState,  [name]: value });

    };

    const handleAdmin = (event) => {
        const { name, checked } = event.target;
        setFormState({ ...formState,  [name]: checked ? true : false });

    };

    const handleGuestChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, 
            guestProfile: { 
                ...formState.guestProfile, 
                [name]: value } 
            });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <FloatingLabel label="email" className="mb-3">
                <Form.Group controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="email" name="email" value={formState.email} onChange={handleChange} />
                    
                </Form.Group>
                </FloatingLabel>

                <FloatingLabel label="name" className="mb-3">
                <Form.Group controlId="formBasicName">
                
                    <Form.Control type="text" placeholder="name" name="name" value={formState.name} onChange={handleChange} />

                </Form.Group>
                </FloatingLabel>

                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center"}}>
                <InputGroup className="mb-3">
                <div style={{minWidth: "25%", textAlign: "center"}}>
                <Form.Label htmlFor="admin" >admin
                <Form.Group controlId="formBasicAdmin">

                    <Form.Check type="checkbox" name="admin" onChange={handleAdmin} value={formState.admin} checked={formState.admin} />

                </Form.Group>
                </Form.Label>
                </div>

                <FloatingLabel label="partner" className="mb-3" >
                <Form.Group controlId="formBasicPartner" >
                
                    <Form.Control type="text" placeholder="partner" disabled={!formState.admin} name="partner" value={formState.partner} onChange={handleChange} />

                </Form.Group>
                </FloatingLabel>
                </InputGroup>

                <FloatingLabel label="phone" className="mb-3">
                    <Form.Group controlId="formBasicPhone">
                    
                        <Form.Control type="text" placeholder="phone" name="phone" value={formState.guestProfile?.phone} onChange={handleGuestChange} />
                        <Form.Control type="hidden" name="email" value={formState.email} onChange={handleGuestChange} />

                    </Form.Group>
                </FloatingLabel>


                </div>


                    



       
                
                <Button type="submit">submit</Button>

            </Form>
        </div>
    );
};

export default UserForm;
