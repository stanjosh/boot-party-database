import React, {useState} from 'react';
import { Form, FloatingLabel, InputGroup, Button, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_PARTNERS } from '../../util/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../util/mutations';

const UserForm = ({ userData }) => {
    const [formState, setFormState] = useState({
        email: userData.email,
        name: userData.name,
        admin: userData.admin,
        partner: userData.partner?._id,
    });

    const [guestProfile, setGuestProfile] = useState({
        phone: userData.guestProfile?.phone,
        email: userData.email,
    });

    const { data : partnersData, loading, error } = useQuery(QUERY_PARTNERS);
    
    const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER);



    const handleAdmin = (event) => {
        const { name, checked } = event.target;
        setFormState({ ...formState,  [name]: checked ? true : false });

    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, 
                [name]: value 
            });

    };

    const handleGuestChange = (event) => {
        const { name, value } = event.target;
        setGuestProfile({ ...guestProfile,
                [name]: value 
        });

    };



    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({
            variables: { 
                userId: userData._id,
                userInput : {...formState},
                guestInput: {...guestProfile}
            }
        })
        .then((res) => {
            console.log('User updated: ', res.data);
            localStorage.setItem('user', JSON.stringify(res.data.updateUser));
            window.location.reload();
        })
        .catch((err) => {
            alert('Error updating user:', err);
            console.error('Error updating user:', err);
        });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <FloatingLabel label="email" className="mb-3">
                <Form.Group controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="email" name="email" value={formState.email} onChange={handleUserChange} />
                    
                </Form.Group>
                </FloatingLabel>

                <FloatingLabel label="name" className="mb-3">
                <Form.Group controlId="formBasicName">
                
                    <Form.Control type="text" placeholder="name" name="name" value={formState.name} onChange={handleUserChange} />

                </Form.Group>
                </FloatingLabel>

                <FloatingLabel label="phone" className="mb-3">
                    <Form.Group controlId="formBasicPhone">
                    
                        <Form.Control type="text" placeholder="phone" name="phone" value={formState.guestProfile?.phone} onChange={handleGuestChange} />
                        <Form.Control type="hidden" name="email" value={formState.email} onChange={handleGuestChange} />

                    </Form.Group>
                </FloatingLabel>
            
                
                <Form.Group controlId="formBasicAdmin" className='mb-3' style={{display: "flex"}}>
                    <Form.Label >admin
                    <Form.Check type="checkbox" name="admin" onChange={handleAdmin} value={formState.admin} checked={formState.admin} inline />
                    </Form.Label>
                    <Form.Select type="text" placeholder="partner" disabled={!formState.admin} name="partner" value={formState.partner} size="sm" onChange={handleUserChange} style={{width: "50%", backgroundColor: !formState?.admin ? "black" : null}} >
                        {partnersData?.findAllPartners?.map((partner, index) => <option key={index} value={partner._id} style={{width:"100%"}}>{partner.name}<Image src={partner.imgSrc}/></option>)}
                    </Form.Select>

                </Form.Group>
            

                <Form.Group controlId="formBasicSubmit">
                <Button type="submit">submit</Button>
                </Form.Group>

            </Form>
        </div>
    );
};

export default UserForm;
