import React, { useEffect, useState, useContext } from 'react';
import { GuestForm, EventForm } from '../forms';
import { UserContext } from '../../util/context/UserContext';



const CreateEventPage = () => {
  const [guestId, setGuestId] = useState('');
  
  const { userData } = useContext(UserContext);

  const guestData = userData?.guestProfile;


  const { admin, partner } = userData?.me || false;

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "70vh"}}>
    <div style={{textAlign: "center", padding: "15px", marginTop: "25px", width: "100%", maxWidth: "780px", display: "flex", alignContent: "center", justifyContent: "center", backgroundColor: "var(--alviesBlue)",  borderRadius: "3px" }}>
        
        
        
      
      
    </div>
    </div>
  );
};

export default CreateEventPage;
