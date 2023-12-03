import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { EventDisplay } from '../components/pageElements';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';
import { JoinForm } from './forms';

const ShareParty = () => {
  const { eventId } = useParams();
  console.log(eventId)
  
  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  

  const url = window.location.href;

  console.log(url)

  

  return (
    <>
      <h1 style={{fontSize: '12cqw'}}>BOOT PARTY</h1>
      <Container fluid style={{ height: '30cqh'}}>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <EventDisplay eventData={data}/>
        )}
        
      </Container>
      
      <JoinForm/>
      


    </>
  );
};

export default ShareParty;
