import { useContext, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginSignup from './LoginSignup.component';
import { UserContext } from '../../util/context/UserContext';

const Header = () => {
  


    const [showLoginSignup, setShowLoginSignup] = useState(false);



    const { userData }  = useContext(UserContext);
    console.log(userData) 

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
              width: "90%", 
              maxHeight: "50px", 
              textAlign: "center", 
              color: "aliceBlue", 
              backgroundColor: "var(--alviesDarkBlue)" 
          }}>
            SHOP ALVIES
          </Nav.Link>

          {userData?._id 
            ?
            <>
            logged in as {userData?.guestProfile.name}
            </>

            :
          <Nav.Link 
            eventKey={2} 
            onClick={() => setShowLoginSignup(true)} 
            style={{margin: "5px", 
              flex: "0 1 25cqw", 
              width: "90%", 
              maxHeight: "50px", 
              textAlign: "center", 
              border: "4px solid var(--alviesBlue)"
          }}>
            sign in / up
          </Nav.Link>  
          }
        </Nav>

      </Navbar.Collapse>
        </Container>
      </Navbar>
    ))}

    <LoginSignup show={showLoginSignup} onHide={() => setShowLoginSignup(false)}/>
    


  </>
)};
export default Header;

