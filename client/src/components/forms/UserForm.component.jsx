import React, {useState , useEffect} from 'react';
import { Form, FloatingLabel, Modal, Button, Nav, Image } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_PARTNERS } from '../../util/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../util/mutations';



const UserForm = ({ userData = {}, admin, show, onHide }) => {

    const [formState, setFormState] = useState({
        email: userData?.email || '',
        name: userData?.name || '',
        admin: userData?.admin || '',
        partner: userData?.partner?._id || '',
        guestProfile: {
            email: userData?.guestProfile?.email || userData?.email || '',
            name: userData?.guestProfile?.name || '',
            phone: userData?.guestProfile?.phone || ''
        }
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

    const handleLogout = () => {
        localStorage.removeItem('id_token');
        window.location.reload();
        
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({
            variables: { 
                userId: userData?._id || '',
                userInput : {...formState},
                guestInput: {...formState.guestProfile}
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

 

    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }

    return (



        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton className='bg-dark text-light'>
            <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-light'>
            <div style={{padding: "15px", maxWidth: "540px"}}>
                <Form onSubmit={handleSubmit} >

                    
                    <Form.Group controlId="formBasicEmail">
                    <FloatingLabel label="email address" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                        <Form.Control type="text" placeholder="email" name="email" value={formState.email} onChange={handleUserChange} />
                    </FloatingLabel>
                    </Form.Group>
                    

                    
                    <Form.Group controlId="formBasicName">
                    <FloatingLabel label="name" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                        <Form.Control type="text" placeholder="name" name="name" value={formState.guestProfile?.name} onChange={handleUserChange} />
                        </FloatingLabel>
                    </Form.Group>
                    

                    
                        <Form.Group controlId="formBasicPhone">
                        <FloatingLabel label="phone number" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                            <Form.Control type="text" placeholder="phone" name="phone" value={formState.guestProfile?.phone} onChange={handleUserChange} />
                        </FloatingLabel>
                            <Form.Control type="hidden" name="email" value={formState.email} onChange={handleUserChange} />

                        </Form.Group>
                
                
                    
                    <Form.Group controlId="formBasicAdmin" className='mb-3' style={{display: "flex"}} hidden={!admin}>
                        <Form.Label >admin
                        <Form.Check type="checkbox" name="admin" onChange={handleAdmin} value={formState.admin} checked={formState.admin} inline />
                        </Form.Label>
                        <Form.Select type="text" placeholder="partner" disabled={!formState.admin} name="partner" value={formState.partner} size="sm" onChange={handleUserChange} style={{width: "50%", backgroundColor: !formState?.admin ? "black" : null}} >
                            {partnersData?.findAllPartners?.map((partner, index) => <option key={index} value={partner._id} style={{width:"100%"}}>{partner.name}<Image src={partner.imgSrc}/></option>)}
                        </Form.Select>

                    </Form.Group>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Form.Group controlId="formBasicCancel">
                            <Button onClick={handleLogout}>logout</Button>
                        </Form.Group>


                        <Form.Group controlId="formBasicSubmit">
                        <Button type="submit">save</Button>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        </Modal.Body>

        </Modal>
 
    );
};

export default UserForm;
