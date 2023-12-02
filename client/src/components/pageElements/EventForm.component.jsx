import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../../util/mutations';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [userForm, setUserFormData] = useState('');

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } else {
    e.preventDefault();
    createEvent({
      variables: {
        ...userForm
      },
    })
      .then((res) => {
        // Handle success
        console.log('Event created:', res.data);
      })
      .catch((err) => {
        // Handle error
        console.error('Error creating event:', err);
      });
      
  }};



  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <textarea
        placeholder="What time do you want to start fittings?"
        value={userForm.eventTime}
        onChange={(e) => setUserFormData(e.target.value)}
      />
      <textarea
        placeholder="What time can we set up our area? (optional)"
        value={userForm.eventLoadinTime}
        onChange={(e) => setUserFormData(e.target.value)}
      />
      <textarea
        placeholder="Other Notes (optional)"
        value={userForm.eventNotes}
        onChange={(e) => setUserFormData(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Create Event
      </button>
      {error && <p>Error creating event</p>}
    </form>
  );
};

export default EventForm;
