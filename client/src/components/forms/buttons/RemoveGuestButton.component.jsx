import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EVENT_REMOVE_SIGNUP } from '../../../util/mutations';

const RemoveGuestButton = ({eventId, guestId}) => {
    const [removeGuest, { loading, error }] = useMutation(EVENT_REMOVE_SIGNUP);
    const [confirm, setConfirm] = useState(false);

    const handleRemoveGuest = async (e) => {
        e.preventDefault();
        await removeGuest({
            variables: {
                eventId: eventId,
                guestId: guestId,           
               
            }
        })
        .then((res) => {
          // Handle success
          console.log('Joined party:', res.data);
          
          })
          .catch((err) => {
          // Handle error
          console.error('Error joining party:', err);
          });
        }

    return (
        
        <Form.Group controlId="formRemoveGuest" style={{flex: "0 1 60%", padding: "5px"}}>
        { !error ? !confirm 
            ? <Button type="button" onClick={() => setConfirm(true)} disabled={loading} className='formButtom'>
                delete
            </Button> 
            : <Button type='button' variant="danger" onClick={handleRemoveGuest} disabled={loading} className='formButtom'>
                confirm
            </Button>
            : <div style={{color: "red"}}>Error removing guest</div>
            }
        </Form.Group>
        
    );
};

export default RemoveGuestButton;

