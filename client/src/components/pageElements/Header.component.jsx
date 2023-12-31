import { useContext, useState } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
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
              display: "flex",
              
              margin: "5px", 
              flex: "0 1 150px", 
              
              maxHeight: "50px", 
              maxWidth: "150px",
              
              color: "aliceBlue", 
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--alviesDarkBlue)" 
          }}>
            SHOP ALVIES
          </Nav.Link>

          {!userData?._id ? (
          <Nav.Link 
            eventKey={2} 
            onClick={() => setShowLoginSignup(true)} 
            style={{margin: "5px", 
              flex: "0 1 150px", 
              width: "150px", 
              maxWidth: "50%",
              maxHeight: "50px", 
              textAlign: "center", 
              justifyContent: "space-between",
              border: "4px solid var(--alviesBlue)",
              padding: "5px",
              
          }}>
            sign in / up
            </Nav.Link>  
          ) : (
          <Nav.Link 
            eventKey={3} 
            href='/user'
            style={{margin: "5px", 
              flex: "1 1 150px", 
              width: "150px", 
              maxWidth: "50%",
              maxHeight: "50px", 
              textAlign: "center", 
              justifyContent: "space-between",
              border: "4px solid var(--alviesBlue)",
              padding: "5px",
              
          }}>
              { userData?.guestProfile.name }
              <Image src="/user.svg" style={{maxHeight: "40px"}} />
          
            
            </Nav.Link>  
          )}
          
        </Nav>

      </Navbar.Collapse>
        </Container>
      </Navbar>
    ))}

    <LoginSignup show={showLoginSignup} onHide={() => setShowLoginSignup(false)}/>
    


  </>
)};
export default Header;

