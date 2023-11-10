import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm.component';
import LoginForm from './LoginForm.component';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SavedInventories from '../inventories/SavedInventories.component'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../util/queries';


const Header = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { 
    if (data?.me) {
       setUserData(data?.me)
    }
  }  , [userData, data, loading])

     return(   
    
      <>
      
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">InventoryWiz</Navbar.Brand>
            <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                </Nav>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                InventoryWiz
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {loading ? (
                 <h2> Loading... </h2>) : (
                  <SavedInventories userData={userData}/>
                 )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))};

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

    </>
  )};
export default Header;

