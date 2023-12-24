import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const EventForm = ({ eventForm, setEventFormData, handleSubmit, loading, error }) => {
    const [eventTime, setEventTime] = useState(new Date());

    

    const handleEventInputChange = (e) => {
      const { name, value } = e.target;
      setEventFormData({ ...eventForm, [name]: value , eventTime: eventTime});
      console.log(eventForm);

    }

 

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
        value={eventForm.eventLocation}
        onChange={handleEventInputChange}
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
          value={eventForm.eventTitle}
          onChange={handleEventInputChange}
          style={{marginBottom: "15px"}}
      />
      <Form.Control
          as="textarea"
          rows={4}
          placeholder="Notes for us? (don't worry about it)"
          name="eventNotes"
          value={eventForm.eventNotes}
          onChange={handleEventInputChange}
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
