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
    <div style={{ minHeight: "580px", textAlign: "center", marginTop: "25px", width: "100%", display: "flex", alignContent: "center", justifyContent: "center"}}>
        <div style={{
          justifyContent: "center", 
          backgroundColor: "var(--alviesBlue)", 
          width: "100%", 
          height: "100%",
          maxWidth: "580px", 
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
