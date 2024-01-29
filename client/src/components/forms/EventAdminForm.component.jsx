
import { Button, Form } from 'react-bootstrap';
import { useForm } from '../../util/hooks';
import { CopyToCalendar } from '../forms/buttons';

const EventAdminForm = ({ eventData }) => {
    const { formData, handleInputChange, handleSubmit } = useForm({
        eventLeadEmployee: eventData?.eventLeadEmployee ?? '',
        eventHelpers: eventData?.eventHelpers ?? '',
        eventDisplay: eventData?.eventDisplay ?? '',
      },
      (formData) => writeEvent(formData)
    );

    const writeEvent = async (formData) => {
        await updateEvent({
            variables: {
                eventId: eventData?._id ?? null,
                updateEventInput: {
                    eventLeadEmployee: formData.eventLeadEmployee,
                    eventHelpers: formData.eventHelpers,
                    eventDisplay: formData.eventDisplay,
                  },
                  
                  
                },
  
            
        })
        .then((res) => {
          console.log('Event created:', res.data);
          localStorage.setItem('event', JSON.stringify(res.data.updateEvent));
          window.location.assign(`/party/${JSON.parse(localStorage.getItem('event'))._id}`);
        })
        .catch((err) => {
          console.error('Error creating event:', err);
        });
    
      };
    

    const { eventLeadEmployee, eventHelpers, eventDisplay } = formData;



    return (
        <>
            <CopyToCalendar eventData={eventData} />
            <Button variant="danger" style={{margin: "15px"}}>DELETE EVENT</Button>
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

            <Button type="submit" className='formButtom'> save </Button>

        </Form>
        
        </>
    );
};

export default EventAdminForm;
