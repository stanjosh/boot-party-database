import { useState, useEffect } from 'react';
import { Button, Alert } from "react-bootstrap";

const CopyToCalendar = ({ eventData }) => {
    console.log('copytocalendar', eventData);
    const [calendarSuccess, setCalendarSuccess] = useState(false);

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
        .then(response => response.json())
        .then(res => {
            if (res.error) {
                throw res.error;
            } else if (res.message) {
                throw res.message;
            } else if (res) {
                setCalendarSuccess(true);
                return res;
            }
        })
    }


    return (
        <>
            <Button className="formButton" onClick={handleCalendarInsert}>Copy to Calendar</Button>
            {calendarSuccess && <Alert variant="success">Event Copied!</Alert>}
        </>
    );
};

export default CopyToCalendar;
