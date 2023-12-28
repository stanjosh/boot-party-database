import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { CustomerForm, EventForm } from './forms';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';




const AdminParty = () => {
  const { eventId } = useParams();
  const [showGuests, setShowGuests] = React.useState(false);
  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  
  const eventData = data?.findEventByID ?? {};
  
  console.log(eventData)

  return (

    <>
      {loading ? <div>Loading...</div> :
      <Container fluid style={{ minHeight: '70cqh', backgroundColor: "#009ceb", paddingTop: "3cqh" }}>
        <EventForm eventData={eventData} submitText={'save'} admin={true} />

        {eventData?.eventContact ? <CustomerForm customer={eventData?.eventContact} submitText={'save'} formTitle={'event contact'}  /> : null}

        {showGuests 
        
        ?
          eventData?.eventSignups?.map((guest, index) => {
            console.log(guest)
            return (
              <CustomerForm key={guest?._id} customer={guest} submitText={'save'} formTitle={'guest ' + (index + 1)}  />
            )
          })

        : 
          <>
            <h4 style={{color: "aliceblue", marginBottom: "15px", marginTop: "15px", fontSize: "3cqb" }}>{eventData?.eventSignups?.length} GUESTS</h4>
            <Button onClick={() => setShowGuests(true)} style={{
              flex: "0 1 40%",
              boxShadow: "2px 2px 3px black",
              borderRadius: "0 0 3px 0",
              margin: "8px",
        }}>show guests</Button>
          </>
        }

        <CustomerForm joinPartyId={eventId} submitText={'add'} formTitle={'add guest'}  />

      </Container>}

      {error && <Alert variant="danger">Something went wrong...</Alert>}
    </>
    )
}

export default AdminParty;
