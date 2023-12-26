import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CustomerForm, GuestEditForm } from './forms';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';
import { UPDATE_EVENT, EVENT_ADD_SIGNUP } from '../util/mutations';


const AdminParty = () => {
  const { eventId } = useParams();

  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  console.log(data)
  const [joinParty, { loading: joinPartyLoading, error: joinPartyError }] = useMutation(EVENT_ADD_SIGNUP);
  const [updateEvent, { loading: loadingUpdateEvent, error: errorUpdateEvent }] = useMutation(UPDATE_EVENT);
  const [customerJoinForm, setJoinFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [eventForm, setEventFormData] = useState({});
  const [eventContactForm, setEventContactFormData] = useState({});
  const [eventTime, setEventTime] = useState(Date(parseInt(data?.findEventByID.eventTime)));
  console.log(eventForm)

  useEffect(() => {
    if (data) {
      setEventFormData(data?.findEventByID);
      setEventContactFormData(data?.findEventByID.eventContact);
      setEventTime(new Date(parseInt(data?.findEventByID.eventTime)));
    }
  }, [data]);


  // const handleInsertIntoCalendar = async (e) => {
  //   const calendarEvent = await fetch('/api/insert-into-calendar', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       event: {
  //         title : eventForm.eventTitle, 
  //         description: eventForm.eventNotes,
  //         location: eventForm.eventLocation,
  //         time: eventForm.eventTime,
  //       },
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const { success } = await calendarEvent.json();
  //   if (success) {
  //     console.log('Event added to calendar');
  //   } else {
  //     console.log('Event not added to calendar');
  //   }
  // };



  const handleSubmit = async (e) => {
      e.preventDefault();
      await updateEvent({
          variables: {
            eventId: data.findEventByID._id,
              updateEventInput: { ...eventForm },
          }
      })
      .then((res) => {
      // Handle success

      window.location.assign(`/admin`);
      })
      .catch((err) => {
      // Handle error
      console.error('Error updating event:', err);
      });

};

    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        
        setEventContactFormData({ ...eventContactForm, [name]: value });
        setEventFormData({ ...eventForm, eventContact: {...eventContactForm}, [name]: value });
        console.log(eventForm);
    }

    const handleJoinParty = async (e) => {
      e.preventDefault();
      await joinParty({
          variables: {
              eventId: eventId,
              customerInput: { ...customerJoinForm },           
             
          }
      })
      .then((res) => {
      // Handle success
      console.log('Joined party:', res.data);
      setJoinFormData({ name: '', email: '', phone: '' });
      setSuccess(true);
      
      })
      .catch((err) => {
      // Handle error
      console.error('Error joining party:', err);
      });
  
    };
 

  return (
    <>
      <Container fluid style={{ minHeight: '70cqh', backgroundColor: "#009ceb", paddingTop: "3cqh" }}>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Form  onSubmit={handleSubmit}>
              <h4 style={{fontSize: "2cqh"}}>Event Info</h4>
              <Form.Group className="mb-3" controlId="formEventTime">
                <Form.Label style={{width: "100%"}}>event time</Form.Label>
                <DatePicker
                  name='eventTime'
                  selected={eventTime}
                  onChange={setEventTime}
                  value={eventTime}
                  showTodayButton={false}
                  showIcon={true}
                  minDate={new Date()}
                  minTime={new Date().setHours(8,0,0,0)}
                  maxTime={new Date().setHours(20,0,0,0)}
                  showTimeSelect
                  dateFormat="Pp"
                  
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEventLocation">
                <Form.Label>address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Event Address"
                    name="eventLocation"
                    defaultValue={eventForm?.eventLocation}
                    value={eventForm.eventLocation}
                    onChange={handleEventInputChange}
                /> 
              </Form.Group>
                    
              <Form.Group className="mb-3" controlId="formEventTitle">
                <Form.Label>event title</Form.Label>       
                <Form.Control
                    type="text" 
                    placeholder="Event Title"
                    name="eventTitle"
                    defaultValue={eventForm?.eventTitle}
                    value={eventForm.eventTitle}
                    onChange={handleEventInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEventNotes">      
                <Form.Label>notes</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Notes"
                    name="eventNotes"
                    defaultValue={eventForm?.eventNotes}
                    value={eventForm.eventNotes}
                    onChange={handleEventInputChange}
                /> 
              </Form.Group>
              <h4 style={{fontSize: "2cqh"}}>Alvies Needs</h4>
              <Form.Group className="mb-3" controlId="formEventDisplay">
                <Form.Label>display</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Event Display"
                    name="EventDisplay"
                    defaultValue={eventForm?.EventDisplay}
                    value={eventForm.EventDisplay}
                    onChange={handleEventInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEventLeadEmployee">
                <Form.Label>lead</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Event Lead"
                  name="eventLeadEmployee"
                  defaultValue={eventForm?.eventLeadEmployee}
                  value={eventForm.eventLeadEmployee}
                  onChange={handleEventInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEventHelpers">
                <Form.Label>helpers</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Event Helpers"
                    name="eventHelpers"
                    defaultValue={eventForm?.eventHelpers}
                    value={eventForm.eventHelpers}
                    onChange={handleEventInputChange}
                />
              </Form.Group>

              <h4 style={{fontSize: "2cqh"}}>Event Contact</h4>
                <Form.Group controlId="formEventContactName">
                  <Form.Label>contact name</Form.Label>  
                  <Form.Control
                    type="text"
                    placeholder="Event contact name"
                    name="name"
                    defaultValue={eventContactForm.name}
                    value={eventContactForm.name}
                    onChange={handleEventInputChange}
                  /> 
                </Form.Group>
                <Form.Group controlId="formEventContactEmail">
                  <Form.Label>contact email</Form.Label>l
                  <Form.Control
                      type="text"
                      placeholder="Event contact email"
                      name="email"
                      defaultValue={eventContactForm.email}
                      value={eventContactForm.email}
                      onChange={handleEventInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEventContactPhone">
                  <Form.Label>contact phone</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Event contact phone"
                      name="phone"
                      defaultValue={eventContactForm.phone}
                      value={eventContactForm.phone}
                      onChange={handleEventInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEventContactBoot">
                  <Form.Label>contact boot</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Event contact boot"
                      name="boot"
                      defaultValue={eventContactForm.bootName}
                      value={eventContactForm.bootName}
                      onChange={handleEventInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmit">
                    <Button type="submit" disabled={loading}>
                    save changes
                    </Button>
                    {loadingUpdateEvent && <Alert>Updating event...</Alert>}
                    {errorUpdateEvent && <Alert>Error updating event</Alert>}
                    </Form.Group>
                </Form>
            
            { eventForm?.eventSignups?.length > 0 ? (
                <Container>
                {eventForm?.eventSignups.map((guest, index) => (
                    <>
                      <GuestEditForm key={guest._id} guest={guest} eventId={eventId} index={index + 1} />
                    </>
                    ))
                }
                
              </Container>
            ) : (
              <>
                <h4 style={{fontSize : "2cqh"}}>no guests yet</h4>
              </>
            )}
          <CustomerForm customerForm={ customerJoinForm } setCustomerFormData={ setJoinFormData } handleSubmit={ handleJoinParty } loading={ joinPartyLoading } error={ joinPartyError } formTitle={'Add a guest'} submitText={'add guest'}/>
          
          {success && ( <Alert >Guest added.</Alert> )} 
          {joinPartyError && ( <Alert>Error adding guest.</Alert> )}
          
          </>
        )}
      </Container>
    </>
    )
}

export default AdminParty;
