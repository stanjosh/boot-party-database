import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CustomerForm, EventForm, EventDetailsForm } from '../components/forms';
import ShareParty from './ShareParty.component';


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
        <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center", backgroundColor: "aliceblue", width: "100%", maxWidth: "780px"}}>
        {getCurrentStep()}
        </Container>
    </Container>
  );
};

export default CreateEventPage;
