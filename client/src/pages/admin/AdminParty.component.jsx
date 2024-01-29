import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Button, Tabs, Tab, Modal, Card } from 'react-bootstrap';
import { GuestForm, EventForm, EventAdminForm } from '../../components/forms';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_EVENT } from '../../util/queries';
import { EVENT_REMOVE_GUEST } from '../../util/mutations';
import { CopyBootList } from '../../components/forms/buttons';



const AdminParty = () => {
  const { eventId } = useParams();
  
  const [showNewGuestModal, setNewShowGuestModal] = useState(false); 
  const [showUpdateGuestModal, setShowUpdateGuestModal] = useState(-1);
  const [removeGuest, { loading: removeGuestLoading, error: removeGuestError }] = useMutation(EVENT_REMOVE_GUEST);
  const [getEventData, { loading: getEventLoading, error: getEventError, data }] = useLazyQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  
  const loading = getEventLoading || removeGuestLoading;
  const error = getEventError || removeGuestError;

  const handleRemoveGuest = (guest) => async () => {
    await removeGuest({
      variables: {
        eventId: eventId,
        guestId: guest._id
      }
    })
    
  }

  
  const handleUpdateGuest = () => {
    setNewShowGuestModal(false)
    setShowUpdateGuestModal(-1)
    
  }
  
  useEffect(() => {
    if (!loading && !error) getEventData();
  }, [getEventData, loading, error]);



  const eventData = data?.findEventByID || {};



  return (

    <>
      {loading ? <div>Loading...</div> :
      <Container fluid style={{ minHeight: '70cqh', backgroundColor: "#009ceb", paddingTop: "3cqh", maxWidth: "480px"}}>
        <Tabs 
          defaultActiveKey='event'
          id='admin-tabs'
          className='p-3 bg-light'
          fill
          variant='pills'
          style={{display: "flex", alignItems: "center", borderRadius:"15px"}}
          >
        
          <Tab eventKey="event" title="event">
            

              <EventForm eventData={eventData} submitText={'save'} admin={true} />
            
          </Tab>

          <Tab eventKey="guests" title={'Guests: ' + eventData?.guests?.length}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", verticalAlign: "center"}}>
              
              <CopyBootList guests={eventData?.guests} />
              <Button className="formButton" style={{width: "100%"}} onClick={() => setNewShowGuestModal(true)}>add guest</Button>
            </div>
            <div>
              { eventData?.guests?.map((guest, index) => {
                return (
                  <Card key={index}>
                    <Card.Header style={{display: "flex" , justifyContent: "space-between"}}>
                      {guest.name} 
                      <div>
                        <Button variant="primary" style={{margin: "5px"}} onClick={() => setShowUpdateGuestModal(index)}>edit</Button>
                        <Button variant="danger" style={{margin: "5px"}} onClick={handleRemoveGuest(guest)}>X</Button>
                        
                      </div>
                    </Card.Header>

                    <Card.Body>
                      
                      {guest?.boots?.map((boot, i) => {
                        return (
                          <div key={i}>
                            {boot.bootSku} {boot.bootName} {boot.bootSize}
                          </div>
                        )
                      })}
                    </Card.Body>
                    <Modal show={(showUpdateGuestModal == index)} onHide={() => setShowUpdateGuestModal(-1)} >
                      <Modal.Body  className='bg-dark'>
                        <GuestForm  guest={guest} submitText={'save'} formTitle={'update guest'} success={() => handleUpdateGuest()}/>
                      </Modal.Body>
                    </Modal>
                  </Card>
                )
              })}
            </div>
          
          <Modal show={showNewGuestModal} onHide={() => setNewShowGuestModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
              <Modal.Title>add guest</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='bg-dark text-light'>
              <GuestForm  joining eventId={eventId} submitText={'add'} formTitle={'add guest'} success={() => handleUpdateGuest()}/>
            </Modal.Body>
            <Modal.Footer  className='bg-dark text-light'>
            </Modal.Footer>
          </Modal>

          </Tab>

          <Tab eventKey="deleteEvent" title="Event Options">
            <EventAdminForm eventData={eventData} />
          </Tab>
          </Tabs>
        </Container>



      }

      {error && <Alert variant="danger">Something went wrong...</Alert>}
    </>
    )
}

export default AdminParty;
