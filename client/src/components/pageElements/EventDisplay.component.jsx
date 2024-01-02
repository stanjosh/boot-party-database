import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const EventDisplay = ( { eventData } ) => {
    console.log(eventData)
    const prettyTime = new Date(parseInt(eventData?.eventTime)).toLocaleString('en-US', { month: "long", day: "numeric", weekday: "long", hour: 'numeric', minute: 'numeric', hour12: true })  

    return (
        <>
        <Card style={{marginTop: "15px"}}>
            <Card.Body>
                <Card.Title>
                    <h3 style={{ fontSize: '3.5cqb' }}>
                    {eventData?.eventTitle ? eventData.eventTitle : 'Boot Party'}
                    </h3>
                </Card.Title>
                <Card.Text>
                    {console.log(eventData)}
                    <strong>location:</strong> { eventData?.eventLocation }<br />
                    <strong>time:</strong> { prettyTime }<br />
                    
                    <strong>host name:</strong> { eventData?.eventContact.name}<br />
                    <strong>email:</strong> { eventData?.eventContact.email}<br />
                    <strong>phone:</strong> { eventData?.eventContact.phone ? eventData?.eventContact.phone : 'not provided' }<br />
                    

                    {eventData?.eventNotes
                        ? <><strong>notes:</strong> {eventData.eventNotes}</>
                        : null
                    }
                    
                    {eventData?.eventNotes 
                        ? <><strong>guests:</strong> {eventData.eventSignups.length}</>
                        : null
                    }
                
                
                </Card.Text>
            </Card.Body>
        </Card>

        </>
    );
};

export default EventDisplay;
  