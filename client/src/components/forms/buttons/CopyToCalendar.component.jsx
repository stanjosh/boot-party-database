import { useState, useEffect } from 'react';
import { Button, Alert } from "react-bootstrap";

const CopyToCalendar = ({ eventData }) => {

    const [calendarSuccess, setCalendarSuccess] = useState(false);
    const [calendarError, setCalendarError] = useState(false);
    const [eventUrl, setEventUrl] = useState('');


    useEffect(() => {
        setCalendarSuccess(false);
    }, [eventData]);



    const handleCalendarInsert = async () => {
        await fetch('/api/calendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setEventUrl(res.event.htmlLink);
                setCalendarSuccess(true);

            })
            .catch((err) => {
                console.error(err);
                setCalendarError(true);
            });
        
    }


    return (
        <>
            <Button className="formButton" onClick={handleCalendarInsert}>Copy to Calendar</Button>
            {calendarSuccess && <Alert variant="success">Event Copied! <a href={eventUrl} referrerPolicy='no-referrer' target='_top'>link to event</a></Alert>}
            {calendarError && <Alert variant="danger">Something went wrong...</Alert>}
        </>
    );
};

export default CopyToCalendar;
