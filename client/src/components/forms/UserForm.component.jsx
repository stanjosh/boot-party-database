import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Modal, Button, } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_PARTNERS } from '../../util/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../util/mutations';
import Auth from '../../util/Auth';


const UserForm = ({ userData = {}, admin, show, onHide }) => {

    const { data : partnersData, loading : partnersLoading, error : partnersError } = useQuery(QUERY_PARTNERS);
    const [updateUser, { loading : updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER);

    const loading = partnersLoading || updateUserLoading;
    const error = partnersError || updateUserError;


    const [formState, setFormState] = useState({
        email: userData?.email || '',
        admin: userData?.admin || false,
        partner: userData?.partner?._id || null,
        

    });

    const [guestInput, setGuestInput] = useState({
        
        email: userData?.guestProfile?.email || userData?.email || '',
        name: userData?.guestProfile?.name || '',
        phone: userData?.guestProfile?.phone || '',
        
    });

    const handleAdmin = (event) => {
        const { name, checked } = event.target;
        setFormState({ 
                ...formState,  
                [name]: checked ? true : false 
            });
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, 
                [name]: value 
            });
    };

    const handleGuestChange = (event) => {
        const { name, value } = event.target;
        setGuestInput({ ...guestInput,
                [name]: value 
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({
            variables: { 
                userId: userData?._id || '',
                userInput : {...formState},
                guestInput: {...guestInput}
            }
        })
        .then(() => {
            onHide();
        })
    };

 
    useEffect(() => {
        setFormState({
            email: userData?.email || '',
            admin: userData?.admin || false,
            partner: userData?.partner?._id || null,
        });
        setGuestInput({
            email: userData?.guestProfile?.email || userData?.email || '',
            name: userData?.guestProfile?.name || '',
            phone: userData?.guestProfile?.phone || '',
        });
    }, [userData, partnersData]);



    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }

    return (


        
        <Modal show={show} onHide={onHide} centered>
        
        { loading ? 
        <Modal.Header closeButton className='bg-dark text-light'>
            <Modal.Title>Loading...</Modal.Title>
        </Modal.Header> :
        
        <>
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
                            <Form.Control type="text" placeholder="name" name="name" value={guestInput.name} onChange={handleGuestChange} />
                            </FloatingLabel>
                        </Form.Group>
                        

                        
                        <Form.Group controlId="formBasicPhone">
                            <FloatingLabel label="phone number" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                                <Form.Control type="text" placeholder="phone" name="phone" value={guestInput.phone} onChange={handleGuestChange} />
                            </FloatingLabel>
                            <Form.Control type="hidden" name="email" value={formState.email} onChange={handleUserChange} />

                        </Form.Group>
                
                    
                        { admin ? 
                            <Form.Group controlId="formBasicAdmin" className='mb-3' style={{display: "flex"}} hidden={!admin}>
                                <Form.Label >admin
                                <Form.Check type="checkbox" name="admin" onChange={handleAdmin} value={formState.admin} checked={formState.admin} inline />
                                </Form.Label>
                                <Form.Select type="text" placeholder="partner" disabled={!formState.admin} name="partner" value={formState.partner} size="sm" onChange={handleUserChange} style={{width: "50%", backgroundColor: !formState?.admin ? "black" : null}} >
                                    {partnersData?.findAllPartners?.map((partner, index) => <option key={index} value={partner._id} style={{width:"100%"}} onChange={handleUserChange} >{partner.name}</option>)}
                                </Form.Select>
                            </Form.Group>   
                        : null }

                        
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Form.Group controlId="formBasicCancel">
                                <Button onClick={() => Auth.logout()}>logout</Button>
                            </Form.Group>


                            <Form.Group controlId="formBasicSubmit">
                            <Button type="submit">save</Button>
                            </Form.Group>
                        </div>
                    </Form>
                </div>
                {error && <div>error: {error.message}</div>}
            </Modal.Body>
        </>
            }
        </Modal>
 
    );
};

export default UserForm;
