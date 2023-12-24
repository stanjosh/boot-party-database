import React, { useState } from 'react';
import { CustomerForm, EventForm } from '../components/forms';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT, CREATE_CUSTOMER } from '../util/mutations';



const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState('stepA');
  const [customerForm, setCustomerFormData] = useState({});
  const [eventForm, setEventFormData] = useState({});
  const [createCustomer, { loading: customerLoading, error: customerError }] = useMutation(CREATE_CUSTOMER);
  const [createEvent, { loading: eventLoading, error: eventError }] = useMutation(CREATE_EVENT);

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    console.log(customerForm);
    await createCustomer({
        variables: {
            customerInput: { ...customerForm },           
           
        }
    })
    .then((res) => {
    // Handle success
    console.log('Event created:', res.data);
    localStorage.setItem('customer', JSON.stringify(res.data.createCustomer));
    setCurrentStep('stepB');
    })
    .catch((err) => {
    // Handle error
    console.error('Error creating event:', err);
    });

};



  const handleEventSubmit = async (e) => {
    e.preventDefault();
    console.log(eventForm );
    await createEvent({
        variables: {
            eventInput: { ...eventForm, 
              eventContact: JSON.parse(localStorage.getItem('customer'))._id,
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

  

  const getCurrentStep = () => {
    let component;
    switch (currentStep){
        case 'stepA' :
            component = <CustomerForm customerForm={ customerForm } setCustomerFormData={ setCustomerFormData } handleSubmit={ handleCustomerSubmit } loading={ customerLoading } error={ customerError }/>;
            break;
        case 'stepB' :
            component = <EventForm eventForm={ eventForm } setEventFormData={ setEventFormData } handleSubmit={ handleEventSubmit } loading={ eventLoading } error={ eventError }/>;
            break;
        default:
            component = <CustomerForm customerForm setCustomerFormData handleCustomerSubmit/>;
    }
    return component;
}

  return (
    <div style={{ minHeight: "780px", textAlign: "center", marginTop: "25px", width: "100%", display: "flex", alignContent: "center", justifyContent: "center"}}>
        <div style={{
          justifyContent: "center", 
          backgroundColor: "var(--alviesBlue)", 
          width: "100%", 
          height: "100%",
          maxWidth: "780px", 
          marginBottom: "25px",
          borderRadius: "3px",
          paddingTop: "25px",
        }}>
        {getCurrentStep()}
        </div>
    </div>
  );
};

export default CreateEventPage;
