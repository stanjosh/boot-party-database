import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CustomerForm, EventForm, EventDetailsForm } from '../components/forms';


const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState('stepA');

  const getCurrentStep = () => {
    let component;
    switch (currentStep){
        case 'stepA' :
            component = <CustomerForm setCurrentStep={setCurrentStep}/>;
            break;
        case 'stepB' :
            component = <EventForm setCurrentStep={setCurrentStep}/>;
            break;
        case 'stepC' :
            component = <EventDetailsForm setCurrentStep={setCurrentStep}/>;
            break;
        default:
            component = <CustomerForm setCurrentStep={setCurrentStep}/>;
    }
    return component;
}

  return (
    <Container fluid style={{ minHeight: '90cqh', textAlign: "center"}}>
      <h1 style={{fontSize: '12cqw'}}>BOOK A BOOT PARTY</h1>

        {getCurrentStep()}

    </Container>
  );
};

export default CreateEventPage;
