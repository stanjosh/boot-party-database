
import React from "react"
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../util/queries';
import { EventDisplay } from "./pageElements";

    
const EventList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    const events = data?.findAllEvents;


    return (
        <div>
            

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    
                    {events?.map((event, index) => <div key={index} style={{flex: "1 1 250px", maxHeight: "50%"}}> <EventDisplay eventData={event}  admin/> </div>)}
                </div>
            )}
        </div>
    )
}

export default EventList