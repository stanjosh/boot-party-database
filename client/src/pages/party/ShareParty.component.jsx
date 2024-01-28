import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { EventDisplay, GuestsDisplay } from '../../components/';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../util/queries';

const ShareParty = () => {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });


  
  return ( 
    <>
      <Container fluid style={{ minHeight: '70cqh', maxWidth: "650px", marginTop: "15px", marginBottom: "15px" }}>
        
        {
        loading ? <Alert>Loading...</Alert> 
        : error ? <Alert variant='danger'>We weren't able to find that party.</Alert> :
          
          <div style={{backgroundColor: "var(--alviesBlue)", padding: "5px", borderRadius: "3px"}}>
            <EventDisplay eventData={data?.findEventByID}/>
            <GuestsDisplay eventData={data?.findEventByID}/>
          </div>

        }


      </Container>
      
      
    </>
  );
};

export default ShareParty;
