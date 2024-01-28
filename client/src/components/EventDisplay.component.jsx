import { useState, useContext } from 'react';
import { GuestForm } from './forms';
import { Card, Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import { UserContext } from '../util/context/UserContext';



const EventDisplay = ( { eventData, admin } ) => {
    
    const userData = useContext(UserContext);


    const prettyTime = dayjs(parseInt(eventData?.time)).format('h:mm A')
    const prettyDate = dayjs(parseInt(eventData?.time)).format('dddd, MMMM D')

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
            {eventData?.partner ? <Card.Header>Hosted by {eventData?.partner?.name}</Card.Header> : null}
            <Card.Body style={{display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center"}}>

                <div style={{flex: "1 1 75%", textAlign: "center"}}>
                    <h2 style={{fontSize: "3cqb"}}>{prettyDate}</h2>
                    <h1 className="landingPageTitle" style={{ fontSize: '4cqb' }}>
                    {eventData?.title ? eventData.title : 'Boot Party'}
                    </h1>
                    <h3 style={{fontSize: "3cqb"}}>{prettyTime} at { eventData?.location }</h3>
                    <div style={{display: "flex", flex: "0 1 45cqw", minHeight: "100%"}}>
                     
                     </div>
                </div>

                <div style={{display: "flex", flexDirection:"column", flexWrap: "wrap", flex: "1 0 25%", justifyContent: "space-around"}}>
                    {admin ? <Button className='formButton' href={`${window.location.origin}/admin/party/${eventData?._id}`} >Admin</Button> : null }
                    <Button className='formButton' onClick={() => setShowNewGuestModal(true)}>JOIN</Button>
                    <Button className='formButton' onClick={() => navigator.share(shareData)}>SHARE</Button>
                    { !userData.admin ? <Button className='formButton' href={`${window.location.origin}/admin/party/${eventData?._id}`} >Admin</Button> : null }
                </div>

            </Card.Body>
            
        </Card>

        <GuestForm eventId={eventId} show={showNewGuestModal} success={() => setShowNewGuestModal(false)} />

        </>
    );
};

export default EventDisplay;
  

