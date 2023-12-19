import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../util/mutations';


const EventForm = ({ setCurrentStep }) => {
    const [eventForm, setEventFormData] = useState('');
    const [eventTime, setEventTime] = useState(new Date());
    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventForm );
        await createEvent({
            variables: {
                eventInput: { ...eventForm, 
                  eventContact: JSON.parse(localStorage.getItem('customer'))._id,
                  eventTime: eventTime.toJSON()
                },

            }
        })
        .then((res) => {
        // Handle success
        console.log('Event created:', res.data);
        localStorage.setItem('event', JSON.stringify(res.data.createEvent));
        window.location.assign(`/party/${JSON.parse(localStorage.getItem('event'))._id}`);
        })
        .catch((err) => {
        // Handle error
        console.error('Error creating event:', err);
        });

};

    const handleEventInputChange = (e) => {
      const { name, value } = e.target;
      setEventFormData({ ...eventForm, [name]: value });
      console.log(eventForm);

    }

 

  return (

    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formEventInfo" >
      <Form.Control
        type="text"
        placeholder="Event Address"
        name="eventLocation"
        value={eventForm.eventLocation}
        onChange={handleEventInputChange}
        required
      />
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
        required
      />
      <Form.Control
          type="text"
          placeholder="Title your event? (you don't have to)"
          name="eventTitle"
          value={eventForm.eventTitle}
          onChange={handleEventInputChange}
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
    <Form.Group controlId="formSubmit">
      <Button type="submit" disabled={loading}>
        next: share your boot party
      </Button>
      
      {error && <Alert>Error creating event</Alert>}
      </Form.Group>
    </Form>

  );
};

export default EventForm;
