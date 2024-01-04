import React, { useEffect, useState } from 'react';
import { CustomerForm, EventForm } from '../components/forms';




const CreateEventPage = () => {
  const [customerId, setCustomerId] = useState('');
  
  

  return (
    <div style={{ marginBottom: "25px", textAlign: "center", marginTop: "25px", width: "100%", display: "flex", alignContent: "center", justifyContent: "center"}}>
      <div className='form-container'>
        {customerId         
          ? <EventForm customerId={customerId} create/>
          : <CustomerForm success={(customerId) => setCustomerId(customerId)}/>
        }
      </div>
    </div>
  );
};

export default CreateEventPage;
