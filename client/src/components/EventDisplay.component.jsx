import { useState } from 'react';
import { GuestForm } from './forms';
import { Card, Button, Modal } from 'react-bootstrap';
import dayjs from 'dayjs';



const EventDisplay = ( { eventData, admin } ) => {
    



    const prettyTime = dayjs(parseInt(eventData?.eventTime)).format('h:mm A')
    const prettyDate = dayjs(parseInt(eventData?.eventTime)).format('dddd, MMMM D')

    const eventId = eventData?._id;

    const [showNewGuestModal, setShowNewGuestModal] = useState(false);
    const shareData = {
        title: "Alvies Boot Party",
        text: "Check out my Alvies Boot Party!",
        url: `${window.location.origin}/join/${eventData?._id}`,
      };

    return (

        
        <>
        { !admin ? 
        <Card>
            {eventData?.eventPartner ? <Card.Header>Hosted by {eventData?.eventPartner?.name}</Card.Header> : null}
            <Card.Body style={{display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center"}}>

                    
 


                <div style={{flex: "1 1 75%", textAlign: "center"}}>
                    <h2 style={{fontSize: "3cqb"}}>{prettyDate}</h2>
                    <h1 className="landingPageTitle" style={{ fontSize: '4cqb' }}>
                    {eventData?.eventTitle ? eventData.eventTitle : 'Boot Party'}
                    </h1>
                    <h3 style={{fontSize: "3cqb"}}>{prettyTime} at { eventData?.eventLocation }</h3>
                    <div style={{display: "flex", flex: "0 1 45cqw", minHeight: "100%"}}>
                     
                     </div>
                </div>
                
                
                
                    
                   

                    
                    
                    <div style={{display: "flex", flexDirection:"column", flexWrap: "wrap", flex: "1 0 25%", justifyContent: "space-around"}}>
                        {admin ? <Button className='formButton' href={`${window.location.origin}/admin/party/${eventData?._id}`} >Admin</Button> : null }
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

        :
        <div style={{ backgroundColor: "aliceblue"}}> 
            <ul>
                <li>
                    
                    <div>
                    {eventData?.eventTime ? <><strong>{prettyDate + ' ' + prettyTime}</strong> <br /> </>: null}
                        
                    {eventData?.eventTitle ? <><strong>&quot;{eventData?.eventTitle}&quot;</strong> <br /> </>: null}
                        
                    {eventData?.eventLocation ? <><strong>{eventData?.eventLocation}</strong> </> : null}

                    <Button className='formButton' href={`${window.location.origin}/admin/party/${eventData?._id}`} >Admin</Button>
                    </div>   
                        

                    

                </li>


            </ul>

        </div>

        }
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
  

