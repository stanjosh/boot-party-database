import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const EventDisplay = ( { eventData } ) => {
    
    

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title><h3 style={{ fontSize: '3.5cqb' }}>Event Details</h3></Card.Title>
                <Card.Text>
                    {console.log(eventData)}
                    <strong>Location:</strong> {eventData.eventLocation}<br />
                    <strong>Time:</strong> {eventData.eventTime}<br />
                    <strong>Guests:</strong> {eventData.eventSignups.length}<br />
                    <strong>Contact:</strong> {eventData.eventContact.name}<br />
                    <strong>Email:</strong> {eventData.eventContact.email}<br />
                    <strong>Phone:</strong> {eventData.eventContact.phone}<br />
                    <strong>Notes:</strong> {eventData.eventNotes}<br />
                </Card.Text>
            </Card.Body>
        </Card>

        </>
    );
};

export default EventDisplay;
  