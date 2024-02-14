import { useState } from 'react';
import { UserForm } from './forms';
import { Card, Button } from 'react-bootstrap';


const UserDisplay = ( { userData } ) => {
    
    const [show, setShow] = useState(false);

    console.log(userData)
    return (

        
        <div style={{display: "flex"}}>
            <Card style={{flex: "1 1"}}>
                <Card.Body>
                    <Card.Title>{userData?.name || userData?.email}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{userData?.guestProfile?.email || userData?.email}</Card.Subtitle>
                    {userData?.partner ? <Card.Subtitle>
                        {userData?.partner?.name} partner
                    </Card.Subtitle>
                    : null}
                    <Card.Text>
                        {userData?.admin ? 'admin' : 'user'}
                    </Card.Text>
                    <Card.Text>
                        {userData?.events?.length} events
                    </Card.Text>

                    <Button variant="primary" onClick={() => setShow(true)}>edit</Button>
                </Card.Body>
            </Card>
            


        <UserForm userData={userData} show={show} onHide={() => setShow(false)} admin/>


        </div>
    );
};

export default UserDisplay;
  