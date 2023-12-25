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
  const [customerJoinForm, setJoinFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [eventForm, setEventFormData] = useState({});
  const [eventTime, setEventTime] = useState(Date(parseInt(data?.findEventByID.eventTime)));
  console.log(eventForm)

  useEffect(() => {
    if (data) {
      setEventTime(new Date(parseInt(data.findEventByID.eventTime)));
      setEventFormData( {...data?.findEventByID, eventTime: new Date(parseInt(data.findEventByID.eventTime))});

    }
  }, [data, joinPartyError]);


  const [updateEvent, { loading: loadingUpdateEvent, error: errorUpdateEvent }] = useMutation(UPDATE_EVENT);

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
      console.log(eventForm );
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
        setEventFormData({ ...eventForm, [name]: value });
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
                <Form.Group className="mb-3" controlId="formEventInfo">
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
                    <Form.Label htmlFor='eventLocation' style={{width: "100%"}} > 
                      location
                      <Form.Control
                          type="text"
                          placeholder="Event Address"
                          name="eventLocation"
                          defaultValue={eventForm?.eventLocation}
                          value={eventForm.eventLocation}
                          onChange={handleEventInputChange}
                      /> 
                    </Form.Label>
                    <Form.Label htmlFor='eventTitle' style={{width: "100%"}} >
                      title
                      <Form.Control

                          type="text" 
                          placeholder="Event Title"
                          name="eventTitle"
                          defaultValue={eventForm?.eventTitle}
                          value={eventForm.eventTitle}
                          onChange={handleEventInputChange}
                      />
                    </Form.Label>
                    <Form.Label htmlFor='eventNotes' style={{width: "100%"}} >
                      notes
                      <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Notes"
                          name="eventNotes"
                          defaultValue={eventForm?.eventNotes}
                          value={eventForm.eventNotes}
                          onChange={handleEventInputChange}
                      /> 
                    </Form.Label>

                    </Form.Group>
                   
                    <Form.Group className="mb-3" controlId="formEventInfo">
                    <Form.Label htmlFor='eventDisplay' style={{width: "100%"}} >
                      display
                    <Form.Control
                        type="text"
                        placeholder="Event Display"
                        name="EventDisplay"
                        defaultValue={eventForm?.EventDisplay}
                        value={eventForm.EventDisplay}
                        onChange={handleEventInputChange}
                    /> </Form.Label>
                    <Form.Label htmlFor='eventLeadEmployee' style={{width: "100%"}} >
                      bp lead
                    <Form.Control
                        type="text"
                        placeholder="Event Lead"
                        name="eventLeadEmployee"
                        defaultValue={eventForm?.eventLeadEmployee}
                        value={eventForm.eventLeadEmployee}
                        onChange={handleEventInputChange}
                    /> </Form.Label>
                    <Form.Label htmlFor='eventHelpers' style={{width: "100%"}} >
                      helpers
                    <Form.Control
                        type="text"
                        placeholder="Event Helpers"
                        name="eventHelpers"
                        defaultValue={eventForm?.eventHelpers}
                        value={eventForm.eventHelpers}
                        onChange={handleEventInputChange}
                    />  </Form.Label>


                 
                </Form.Group>
                <h4 style={{fontSize: "2cqh"}}>Event Contact</h4>
                <Form.Group className="mb-3" controlId="formEventInfo">
                        <Form.Label htmlFor='eventContact' style={{width: "100%"}} >
                          contact
                        <Form.Control
                            type="text"
                            placeholder="Event contact name"
                            name="name"
                            defaultValue={eventForm?.eventContact?.name}
                            value={eventForm.eventContact?.name}
                            onChange={handleEventInputChange}
                        /> </Form.Label>
                        <Form.Label htmlFor='eventContact' style={{width: "100%"}} >
                          email
                        <Form.Control
                            type="text"
                            placeholder="Event contact email"
                            name="email"
                            defaultValue={eventForm?.eventContact?.email}
                            value={eventForm.eventContact?.email}
                            onChange={handleEventInputChange}
                        />
                        </Form.Label>
                        <Form.Label htmlFor='eventContact' style={{width: "100%"}} >
                          phone
                        <Form.Control
                            type="text"
                            placeholder="Event contact phone"
                            name="phone"
                            defaultValue={eventForm?.eventContact?.phone}
                            value={eventForm.eventContact?.phone}
                            onChange={handleEventInputChange}
                        />
                        </Form.Label>
                        <Form.Label htmlFor='eventContact' style={{width: "100%"}} >
                          boot
                        <Form.Control
                            type="text"
                            placeholder="Event contact boot"
                            name="boot"
                            defaultValue={eventForm?.eventContact?.bootName}
                            value={eventForm.eventContact?.bootName}
                            onChange={handleEventInputChange}
                        />
                        </Form.Label>

                    </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmit">
                    <Button type="submit" disabled={loading}>
                    save changes
                    </Button>
                    
                    {error && <Alert>Error editing event</Alert>}
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
                <h4>no guests yet</h4>
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
