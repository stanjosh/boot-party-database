require('dotenv').config();
const { google } = require('googleapis');

const calendar = google.calendar('v3');
const dayjs = require('dayjs');




const keysEnvVar = process.env.CREDENTIALS;
if (!keysEnvVar) {
  throw new Error('Please set the CREDENTIALS environment variable.');
}

const keys = JSON.parse(keysEnvVar);
console.log(keys);

const client = new google.auth.JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar'],
  subject: process.env.SUBJECT
});

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connected to Google API');
    return;
  }
  }
);






const calendarId = process.env.CALENDAR_ID;


const TIMEOFFSET = '-06:00';

const insertNewEvent = async (eventData) => {
  
  
  
  if (!eventData) {
    throw new Error('Please provide an event data object.');
  }
  console.log(eventData);

  const startDate = dayjs(eventData?.time * 1);
  const endDate = dayjs(eventData?.time * 1).add(2, 'hour');


  const template = `
  <a href="https://bootparty.com/admin/party/${eventData?._id}"> ADMIN PARTY </a>
  
  Event time: ${dayjs(eventData?.time * 1).format('dddd, MMMM D, YYYY h:mm A')}

  ${eventData?.loadTime ? `Set-up start time: ${eventData?.loadTime}` : ''}

  Number of guests: ${eventData?.guests?.length}

  ${eventData?.helpers ? `Brand Besties needed: ${eventData?.helpers}` : ''}

  Location details: <a href="https://www.google.com/maps/dir/?api=1&destination=${eventData?.location}">${eventData?.location}</a>

  Point of Contact for event: ${eventData?.contact?.name}

  ${eventData?.contact?.phone ? `Point of Contact phone number: ${eventData?.contact?.phone}` : 'no phone number provided'}

  Point of Contact email: ${eventData?.contact?.email}

  Display details: ${eventData?.display}

  Gifting or pay: Pay

  Merch box accessibility: TBD 

  Add-ons (laser): Yes TBD

  Additional notes if needed: ${eventData?.notes}

  
  
  
  `


  const event = {
    'summary': eventData?.title ? eventData?.title : eventData?.location,
    'location': eventData?.location,
    'description': template,
    'start': {
      'dateTime': startDate.toISOString(),
      'timeZone': 'America/Chicago'
    },
    'end': {
      'dateTime': endDate.toISOString(),
      'timeZone': 'America/Chicago'
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 }
      ]
    }
  }



  try {
    const response = calendar.events.insert({
      auth: client,
      calendarId: calendarId,
      requestBody: event,
    });
    if (response['status'] == 200 && response['statusText'] === 'OK') {
      return "Event inserted successfully";
    } else {
      return "Failed to insert event";
    } 
  } catch (err) {
    console.log(err);
    return "Failed to insert event";
  }

}

module.exports = insertNewEvent;