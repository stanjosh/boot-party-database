import { useState, useContext, useEffect } from 'react';
import { GuestForm } from './forms';
import { Card, Button } from 'react-bootstrap';
import dayjs from 'dayjs';
import { UserContext } from '../util/context/UserContext';
import { GuestsDisplay } from './';
import { useLazyQuery } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';

const EventDisplay = ( { eventId } ) => {
    const [getEventData, { loading, error, data }] = useLazyQuery(QUERY_EVENT, {
        variables: { uuid : eventId }, 
      });

    const eventData = data?.findEventByID || {};

    const { userData, admin } = useContext(UserContext) ?? {};
    const [showNewGuestModal, setShowNewGuestModal] = useState(false);

    const prettyTime = dayjs(parseInt(eventData?.time)).format('h:mm A')
    const prettyDate = dayjs(parseInt(eventData?.time)).format('dddd, MMMM D')


    const handleAddGuest = () => {
        setShowNewGuestModal(false);
        getEventData();
    }

    useEffect(() => {
        getEventData();
    }, [getEventData]);

    const shareData = {
        title: "Alvies Boot Party",
        text: "Check out my Alvies Boot Party!",
        url: `${window.location.origin}/join/${eventData?._id}`,
      };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    
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
                    { admin ? <Button className='formButton' href={`${window.location.origin}/admin/party/${eventData?._id}`} >Admin</Button> : null }
                    <Button className='formButton' onClick={() => setShowNewGuestModal(true)}>JOIN</Button>
                    <Button className='formButton' onClick={() => navigator.share(shareData)}>SHARE</Button>
                    
                </div>

            </Card.Body>
            
        </Card>
        <GuestsDisplay eventData={eventData}/>
        <GuestForm eventId={eventId} show={showNewGuestModal} success={() => handleAddGuest()} />

        </>
    );
};

export default EventDisplay;
  

