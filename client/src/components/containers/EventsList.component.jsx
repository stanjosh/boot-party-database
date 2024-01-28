
import React, { useEffect, useState } from "react"
import { Button, Card, Modal } from "react-bootstrap";
import { EventForm } from "../forms";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../util/queries';
import dayjs from "dayjs";

    
const EventsList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    const events = data?.findAllEvents;

    const [sortedData, setSortedData] = useState(events ?? [])
    
    const [sort, setSort] = useState(-1)

    const [showNewEventModal, setNewShowEventModal] = useState(false);


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
                                scope="col"
                                name="title" 
                                onClick={(e) => sortTable(e)}
                            >
                                title</th>
                            <th 
                                style={{cursor: "n-resize"}}
                                scope="col"
                                name="time" 
                                onClick={(e) => sortTable(e)}
                            >
                                date / time
                            </th>
                            <th 
                                style={{cursor: "n-resize"}}
                                scope="col"
                                name="location"
                                onClick={(e) => sortTable(e)}
                            >
                                location
                            </th>
                            <th 
                                style={{cursor: "n-resize"}}
                                scope="col"
                                name="contact" 
                                onClick={(e) => sortTable(e)}
                            >contact</th>
                            <th 
                                style={{cursor: "n-resize"}}
                                scope="col"
                                name="admin"
                                
                            ><Button onClick={() => setNewShowEventModal(true)}>new</Button></th>

                            </tr>
                            
                            
                        </thead>
                        <tbody>
                    {sortedData?.map((event, index) => {
                        return (

                        <tr key={index}
                            style={{cursor: "pointer",
                            backgroundColor: (index % 2 === 0 ? "#eeeeee" : "aliceblue"),
                            color: dayjs(event?.eventTime * 1).isBefore(dayjs()) ? "gray" : "black",
                        }}
                            onClick={() => window.location.href = `/party/${event?._id}`}

                        >
                            <td data-label={event?.eventTitle? 'title' : null}>{event?.eventTitle}</td>
                            <td data-label='date / time'>{dayjs(event?.eventTime * 1).format('MMMM D, YYYY h:mm A')}</td>
                            <td data-label='location'>{event?.eventLocation}</td>
                            <td data-label='contact'>{event?.eventContact?.name}</td>
                            <td data-label='admin'><Button href={`/admin/party/${event?._id}`}>admin</Button></td>
                            
                        </tr>

                        )
                        }
                    )}
                        </tbody>
                    </table>
                </div>
            )}
            <Modal show={showNewEventModal} onHide={() => setNewShowEventModal(false)} >
                    
                    <Modal.Header className="bg-dark text-light"closeButton>
                        <Modal.Title>New Event</Modal.Title>
                    </Modal.Header>
    
                    <Modal.Body className="bg-dark text-light">
                        <EventForm submitText={'create'} success={() => setNewShowEventModal(false)}/>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default EventsList