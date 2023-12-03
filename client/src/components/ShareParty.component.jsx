import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  
  const partyURL = window.location.href.replace('party', 'join');
  
  return (
    <>
      <Container fluid style={{ minHeight: '50cqh' }}>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <EventDisplay eventData={data}/>
            <GuestsDisplay eventData={data}/>
          </>
        )}


      </Container>
      
      
      <Form style={{backgroundColor: 'aliceblue', width: '100%', textAlign: 'center', position: 'sticky', bottom: '0'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{display: 'flex', alignContent: 'center', height: '5cqb', margin: '2cqb' }}>
          <Form.Label><h2 style={{ fontSize: '3cqb'}}>Share</h2></Form.Label>
          <Form.Control type="email" placeholder={partyURL} style={{width: '60%'}}/>
          <Button style={{width: '40%'}} onClick={() => navigator.clipboard.writeText(partyURL)}>Copy</Button>
          
        </Form.Group>
        <Link to={partyURL}><h3 style={{fontSize: '2cqb'}}>(or go there yourself to add your friends manually)</h3></Link>
      </Form>
    </>
  );
};

export default ShareParty;
