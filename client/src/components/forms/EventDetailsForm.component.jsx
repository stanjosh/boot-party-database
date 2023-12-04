import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../util/mutations';


const EventDetailsForm = ({ setCurrentStep }) => {
    const [eventForm, setEventFormData] = useState('');
    const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventForm );
        await createEvent({
            variables: {
                eventInput: { ...eventForm, 
                  eventTime: eventTime.toString(),
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

  return (

    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formEventInfo">
        <Form.Control
            as="textarea"
            rows={4}
            placeholder="Notes for us?"
            name="eventNotes"
            value={eventForm.eventNotes}
            onChange={handleEventInputChange}
        />
     
    </Form.Group>
    <Form.Group className="mb-3" controlId="formSubmit">
      <Button type="submit" disabled={loading}>
        next: share your boot party
      </Button>
      
      {error && <Alert>Error creating event</Alert>}
      </Form.Group>
    </Form>

  );
};

export default EventDetailsForm;
