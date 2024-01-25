import React, { useEffect, useState, useContext } from 'react';
import { GuestForm, EventForm } from '../components/forms';
import { UserContext } from '../util/context/UserContext';



const CreateEventPage = () => {
  const [guestId, setGuestId] = useState('');
  
  const { userData } = useContext(UserContext);

  const guestData = userData?.guestProfile || {};




  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "70vh"}}>
    <div style={{textAlign: "center", padding: "15px", marginTop: "25px", width: "100%", maxWidth: "780px", display: "flex", alignContent: "center", justifyContent: "center", backgroundColor: "var(--alviesBlue)",  borderRadius: "3px" }}>
        
        {guestId         
          ? <GuestForm guest={guestData} success={(guestId) => setGuestId(guestId)}/>
          : <EventForm guestId={guestId} submitText='choose your boots' create/>
        }
      
    </div>
    </div>
  );
};

export default CreateEventPage;
