import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
                  eventContact: JSON.parse(localStorage.getItem('customer'))._id },

            }
        })
        .then((res) => {
        // Handle success
        console.log('Event created:', res.data);
        localStorage.setItem('event', JSON.stringify(res.data.createEvent));
        setCurrentStep('stepC');
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

    const handleTimeInputChange = (e) => {
        setEventTime(e);
        setEventFormData({ ...eventForm, eventTime: eventTime.getTime().toString() });
        console.log(eventForm);
    }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formEventInfo">
        <Form.Control
            type="text"
            placeholder="Event Address"
            name="eventLocation"
            value={eventForm.eventLocation}
            onChange={handleEventInputChange}
        />
      <DatePicker
        selected={eventTime}
        onChange={handleTimeInputChange}
        showTimeSelect
        dateFormat="Pp"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formSubmit">
      <Button type="submit" disabled={loading}>
        next: more details
      </Button>
      {error && <p>Error creating event</p>}
      </Form.Group>
    </Form>
  );
};

export default EventForm;
