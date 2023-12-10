import React from 'react';
import { Card } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
          {eventData?.eventSignups.map((signup) => (
            <Card key={signup._id}>
                <Card.Body>
                    <Card.Title><h3 style={{ fontSize: '5cqb' }}>Guest Details</h3></Card.Title>
                    <Card.Text>
                        <strong>Name:</strong> {signup.name}<br />
                        <strong>Email:</strong> {signup.email}<br />
                        <strong>Phone:</strong> {signup.phone}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
        </>
    );
};

export default GuestsDisplay;
  