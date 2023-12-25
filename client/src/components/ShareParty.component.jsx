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
      
      
      <Form style={{backgroundColor: 'aliceblue', width: '100%', textAlign: 'center', position: 'sticky', bottom: '0', padding: "8cqw", marginTop: "15px"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{display: 'flex', alignContent: 'center', height: '5cqb' }}>
          <Form.Label><h2 style={{ fontSize: '3cqb'}}>Share</h2></Form.Label>
          <Form.Control type="email" placeholder={`${window.location.origin}/join/${eventId}`} style={{width: '60%'}}/>
          <Button style={{width: '40%'}} onClick={() => navigator.clipboard.writeText(`${window.location.origin}/join/${eventId}`)}>Copy</Button>
          
        </Form.Group>
        <Link to={`/join/${eventId}`}><h3 style={{fontSize: '2cqb'}}>(or go there yourself to add your friends manually)</h3></Link>
      </Form>
    </>
  );
};

export default ShareParty;
