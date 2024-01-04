import React from 'react';
import { Card, Button, Container, Image } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
        
            <Card key={eventData?.eventContact?._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    <Card.Title>
                        Host <h3 style={{fontSize: "3cqb"}}> {eventData?.eventContact?.name}</h3>
                    </Card.Title>


                    <Card.Text style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div>
                        <strong>Boot:</strong> {eventData?.eventContact?.bootName}<br />
                        </div>
                        <div>
                        <Button className='formButton' href={`mailto: ${eventData?.eventContact.email}`}>EMAIL</Button>
                        <Button className='formButton' href={`tel: ${eventData?.eventContact.phone}`}>CALL</Button>
                        </div>
                        
                    </Card.Text>
                </Card.Body>
            </Card>

        {eventData?.eventSignups.length > 0 ? (
            <>





          {eventData?.eventSignups.map((signup) => (
            <Card key={signup._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    <Card.Title>
                        <h3 style={{fontSize: "3cqb"}}>{signup.name}</h3>
                    </Card.Title>
                    <Card.Text style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{flex: "1 0 300px"}}>
                            <Image src={signup.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} />
                        {signup.bootName}
                        </div>
                        <div style={{flex: "1 0 150px"}}>
                        <Button className='formButton' href={`mailto: ${signup.email}`}>EMAIL</Button>
                        <Button className='formButton' href={`tel: ${signup.phone}`}>CALL</Button>
                        </div>

                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
        </>
        ) : (
          null
        )}
        </>
    );
};

export default GuestsDisplay;
  