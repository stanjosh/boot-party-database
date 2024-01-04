import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { EventDisplay, GuestsDisplay } from '../components/pageElements';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';

const ShareParty = () => {
  const { eventId } = useParams();
  console.log(eventId)
  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });


  console.log(data)
  return (
    <>
      <Container fluid style={{ minHeight: '70cqh' }}>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <EventDisplay eventData={data?.findEventByID}/>
            <GuestsDisplay eventData={data?.findEventByID}/>
          </>
        )}


      </Container>
      
      
    </>
  );
};

export default ShareParty;
