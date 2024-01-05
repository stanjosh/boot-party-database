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
            
        <Nav style={{display: "flex", justifyContent: "end", width: "100%"}}>
          <Nav.Link 
            eventKey={1} 
            href="https://alvies.com" 
            style={{
              margin: "5px", 
              flex: "0 1 25cqw", 
              width: "100%", 
              maxHeight: "50px", 
              textAlign: "center", 
              color: "aliceBlue", 
              backgroundColor: "var(--alviesDarkBlue)" 
          }}>
            SHOP ALVIES
          </Nav.Link>

          <Nav.Link 
            eventKey={2} 
            onClick={() => setShowLoginSignup(true)} 
            style={{margin: "5px", 
              flex: "0 1 25cqw", 
              width: "100%", 
              maxHeight: "50px", 
              textAlign: "center", 
              border: "4px solid var(--alviesBlue)"
          }}>
            sign in / up
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

