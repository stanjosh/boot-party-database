
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../util/queries';
import dayjs from "dayjs";

    
const EventList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    const events = data?.findAllEvents;

    const [sortedData, setSortedData] = useState(events ?? [])
    
    const [sort, setSort] = useState("time")

    function sortTable(e){
        const col = e.target.getAttribute("name")
        
        setSort(sort == 1 ? -1 : 1)

        switch (col) {
            case "title": {
                const sorted = [...events].sort((a, b) => {
                    if (a.eventTitle.toUpperCase() < b.eventTitle.toUpperCase()) return sort
                    if (a.eventTitle.toUpperCase() > b.eventTitle.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            case "time": {
                const sorted = [...events].sort((a, b) => {
                    if (a.eventTime < b.eventTime) return sort
                    if (a.eventTime > b.eventTime) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            case "location": {
                const sorted = [...events].sort((a, b) => {
                    if (a.eventLocation.toUpperCase() < b.eventLocation.toUpperCase()) return sort
                    if (a.eventLocation.toUpperCase() > b.eventLocation.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            case "contact": {
                const sorted = [...events].sort((a, b) => {
                    if (a.eventContact.name.toUpperCase() < b.eventContact.name.toUpperCase()) return sort
                    if (a.eventContact.name.toUpperCase() > b.eventContact.name.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            default: {
                const sorted = [...events].sort((a, b) => {
                    if (a.eventTitle.toUpperCase() < b.eventTitle.toUpperCase()) return sort
                    if (a.eventTitle.toUpperCase() > b.eventTitle.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }

        }
    }

    useEffect(() => {
        setSortedData(events)
    }, [events])

    return (
        <div>
            

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <table>
                        <thead>
                            <tr>
                            <th 
                                style={{cursor: "n-resize"}}
                                name="title" 
                                onClick={(e) => sortTable(e)}
                            >
                                title</th>
                            <th 
                                style={{cursor: "n-resize"}}
                                name="time" 
                                onClick={(e) => sortTable(e)}
                            >
                                date / time
                            </th>
                            <th 
                                style={{cursor: "n-resize"}}
                                name="location" onClick={(e) => sortTable(e)}
                            >
                                location
                            </th>
                            <th 
                                style={{cursor: "n-resize"}}
                                name="contact" 
                                onClick={(e) => sortTable(e)}
                            >contact</th>
                            </tr>
                            
                            
                        </thead>
                        <tbody>
                    {sortedData?.map((event, index) => {
                        return (
                        <tr key={index}>
                            <td>{event?.eventTitle}</td>
                            <td>{dayjs(event?.eventTime * 1).format('MMMM D, YYYY h:mm A')}</td>
                            <td>{event?.eventLocation}</td>
                            <td>{event?.eventContact?.name}</td>
                            <td><Button href={`/admin/party/${event?._id}`}>admin</Button></td>
                            
                        </tr>
                        )
                        }
                    )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default EventList