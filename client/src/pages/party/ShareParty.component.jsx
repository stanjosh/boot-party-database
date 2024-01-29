import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { EventDisplay } from '../../components/';


const ShareParty = () => {
  const { eventId } = useParams();



  
  return ( 
    <>
      <Container fluid style={{ minHeight: '70cqh', maxWidth: "650px", marginTop: "15px", marginBottom: "15px" }}>

          <div style={{backgroundColor: "var(--alviesBlue)", padding: "5px", borderRadius: "3px"}}>
            <EventDisplay eventId={eventId}/>
            
          </div>




      </Container>
      
      
    </>
  );
};

export default ShareParty;
