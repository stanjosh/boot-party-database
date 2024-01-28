import { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../../util/hooks';
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../util/mutations';
import { UserContext } from '../../util/context/UserContext';


const EventForm = ({ eventData, formTitle, submitText, admin }) => {
  
    const { userData, loading: contextLoading } = useContext(UserContext);
  
    const [time, setTime] = useState(new Date());
    const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT);
    

    const [publicEvent, setPublicEvent] = useState((eventData?.partner?._id && eventData?.partner?._id === userData?.partner?._id) ? true : false);

    const today = new Date();
    
    const { formData, handleInputChange, handleSubmit } = useForm({
          time: time,
          location: eventData?.location ?? '',
          title: eventData?.title ?? '',
          notes: eventData?.notes ?? '',
          name: userData?.name ?? '',
          email: userData?.email ?? '',
          phone: userData?.phone ?? '',

        },
      (formData) => writeEvent(formData)
    );
 
    const { location, title, notes, name, email, phone } = formData;
    

    const handleTimeChange = (date) => {
        setTime(date);
        handleInputChange({target: {name: 'time', value: date}})
        console.log('time changed', formData);
    };




    const writeEvent = async (formData) => {
      await updateEvent({
          variables: {
              eventId: eventData?._id ?? null,
              updateEventInput: {
                partner: publicEvent ? userData?.partner?._id : null,
                time: formData.time,
                location: formData.location,
                title: formData.title,
                notes: formData.notes,
                contact: {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                },
                
                
              },

          }
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

  return (
    <Form onSubmit={handleSubmit} >
      <h4 style={{color: "aliceblue", marginBottom: "15px", fontSize: "3cqb" }}>{formTitle ? formTitle : 'event details'}</h4>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
      
      
      <Form.Group controlId="formEventAddress" style={{flex: "0 1 60%"}}>
      {admin ? <Form.Label>address</Form.Label> : null}
      <Form.Control
        type="text"
        placeholder="Event Address"
        name="location"
        value={location}
        onChange={handleInputChange}
        required
        
      />
      </Form.Group>

      <Form.Group controlId="formTime" style={{flex: "0 1"}}>
      {admin ? <Form.Label>time</Form.Label> : null}
      
      <DatePicker
        style={{flex: "0 1 60%", borderRadius: "3px"}}
        name='time'
        excludeDates={[today.setDate(today.getDate()), today.setDate(today.getDate() + 1)]}
        selected={formData?.time}
        onChange={(date) => handleTimeChange(date)}
        value={formData?.time}
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

      <Form.Group controlId="formTitle" style={{marginBottom: "10px"}} >
      {admin ? <Form.Label>event title</Form.Label> : null}
      <Form.Control
          type="text"
          placeholder="Title your event? (you don't have to)"
          name="title"
          value={title}
          onChange={handleInputChange}
      />
      </Form.Group>

      
      <Form.Group controlId="formNotes" style={{marginBottom: "10px"}} >
      {admin ? <Form.Label>notes</Form.Label> : null}
      <Form.Control
          as="textarea"
          rows={4}
          placeholder="Notes for us? (don't worry about it)"
          name="notes"
          value={notes}
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
        {publicEvent ? <p style={{color: "aliceblue", fontSize: "2.5cqh"}}>This event will be a public {userData?.partner?.name} event </p> : null}
        <div style={{fontSize:"1.5cqh"}}>
        <Form.Check
          type="switch"
          id="custom-switch"
          selected={publicEvent}
          onChange={() => setPublicEvent(!publicEvent)}
          label={publicEvent ? 'This will be a private event' : <strong>This will be a private event</strong> }
          style={{color: "aliceblue"}}
        />
        </div>
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

