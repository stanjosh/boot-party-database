import React from 'react';
import { Card, Container } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
            
            <Container fluid>
            <Card><h3 style={{ fontSize: '5cqb' }}>Guests</h3></Card>
          {eventData?.eventSignups.map((signup) => (
            <Card key={signup._id}>
                <Card.Body>
                    
                    <Card.Text>
                        <strong>Name:</strong> {signup.name}<br />
                        <strong>Email:</strong> {signup.email}<br />
                        <strong>Phone:</strong> {signup.phone}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
        </Container>
        </>
    );
};

export default GuestsDisplay;
  