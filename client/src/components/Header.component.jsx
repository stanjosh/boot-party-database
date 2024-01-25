import { useState } from 'react';
import { Navbar, Nav, Container, Image, Alert } from 'react-bootstrap';
import LoginSignup from './LoginSignup.component';
import { QUERY_ME } from '../util/queries';
import { useQuery } from '@apollo/client';
import { UserForm } from './forms';

const Header = () => {
  


    const [showLoginSignup, setShowLoginSignup] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    const { data, loading, error } = useQuery(QUERY_ME);



    const userData = data?.me || {};

    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      
      margin: "5px", 
      flex: "1 1 150px", 
      maxHeight: "50px", 
       
      justifyContent: "center",
      letterSpacing: "1px",
      color: "var(--alviesBlue)",
      border: "4px solid var(--alviesBlue)",
      padding: "5px",
      borderRadius: "2px",
      
    };

    return(   
  
    <>
      
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} style={{zIndex: "100", fontFamily: "unpretentious", padding: "5px", margin: "1rem"}} className="bg-body-tertiary mb-3">
          <Container fluid style={{alignContent: "center", padding: "0"}}>
            <Navbar.Brand href="/"><Image src='/boot-party-blue.png' height="75cqb" style={{display: "flex"}}/>
              
            </Navbar.Brand>
          { error ? <Alert style={{color: "red"}}>please log in again</Alert> : null }
          { loading ? null : 
            <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: "end", width: "100%"}}>
          
          <Nav className="mb-0" style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", maxWidth: "500px", width: "100%"}}>
            { userData?.partner?.name != 'alvies' ? (
            <Nav.Link 
              eventKey={1} 
              href="https://alvies.com" 
              style={{...buttonStyle, backgroundColor: "var(--alviesBlue)", color: "aliceblue" }}>
              SHOP ALVIES
            </Nav.Link>
            ) : null }

            {!userData?._id ? (
            <Nav.Link 
              eventKey={2} 
              onClick={() => setShowLoginSignup(true)} 
              style={buttonStyle}>
              sign in / up
              </Nav.Link>  
            ) : (
              <Nav.Link 
                eventKey={3} 
                onClick={() => setShowUserModal(true)}
                style={buttonStyle}> 
                { userData?.guestProfile.name } 
                <Image src="/user.svg" style={{maxHeight: "30px", filter: "invert(44%) sepia(80%) saturate(2219%) hue-rotate(172deg) brightness(95%) contrast(103%)"}} />
                </Nav.Link> 
            )}
            <UserForm userData={userData} show={showUserModal} onHide={() => setShowUserModal(false)} />
            {userData?.admin ? (
              <Nav.Link 
                eventKey={4} 
                href='/admin'
                style={buttonStyle}>{userData?.partner?.name ? `admin ${userData?.partner?.name}` : null }
              </Nav.Link>  
            ) : null}
            
          </Nav>

        </Navbar.Collapse>
        </>
        }
        </Container>
      </Navbar>
    ))}

    <LoginSignup show={showLoginSignup} setShowing={setShowLoginSignup} onHide={() => setShowLoginSignup(false)}/>
    
    


  </>
)};
export default Header;

