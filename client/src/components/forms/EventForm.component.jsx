import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../util/mutations';

const EventForm = ({ eventData, formTitle, submitText, admin }) => {
    const [eventTime, setEventTime] = useState(new Date().setDate(parseInt(eventData?.eventTime)) || new Date());
    console.log(eventData)
    const { formData, handleInputChange, handleSubmit } = useForm({
        eventTime: eventTime,
        eventLocation: eventData?.eventLocation ?? '',
        eventTitle: eventData?.eventTitle ?? '',
        eventNotes: eventData?.eventNotes ?? '',
        eventLeadEmployee: eventData?.eventLeadEmployee ?? '',
        eventHelpers: eventData?.eventHelpers ?? '',
        eventDisplay: eventData?.eventDisplay ?? '',
      },
      (formData) => writeEvent(formData)
    );
 
    const { eventLocation, eventTitle, eventNotes, eventLeadEmployee, eventHelpers, eventDisplay } = formData;

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);
  
    const today = new Date();

    const writeEvent = async (formData) => {
      await createEvent({
          variables: {
              eventInput: { ...formData, 
                eventContact: JSON.parse(localStorage.getItem('customer'))._id,
              },
  
          }
      })
      .then((res) => {
        console.log('Event created:', res.data);
        localStorage.setItem('event', JSON.stringify(res.data.createEvent));
        window.location.assign(`/party/${JSON.parse(localStorage.getItem('event'))._id}`);
      })
      .catch((err) => {
        console.error('Error creating event:', err);
      });
  
    };

  return (
    <Form onSubmit={handleSubmit} >
      <h4 style={{color: "aliceblue", marginBottom: "15px", fontSize: "3cqb" }}>event details</h4>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
      
      
      <Form.Group controlId="formEventAddress" style={{flex: "0 1 60%"}}>
      {admin ? <Form.Label>address</Form.Label> : null}
      <Form.Control
        type="text"
        placeholder="Event Address"
        name="eventLocation"
        value={eventLocation}
        onChange={handleInputChange}
        required
        
      />
      </Form.Group>

      <Form.Group controlId="formEventTime" style={{flex: "0 1"}}>
      {admin ? <Form.Label>time</Form.Label> : null}
      
      <DatePicker
        style={{flex: "0 1 60%", borderRadius: "3px"}}
        name='eventTime'
        excludeDates={[today.setDate(today.getDate()), today.setDate(today.getDate() + 1)]}
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
        required
      />
      </Form.Group>
      </div>

      <Form.Group controlId="formEventTitle" style={{marginBottom: "10px"}} >
      {admin ? <Form.Label>event title</Form.Label> : null}
      <Form.Control
          type="text"
          placeholder="Title your event? (you don't have to)"
          name="eventTitle"
          value={eventTitle}
          onChange={handleInputChange}
      />
      </Form.Group>

      
      <Form.Group controlId="formEventNotes" style={{marginBottom: "10px"}} >
      {admin ? <Form.Label>notes</Form.Label> : null}
      <Form.Control
          as="textarea"
          rows={4}
          placeholder="Notes for us? (don't worry about it)"
          name="eventNotes"
          value={eventNotes}
          onChange={handleInputChange}
      />
      </Form.Group>


      
      <div hidden={!admin} style={{marginBottom: "15px"}}>
      <h4 style={{color: "aliceblue", marginBottom: "15px", marginTop: "15px", fontSize: "3cqb" }}>alvies details</h4>
      <Form.Group controlId="formEventLeadEmployee"  style={{marginBottom: "10px"}}>
      <Form.Label>lead</Form.Label>
      <Form.Control
          type="text"
          placeholder=""
          name="eventLeadEmployee"
          value={eventLeadEmployee}
          onChange={handleInputChange}
      />
      </Form.Group>
      <Form.Group controlId="formEventHelpers" style={{marginBottom: "10px"}} >
      <Form.Label>helpers</Form.Label>
      <Form.Control
          as="textarea"
          rows={4}
          placeholder=""
          name="eventHelpers"
          value={eventHelpers}
          onChange={handleInputChange}
      />
      </Form.Group>
      <Form.Group controlId="formEventDisplay" style={{marginBottom: "10px"}} >
      {admin ? <Form.Label>display</Form.Label> : null}
      <Form.Control
          as="textarea"
          rows={4}
          placeholder=""
          name="eventDisplay"
          value={eventDisplay}
          onChange={handleInputChange}
      />
      </Form.Group>
      </div>

    <Form.Group controlId="formSubmit" style={{width: "100%", marginRight: "15px", alignItems:"flex-end"}}>
        <Button type="submit" disabled={ loading } style={{
            flex: "0 1 40%",
            boxShadow: "2px 2px 3px black",
            borderRadius: "0 0 3px 0",
            margin: "8px",
            justifySelf: "flex-end",
        }}>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET'S GO</h3>}
        </Button>
    </Form.Group>
      {error && <Alert>Error updating event</Alert>}
      
    </Form>

  );
};

export default EventForm;
