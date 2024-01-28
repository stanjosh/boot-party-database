import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Button, Tabs, Tab, Modal, Card } from 'react-bootstrap';
import { GuestForm, EventForm, EventAdminForm } from '../../components/forms';
import { useLazyQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../util/queries';




const AdminParty = () => {
  const { eventId } = useParams();
  
  const [showNewGuestModal, setNewShowGuestModal] = useState(false); 
  const [showUpdateGuestModal, setShowUpdateGuestModal] = useState(-1);
  const [getEventData, { loading, error, data }] = useLazyQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  

  
  const handleUpdateGuest = () => {
    setNewShowGuestModal(false)
    setShowUpdateGuestModal(-1)
    getEventData()
  }

  useEffect(() => {
    if (eventId && !data) getEventData()
  }, [eventId, data, getEventData])


  const eventData = data?.findEventByID;

  console.log(data)

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

              <GuestForm eventId={eventId} guest={eventData?.eventContact} submitText={'save'} formTitle={'event contact'} success={() => console.log('success')}  />
            
            
          </Tab>

          <Tab eventKey="guests" title="guests">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", verticalAlign: "center"}}>
              <h4 style={{color: "aliceblue", fontSize: "3cqb" }}>{eventData?.eventSignups?.length} GUESTS</h4>
            
              <Button className="" style={{width: "100%"}} onClick={() => setNewShowGuestModal(true)}>add guest</Button>
            </div>
            <div>
              { eventData?.eventSignups?.map((guest, index) => {
                return (
                  <Card key={index}>
                    <Card.Header style={{display: "flex" , justifyContent: "space-between"}}>
                      {guest.name} 
                      <div>
                        <Button variant="primary" style={{margin: "5px"}} onClick={() => setShowUpdateGuestModal(index)}>edit</Button>
                        <Button variant="danger" style={{margin: "5px"}}>X</Button>
                        
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
            <EventAdminForm event={eventData} />
          </Tab>

          <Tab eventKey="bootList" title="Boot List">
            <table>
            { eventData?.eventSignups?.map((guest, index) => {
              return (
                <tr key={index}><td style={{verticalAlign: "top"}}>{guest.name}</td>  { guest?.boots?.map((boot, i) => <table key={i}><tr >{boot.bootSku}</tr></table> ) }</tr>
              )
              

            })}
            </table>
          </Tab>


          </Tabs>
        </Container>



      }

      {error && <Alert variant="danger">Something went wrong...</Alert>}
    </>
    )
}

export default AdminParty;
