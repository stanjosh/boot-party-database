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


                    <Card.Text style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                        <Image src={eventData?.eventContact?.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} />
                        {eventData?.eventContact?.bootName}
                        </div>
                        <div style={{width: "100%", flex: "0 1 250px"}}>
                        
                        <Button className='formButton' href={`mailto: ${eventData?.eventContact?.email}`}>
                            <Image src="/email.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>
                        {eventData?.eventContact?.phone && <Button className='formButton' href={`tel: ${eventData?.eventContact?.phone}`}>
                            <Image src="/phone.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>}
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
                    <Card.Text style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-evenly", alignItems: "center"}}>
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                        <Image src={signup.boots[0]?.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} />
                        {signup.boots[0]?.bootName}
                        </div>
                        <div style={{width: "100%", flex: "0 1 250px"}}>
                        
                        <Button className='formButton' href={`mailto: ${signup.email}`}>
                            <Image src="/email.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>
                        {signup.phone && <Button className='formButton' href={`tel: ${signup.phone}`}>
                            <Image src="/phone.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>}
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
  