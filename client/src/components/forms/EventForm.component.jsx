import { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, UPDATE_GUEST } from '../../util/mutations';
import { UserContext } from '../../util/context/UserContext';
import { propTypes } from 'react-bootstrap/esm/Image';

const EventForm = ({ eventData, formTitle, submitText, admin }) => {
  
    const { userData, loading: contextLoading } = useContext(UserContext);
  
    const [eventTime, setEventTime] = useState(new Date());
    const [createEvent, { loading: createEventLoading, error: createEventError }] = useMutation(CREATE_EVENT);
    const [updateGuest, { loading: updateGuestLoading, error: updateGuestError }] = useMutation(UPDATE_GUEST);

    const error = createEventError || updateGuestError;
    const loading = createEventLoading || updateGuestLoading || contextLoading;

    const [publicEvent, setPublicEvent] = useState(true);

    const today = new Date();
    
    const { formData, handleInputChange, handleSubmit } = useForm({
          eventTime: eventTime,
          eventLocation: eventData?.eventLocation ?? '',
          eventTitle: eventData?.eventTitle ?? '',
          eventNotes: eventData?.eventNotes ?? '',
          name: userData?.guestProfile?.name ?? '',
          email: userData?.guestProfile?.email ?? '',
          phone: userData?.guestProfile?.phone ?? '',
        },
      (formData) => writeEvent(formData)
    );
 
    const { eventLocation, eventTitle, eventNotes, name, email, phone } = formData;

    const handleTimeChange = (date) => {
        setEventTime(date);
        handleInputChange({target: {name: 'eventTime', value: date}})
        console.log('time changed', formData);
    };




    const writeEvent = async (formData) => {
      const guest = await updateGuest({
          variables: {
              guestInput: { 
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
               },
          }
      })


      await createEvent({
          variables: {
              eventInput: { 
                eventTime: formData.eventTime,
                eventLocation: formData.eventLocation,
                eventTitle: formData.eventTitle,
                eventNotes: formData.eventNotes,
                eventPartner: publicEvent ? userData?.partner?._id : null,
                eventContact: guest?.data?.updateGuest?._id,
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
      <h4 style={{color: "aliceblue", marginBottom: "15px", fontSize: "3cqb" }}>{formTitle ? formTitle : 'event details'}</h4>
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
        selected={formData?.eventTime}
        onChange={(date) => handleTimeChange(date)}
        value={formData?.eventTime}
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

      <Form.Group controlId="formGuestInfo" >
        <Form.Control
          type="text"
          placeholder='name'
          name="name"
          value={name}
          onChange={handleInputChange}
          required
          className='mb-3'
        />
        <Form.Control
          type="text"
          placeholder='email'
          name="email"
          value={email}
          onChange={handleInputChange}
          required
          className='mb-3'
        />
        <Form.Control
          type="text"
          placeholder='phone (optional)'
          name="phone"
          maxLength={14}
          value={phone.replace(/(\d{3})(\d{3})(\d{4})?/g,'($1)-$2-$3')}
          onChange={handleInputChange} 
          className='mb-3'
        />
      </Form.Group>


    { userData?.partner ? 
    <Form.Group controlId="formCancel" style={{width: "100%", marginRight: "15px", alignItems:"flex-end"}}>
        
        <Form.Check
          type="switch"
          id="custom-switch"
          selected={publicEvent}
          onChange={() => setPublicEvent(!publicEvent)}
          label={publicEvent ? 'This will be a private event' : <strong>This will be a private event</strong> }
          style={{color: "aliceblue"}}
        />
        
    </Form.Group>

    : null }
    
    
    <Form.Group controlId="formSubmit" style={{width: "100%", marginRight: "15px", alignItems:"flex-end"}}>
        <Button type="submit" disabled={ loading } style={{
            flex: "0 1 40%",
            boxShadow: "2px 2px 3px black",
            borderRadius: "0 0 3px 0",
            margin: "8px",
            justifySelf: "flex-end",
        }}>
            {submitText || <h3 style={{fontSize : "2.5cqh", color: "aliceblue", marginBottom : "0"}}>LET&apos;S GO</h3>}
        </Button>
    </Form.Group>
      {error && <Alert>Error updating event</Alert>}
      
    </Form>

  );
};

export default EventForm;


EventForm.propTypes = {
  eventData: propTypes.object,
  formTitle: propTypes.string,
  submitText: propTypes.string,
  admin: propTypes.bool,
};