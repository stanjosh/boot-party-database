import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../util/mutations';

const EventForm = ({ }) => {
    const [eventTime, setEventTime] = useState(new Date());
    
    const { formData, handleInputChange, handleSubmit } = useForm({
        eventTime: eventTime,
        eventLocation: '',
        eventTitle: '',
        eventNotes: '',
      },
      (formData) => writeEvent(formData)
    );
 
    const { eventLocation, eventTitle, eventNotes } = formData;

    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);
  


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

    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formEventInfo" style={{marginRight: "15px", marginLeft: "15px", }}>
      <Form.Group controlId="formEventInfo" style={{            
        display: "flex", 
        flexWrap: "nowrap", 
        textAlign: "right", 
        justifyContent: "center", 
        alignContent: "center",
        verticalAlign: "center",
        width: "100%",
        marginBottom: "15px",
      }}>

      <Form.Control
        type="text"
        placeholder="Event Address"
        name="eventLocation"
        value={eventLocation}
        onChange={handleInputChange}
        required
        style={{flex: "0 1 60%", marginRight: "15px"}}
      />
      <DatePicker
        style={{flex: "0 1 60%", borderRadius: "3px"}}
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
        required
      />
      </Form.Group>
      <Form.Control
          type="text"
          placeholder="Title your event? (you don't have to)"
          name="eventTitle"
          value={eventTitle}
          onChange={handleInputChange}
          style={{marginBottom: "15px"}}
      />
      <Form.Control
          as="textarea"
          rows={4}
          placeholder="Notes for us? (don't worry about it)"
          name="eventNotes"
          value={eventNotes}
          onChange={handleInputChange}
      />
     
    </Form.Group>
    <Form.Group controlId="formSubmit" style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%", 
            height: "100%",
            position: "relative",
            bottom: "0",
            left: "0",
            right: "0",

        }}>
      <Button type="submit" disabled={loading} style={{
          flex: "0 1 40%",
          boxShadow: "2px 2px 3px black",
          borderRadius: "0 0 3px 0",
          margin: "8px",
      }}>
        <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>SHARE IT</h3>
      </Button>
      
      {error && <Alert>Error creating event</Alert>}
      </Form.Group>
    </Form>

  );
};

export default EventForm;
