import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import { GuestForm, EventForm, EventAdminForm } from '../../components/forms';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../util/queries';




const AdminParty = () => {
  const { eventId } = useParams();
  
  const  [showNewGuestModal, setNewShowGuestModal] = useState(false);

  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  
  const eventData = data?.findEventByID ?? {};
  
  console.log(eventData)

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
          {eventData?.eventSignups?.map((guest, index) => {
              console.log(guest)
              return (
              <div key={guest?._id} style={{borderTop: "2px solid aliceblue", marginTop: "10px"}} >
                <GuestForm eventId={eventId} guest={guest} submitText={'save'} formTitle={'guest ' + (index + 1)} success={() => console.log('success')}admin />
              </div>
              )
          })}
          
          <Modal show={showNewGuestModal} onHide={() => setNewShowGuestModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
              <Modal.Title>add guest</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='bg-dark text-light'>
              <GuestForm  joining eventId={eventId} submitText={'add'} formTitle={'add guest'} success={() => setNewShowGuestModal(false)}/>
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
                <tr key="index"><td style={{verticalAlign: "top"}}>{guest.name}</td>  { guest?.boots?.map((boot, i) => <tr key={i}>{boot.bootSku}</tr> ) }</tr>
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
