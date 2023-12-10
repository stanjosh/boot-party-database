import React from 'react';
import { Card } from 'react-bootstrap';


const EventDisplay = ( { eventData } ) => {
    
    const eventTimeRaw = new Date(eventData.eventTime * 1);

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title><h3 style={{ fontSize: '5cqb' }}>Event Details</h3></Card.Title>
                <Card.Text>
                    {console.log(eventData)}
                    <strong>Location:</strong> {eventData.eventLocation}<br />
                    <strong>Time:</strong> {eventTimeRaw.toLocaleString()}<br />
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
  