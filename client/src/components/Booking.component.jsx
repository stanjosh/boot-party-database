import React, { useState } from 'react';
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
    <div>
      <h1>Book a Boot Party</h1>
      {getCurrentStep()}
    </div>
  );
};

export default CreateEventPage;
