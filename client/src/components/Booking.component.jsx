import React, { useEffect, useState } from 'react';
import { GuestForm, EventForm } from '../components/forms';




const CreateEventPage = () => {
  const [guestId, setGuestId] = useState('');
  
  

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "70vh"}}>
    <div style={{textAlign: "center", padding: "15px", marginTop: "25px", width: "100%", maxWidth: "780px", display: "flex", alignContent: "center", justifyContent: "center", backgroundColor: "var(--alviesBlue)",  borderRadius: "3px" }}>
        
        {guestId         
          ? <EventForm guestId={guestId} create/>
          : <GuestForm success={(guestId) => setGuestId(guestId)}/>
        }
      
    </div>
    </div>
  );
};

export default CreateEventPage;
