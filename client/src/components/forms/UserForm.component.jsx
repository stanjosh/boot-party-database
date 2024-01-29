import { useEffect, useState, useContext } from 'react';
import { Form, FloatingLabel, Modal, Button, } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { QUERY_PARTNERS } from '../../util/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../util/mutations';
import Auth from '../../util/Auth';
import { UserContext } from '../../util/context/UserContext';

const UserForm = ({ userData = {}, show, onHide }) => {

    const { admin: currentUserIsAdmin } = useContext(UserContext);


    

    const [getPartners, { data : partnersData, loading : partnersLoading, error : partnersError }] = useLazyQuery(QUERY_PARTNERS);
    const [updateUser, { loading : updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER);

    const loading = partnersLoading || updateUserLoading;
    const error = partnersError || updateUserError;

    const [formState, setFormState] = useState({            
        email: userData?.email || '',
        phone: userData?.phone || '',
        name: userData?.name || '',
        admin: userData?.admin || false,
        partner: userData?.partner?._id || null,
    });

    const { email, phone, name, partner, admin } = formState;


    const handleAdmin = (event) => {
        const { checked } = event.target;
        console.log(name, checked)
        setFormState({ 
                ...formState,  
                admin: checked  
            });
           
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, 
                [name]: value 
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser({
            variables: { 
                userId: userData?._id || '',
                updateUserInput : {...formState},
            }
        })
        .then(() => {
            onHide();
        })
    };

    useEffect(() => {
        if (show) {
            getPartners();
            setFormState({
                email: userData?.email || '',
                phone: userData?.phone || '',
                name: userData?.name || '',
                admin: userData?.admin || false,
                partner: userData?.partner?._id || null,
            })
        }


    }, [show, userData, getPartners])
 



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
                            <Form.Control type="text" placeholder="email" name="email" value={email} onChange={handleUserChange} />
                        </FloatingLabel>
                        </Form.Group>
                        

                        
                        <Form.Group controlId="formBasicName">
                        <FloatingLabel label="name" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                            <Form.Control type="text" placeholder="name" name="name" value={name} onChange={handleUserChange} />
                            </FloatingLabel>
                        </Form.Group>
                        

                        
                        <Form.Group controlId="formBasicPhone">
                            <FloatingLabel label="phone number" className="mb-3" style={{fontStyle: "italic", color: "gray"}}>
                                <Form.Control type="text" placeholder="phone" name="phone" value={phone.replace(/(\d{3})(\d{3})(\d{4})?/g,'($1)-$2-$3')} onChange={handleUserChange} />
                            </FloatingLabel>
                            <Form.Control type="hidden" name="email" value={phone} onChange={handleUserChange} />

                        </Form.Group>
                
                    
                        { currentUserIsAdmin ? 
                            <Form.Group controlId="formBasicAdmin" className='mb-3' style={{display: "flex"}} hidden={!currentUserIsAdmin}>
                                <Form.Label >admin
                                <Form.Check type="checkbox" name="admin" onChange={handleAdmin} checked={admin} inline />
                                </Form.Label>
                                <Form.Select type="text" placeholder="partner" disabled={!currentUserIsAdmin} name="partner" value={partner?.name} size="sm" onChange={handleUserChange} style={{width: "50%"}} >
                                    {partnersData?.findAllPartners?.map((partner, index) => <option key={index} value={partner?._id} style={{width:"100%"}} onChange={handleUserChange} >{partner.name}</option>)}
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
