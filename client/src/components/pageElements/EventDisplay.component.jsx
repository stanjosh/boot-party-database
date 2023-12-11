import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const EventDisplay = ( { eventData } ) => {
    
    const prettyTime = new Date(eventData.eventTime * 1000).toLocaleString('en-US', { month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true })  

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>
                    <h3 style={{ fontSize: '3.5cqb' }}>
                    {eventData.eventTitle ? eventData.eventTitle : 'Event Details'}
                    </h3>
                </Card.Title>
                <Card.Text>
                    {console.log(eventData)}
                    <strong>location:</strong> {eventData.eventLocation}<br />
                    <strong>time:</strong> {prettyTime}<br />
                    
                    <strong>contact:</strong> {eventData.eventContact.name}<br />
                    <strong>email:</strong> {eventData.eventContact.email}<br />
                    <strong>phone:</strong> {eventData.eventContact.phone}<br />
                    <strong>notes:</strong> {eventData.eventNotes}<br />
                    <strong>guests:</strong> {eventData.eventSignups.length}<br />
                </Card.Text>
            </Card.Body>
        </Card>

        </>
    );
};

export default EventDisplay;
  