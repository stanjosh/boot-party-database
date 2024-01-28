const { google } = require('googleapis');
require('dotenv').config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const calendar = google.calendar('v3');



const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

const TIMEOFFSET = '-06:00';


const template = (eventData = {}) `
  Event time: 

  Fitting time if different

  Set-up start time: ${eventData?.eventTime}

  Number of guests: ${evenData?.eventGuests.length}

  Brand Besties needed: ${eventData?.eventHelpers}

  Location details: ${eventData?.eventLocation}

  Point of Contact for event: ${eventData?.eventContact?.name}

  Point of Contact phone number: ${eventData?.eventContact?.phone}

  Point of Contact email: ${eventData?.eventContact?.email}

  

  Gifting or pay: Pay

  Display details: ${eventData?.eventDisplay}

  Merch box accessibility: TBD 

  Add-ons (laser): Yes TBD

  Additional notes if needed: 
  `


dateTimeForCalendar = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  const hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  const min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  
  const newDateTime = `${year}-${month}-${day}T${hour}:${min}:00.000${TIMEOFFSET}`;
  const event = new Date(Date.parse(newDateTime));

  const startDate = event;
  const endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

  return {
    'start': startDate,
    'end' : endDate
  }
}





const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event
    });
    if (response['status'] == 200 && response['statusText'] === 'OK') {
      return "Event inserted successfully";
    } else {
      return "Failed to insert event";
    } 
  } catch (err) {
    console.log(err);
    return 0;
  }
};

let dateTime = dateTimeForCalendar();

let event = {
  'summary': 'Test Event',
  'description': 'This is a test event',
  'start': {
    'dateTime': dateTime.start,
    'timeZone': 'America/Chicago'
  },
  'end': {
    'dateTime': dateTime.end,
    'timeZone': 'America/Chicago'
  }
};

const insertNewEvent = async (event) => {
  try {
    const res = await insertEvent(event);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

module.exports = insertNewEvent;