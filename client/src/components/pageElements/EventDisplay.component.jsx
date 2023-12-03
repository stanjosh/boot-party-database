import React from 'react';
import { Card } from 'react-bootstrap';


const EventDisplay = ( { eventData } ) => {

    const event = eventData.findEventByID;

    const eventTimeRaw = new Date(event.eventTime * 1);

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title><h3 style={{ fontSize: '5cqb' }}>Event Details</h3></Card.Title>
                <Card.Text>
                    {console.log(eventData)}
                    <strong>Location:</strong> {event.eventLocation}<br />
                    <strong>Time:</strong> {eventTimeRaw.toLocaleString()}<br />
                    <strong>Guests:</strong> {event.eventSignups.length}<br />
                    <strong>Contact:</strong> {event.eventContact.name}<br />
                    <strong>Email:</strong> {event.eventContact.email}<br />
                    <strong>Phone:</strong> {event.eventContact.phone}<br />
                </Card.Text>
            </Card.Body>
        </Card>

        </>
    );
};

export default EventDisplay;
  