import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../util/hooks';

const EventAdminForm = ({ event }) => {
    const { formData, handleInputChange, handleSubmit } = useForm({
        eventLeadEmployee: event?.eventLeadEmployee ?? '',
        eventHelpers: event?.eventHelpers ?? '',
        eventDisplay: event?.eventDisplay ?? '',
      },
      (formData) => writeEvent(formData)
    );

    const { eventLeadEmployee, eventHelpers, eventDisplay } = formData;

    return (
        <Form onSubmit={handleSubmit} >

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
            <Form.Label>display</Form.Label>
            <Form.Control
                as="textarea"
                rows={4}
                placeholder=""
                name="eventDisplay"
                value={eventDisplay}
                onChange={handleInputChange}
            />
            </Form.Group>


            <Button variant="danger" style={{width: "100%", marginTop: "15px"}}>DELETE EVENT</Button>
        </Form>
    );
};

export default EventAdminForm;
