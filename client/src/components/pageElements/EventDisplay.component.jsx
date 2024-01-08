import React, { useState } from 'react';
import { GuestForm } from '../forms/';
import { Card, Button, Modal } from 'react-bootstrap';


const EventDisplay = ( { eventData, admin } ) => {
    



    const prettyTime = new Date(parseInt(eventData?.eventTime)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })  
    const prettyDate = new Date(parseInt(eventData?.eventTime)).toLocaleString('en-US', { month: "long", day: "numeric", weekday: "long" })

    const eventId = eventData?._id;

    const [showNewGuestModal, setShowNewGuestModal] = useState(false);
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
                        {admin ? <Button className='formButton' href={`${window.location.origin}/admin/${eventData?._id}`} >Admin</Button> : null }
                        <Button className='formButton' onClick={() => setShowNewGuestModal(true)}>JOIN</Button>
                        <Button className='formButton' onClick={() => navigator.share(shareData)}>SHARE</Button>
                    </div>


                        
                        <br />
                    {eventData?.eventNotes
                        ? <><strong>notes:</strong> {eventData.eventNotes}</>
                        : null
                    }
                    



                
            </Card.Body>
            
        </Card>

        <Modal show={showNewGuestModal} onHide={() => setShowNewGuestModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
              <Modal.Title>add guest</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='bg-dark text-light'>
              <GuestForm  joining eventId={eventId} submitText={'add'} formTitle={'add guest'} success={() => setShowNewGuestModal(false)}/>
            </Modal.Body>
            <Modal.Footer  className='bg-dark text-light'>
            </Modal.Footer>
          </Modal>

        </>
    );
};

export default EventDisplay;
  