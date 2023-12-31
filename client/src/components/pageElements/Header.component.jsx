import { useEffect, useState } from 'react';
import { Button, Navbar, Nav, NavDropdown, Container, Modal, Alert, Offcanvas } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
//import { QUERY_ME } from '../../util/queries';
import { LOGIN_USER } from '../../util/mutations';
import Form from 'react-bootstrap/Form';
import Auth from '../../util/Auth';

const Header = () => {
  //const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);


  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const user = await loginUser({
        variables: { ...userFormData }
      });
      Auth.login(user.data.loginUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  // useEffect(() => { 
  //   if (data?.me) {
  //      setUserData(data?.me)
  //   }
  // }  , [userData, data, loading])

     return(   
    
      <>
      
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} style={{zIndex: "100", fontFamily: "unpretentious"}} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/"><img src='/boot-party-blue.png' height={'70cqb'} /></Navbar.Brand>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              
          <Nav className="me-auto">
            <Button onClick={() => setShowModal(true)}>LOGIN</Button>
            <Nav.Link href="/book" style={{width: "100%", textAlign: "right"}}>Book a Party</Nav.Link>
            <Nav.Link href="/manage" style={{width: "100%", textAlign: "right"}}>Manage a Party</Nav.Link>
            
            <Nav.Link href="#deets" style={{width: "100%", textAlign: "right"}}>FAQ / CONTACT</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{width: "100%", textAlign: "right"}}>
              SHOP ALVIES
            </Nav.Link>

              
            
          </Nav>

        </Navbar.Collapse>
          </Container>
        </Navbar>
      ))}


      
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
      </Modal>

    </>
  )};
export default Header;

