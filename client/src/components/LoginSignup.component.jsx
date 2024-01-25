import { Modal, Tabs, Tab } from 'react-bootstrap';


import { LoginForm, SignupForm } from './forms';

const LoginSignup = ({show, onHide}) => {

    return (
        <Modal
        aria-labelledby='signup-modal'
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
        show={show}
        onHide={onHide}
        
        >
        <div style={{backgroundColor: "var(--alviesBlue)", borderRadius: "5px"}} >
        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3"
        style={{backgroundColor: "aliceblue", color: "var(--alviesBlue)", borderRadius: "5px 5px 0 0", fontFamily: "unpretentious", padding: "5px", width: "100%"}}
        variant='pills'
        >
            
        <Tab eventKey="login" title="Login" >
            
            <LoginForm />
        </Tab>
        <Tab eventKey="signup" title="Signup">
            <SignupForm />
        </Tab>
     
        </Tabs>
        </div>
        </Modal>
    )
};

export default LoginSignup;
