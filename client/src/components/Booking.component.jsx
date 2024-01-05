import React, { useEffect, useState } from 'react';
import { GuestForm, EventForm } from '../components/forms';




const CreateEventPage = () => {
  const [guestId, setGuestId] = useState('');
  
  

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
        {guestId         
          ? <EventForm guestId={guestId} create/>
          : <GuestForm success={(guestId) => setGuestId(guestId)}/>
        }
        </div>
    </div>
  );
};

export default CreateEventPage;
