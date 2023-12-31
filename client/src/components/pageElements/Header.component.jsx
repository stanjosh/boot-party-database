import { useEffect, useState } from 'react';
import { Button, Navbar, Nav, NavDropdown, Container, Modal, Alert, Offcanvas } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../util/queries';
import LoginSignup from './LoginSignup.component';

const Header = () => {
  
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me);
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  useEffect(() => { 
    if (data?.me) {
      setUserData(data?.me)
    }
  }  , [userData, data, loading])

    return(   
  
    <>
    
    {['sm'].map((expand) => (
      <Navbar key={expand} expand={expand} style={{zIndex: "100", fontFamily: "unpretentious"}} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/"><img src='/boot-party-blue.png' height={'70cqb'} /></Navbar.Brand>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
        <Nav className="me-auto">
          
          <Nav.Link href="/book" style={{width: "100%", textAlign: "right"}}>Book a Party</Nav.Link>
          <Nav.Link href="/manage" style={{width: "100%", textAlign: "right"}}>Manage a Party</Nav.Link>
          
          <Nav.Link href="#deets" style={{width: "100%", textAlign: "right"}}>FAQ / CONTACT</Nav.Link>
          <Nav.Link eventKey={2} href="#memes" style={{width: "100%", textAlign: "right"}}>
            SHOP ALVIES
          </Nav.Link>
          <Nav.Link 
            eventKey={2} 

            onClick={() => setShowLoginSignup(true)} 
            style={{width: "100%", textAlign: "right"}}>
            login  
          </Nav.Link>  
          
        </Nav>

      </Navbar.Collapse>
        </Container>
      </Navbar>
    ))}

    <LoginSignup show={showLoginSignup} onHide={() => setShowLoginSignup(false)}/>
    


  </>
)};
export default Header;

