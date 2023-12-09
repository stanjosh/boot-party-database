import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../util/mutations';


const EventDetailsForm = ({ setCurrentStep }) => {
    const [eventForm, setEventFormData] = useState('');
    const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventForm );
        await updateEvent({
            variables: {
                eventId: JSON.parse(localStorage.getItem('event'))._id,
                updateEventInput: { ...eventForm },
            }
        })
        .then((res) => {
        // Handle success
        localStorage.setItem('event', JSON.stringify(res.data.updateEvent));
        window.location.assign(`/party/${JSON.parse(localStorage.getItem('event'))._id}`);
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
      
      {error && <Alert>Error editing event</Alert>}
      </Form.Group>
    </Form>

  );
};

export default EventDetailsForm;
