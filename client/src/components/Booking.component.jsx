import React, { useEffect, useState } from 'react';
import { CustomerForm, EventForm } from '../components/forms';




const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState('newCustomer');

  const getCurrentStep = () => {
    let component;
    switch (currentStep){
        case 'newCustomer' :
            component = <CustomerForm success={() => {setCurrentStep('newEvent')}} />;
            break;
        case 'newEvent' :
            component = <EventForm create={true}  />;
            break;
        default:
            component = <CustomerForm success={() => setCurrentStep('newEvent')}/>;
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
          padding: "15px",
        }}>
        {getCurrentStep()}
        </div>
    </div>
  );
};

export default CreateEventPage;
