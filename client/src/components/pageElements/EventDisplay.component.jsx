import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


const EventDisplay = ( { eventData, admin } ) => {
    console.log(eventData)
    const prettyTime = new Date(parseInt(eventData?.eventTime)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })  
    const prettyDate = new Date(parseInt(eventData?.eventTime)).toLocaleString('en-US', { month: "long", day: "numeric", weekday: "long" })

    const shareData = {
        title: "Alvies Boot Party",
        text: "Check out my Alvies Boot Party!",
        url: `${window.location.origin}/join/${eventData?._id}`,
      };

    return (
        <>

        <Card>
            <Card.Body style={{display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center"}}>

                    
 


                <div style={{flex: "1 1 75%", textAlign: "center"}}>
                    <h2 style={{fontSize: "3cqb"}}>{prettyDate}</h2>
                    <h1 className="landingPageTitle" style={{ fontSize: '5cqb' }}>
                    {eventData?.eventTitle ? eventData.eventTitle : 'Boot Party'}
                    </h1>
                    <h3 style={{fontSize: "3cqb"}}>{prettyTime} at { eventData?.eventLocation }</h3>
                    <div style={{display: "flex", flex: "0 1 45cqw", minHeight: "100%"}}>
                     
                     </div>
                </div>
                
                
                
                    
                   

                    
                    
                    <div style={{display: "flex", flexDirection:"column", flexWrap: "wrap", flex: "1 0 25%", justifyContent: "space-around"}}>
                        <Button className='formButton' href={`${window.location.origin}/admin/${eventData?._id}`}>Admin</Button>
                        <Button className='formButton' href={`${window.location.origin}/join/${eventData?._id}`}>JOIN</Button>
                        <Button className='formButton' onClick={() => navigator.share(shareData)}>SHARE</Button>
                    </div>


                        
                        <br />
                    {eventData?.eventNotes
                        ? <><strong>notes:</strong> {eventData.eventNotes}</>
                        : null
                    }
                    



                
            </Card.Body>
            
        </Card>

        </>
    );
};

export default EventDisplay;
  