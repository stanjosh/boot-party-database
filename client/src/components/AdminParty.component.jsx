import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { EventDisplay, GuestsDisplay } from '../components/pageElements';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';
import { UPDATE_EVENT } from '../util/mutations';
import { JoinForm } from './forms';

const AdminParty = () => {
  const { eventId } = useParams();

  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  console.log(data)
  const [eventForm, setEventFormData] = useState({});

  console.log(eventForm)

  const [updateEvent, { loadingUpdateEvent, errorUpdateEvent }] = useMutation(UPDATE_EVENT);

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


 


  return (
    <>
      <Container fluid style={{ minHeight: '70cqh', backgroundColor: "#009ceb" }}>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Form  onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEventInfo">
                    <Form.Control
                        type="text"
                        placeholder="Event Address"
                        name="eventLocation"
                        defaultValue={data.findEventByID.eventLocation}
                        value={eventForm.eventLocation}
                        onChange={handleEventInputChange}
                    /> 
                    <Form.Control
                        type="date"
                        placeholder="Event Date"
                        name="eventLocation"
                        defaultValue={data.findEventByID.eventDate}
                        value={eventForm.eventTime}
                        onChange={handleEventInputChange}
                    />
                                        <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Notes for us?"
                        name="eventNotes"
                        defaultValue={data.findEventByID.eventNotes}
                        value={eventForm.eventNotes}
                        onChange={handleEventInputChange}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEventInfo">
                        <Form.Control
                            type="text"
                            placeholder="Event Contact"
                            name="name"
                            defaultValue={data.findEventByID.eventContact?.name}
                            value={eventForm.eventContact?.name}
                            onChange={handleEventInputChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Event Contact"
                            name="email"
                            defaultValue={data.findEventByID.eventContact?.email}
                            value={eventForm.eventContact?.name}
                            onChange={handleEventInputChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Event Contact"
                            name="phone"
                            defaultValue={data.findEventByID.eventContact?.phone}
                            value={eventForm.eventContact?.phone}
                            onChange={handleEventInputChange}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Event Contact"
                            name="boot"
                            defaultValue={data.findEventByID.eventContact?.boot}
                            value={eventForm.eventContact?.boot}
                            onChange={handleEventInputChange}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEventInfo">
                    <Form.Control
                        type="text"
                        placeholder="Event Display"
                        name="EventDisplay"
                        defaultValue={data.findEventByID.EventDisplay}
                        value={eventForm.EventDisplay}
                        onChange={handleEventInputChange}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Event Lead"
                        name="eventLeadEmployee"
                        defaultValue={data.findEventByID.eventLeadEmployee}
                        value={eventForm.eventLeadEmployee}
                        onChange={handleEventInputChange}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Event Helpers"
                        name="eventHelpers"
                        defaultValue={data.findEventByID.eventHelpers}
                        value={eventForm.eventHelpers}
                        onChange={handleEventInputChange}
                    />


                 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubmit">
                    <Button type="submit" disabled={loading}>
                    save changes
                    </Button>
                    
                    {error && <Alert>Error editing event</Alert>}
                    </Form.Group>
                </Form>

            { data.findEventByID.eventSignups.length > 0 ? (
                <Container>
                {data.findEventByID.eventSignups.map((guest) => (
                    <Container key={guest._id} style={{backgroundColor: "aliceblue", padding: "2px", margin: "2px", border: "2px solid var(--alviesDarkBlue)"}}>
                        <p>{guest.name}</p>
                        <p>{guest.email}</p>
                        <p>{guest.phone}</p>
                    </Container>
                    ))
                }
                
              </Container>
            ) : (
              <>
                <h4>no guests yet</h4>
                
              </>
            )}

            <JoinForm />

          </>
        )}


      </Container>
      
      
     
    </>
  );
};

export default AdminParty;
