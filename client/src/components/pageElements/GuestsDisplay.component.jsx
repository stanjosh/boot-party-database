import React from 'react';
import { Card, Container } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
        <Card><h3 style={{ fontSize: '5cqb' }}>Guests</h3></Card>
            <Card key={eventData?.eventContact?._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    
                    <Card.Text>
                        <strong>Name:</strong> {eventData?.eventContact?.name}<br />
                        <strong>Email:</strong> {eventData?.eventContact?.email}<br />
                        <strong>Phone:</strong> {eventData?.eventContact?.phone ? eventData?.eventContact?.phone : 'not provided'}<br />
                        <strong>Boot:</strong> {eventData?.eventContact?.bootName}<br />
                    </Card.Text>
                </Card.Body>
            </Card>

        {eventData?.eventSignups.length > 0 ? (
            <>





          {eventData?.eventSignups.map((signup) => (
            <Card key={signup._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    
                    <Card.Text>
                        <strong>Name:</strong> {signup.name}<br />
                        <strong>Email:</strong> {signup.email}<br />
                        <strong>Phone:</strong> {signup.phone ? signup.phone : 'not provided'}<br />
                        <strong>Boot:</strong> {signup.bootName}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
        </>
        ) : (
          null
        )}
        </>
    );
};

export default GuestsDisplay;
  