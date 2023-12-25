import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { EventDisplay } from '../components/pageElements';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../util/queries';
import { useMutation } from '@apollo/client';
import { EVENT_ADD_SIGNUP } from '../util/mutations';
import { CustomerForm } from './forms';
import { Link } from 'react-router-dom';

const ShareParty = () => {
  const { eventId } = useParams();
  const [customerForm, setCustomerFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [ joinParty, { loading: joinPartyLoading, error: joinPartyError }] = useMutation(EVENT_ADD_SIGNUP);

  const { loading: eventLoading, error: eventError, data } = useQuery(QUERY_EVENT, {
    variables: { uuid : eventId }, 
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await joinParty({
        variables: {
            eventId: eventId,
            customerInput: { ...customerForm },           
           
        }
    })
    .then((res) => {
    // Handle success
    console.log('Event created:', res.data);
    setCustomerFormData({ name: '', email: '', phone: '' });
    setSuccess(true);
    
    })
    .catch((err) => {
    // Handle error
    console.error('Error joining event:', err);
    });

  };
  

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
        paddingTop: "25px",
      }}>
      {eventLoading ? (
        <div>Loading...</div>
      ) : (
        <EventDisplay eventData={data.findEventByID}/>
      )}

      <CustomerForm customerForm={ customerForm } setCustomerFormData={ setCustomerFormData } handleSubmit={ handleSubmit } loading={ joinPartyLoading } error={ joinPartyError } formTitle={'JOIN THE PARTY'}/>
      
      {success && <Alert >Thanks for joining! <Link to={`/party/${eventId}`}>Back to the party!</Link></Alert>}
      {joinPartyError && <Alert>Error joining! <Link to={'mailto:holler@alvies.com'}>get at us</Link></Alert>}
      </div>
    </div>
  );
};

export default ShareParty;
