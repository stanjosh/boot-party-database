import React from 'react';
import { Card, Button, Container, Image } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
        
            <Card key={eventData?.contact?._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    <Card.Title>
                        <h3 style={{fontSize: "3cqb"}}> {eventData?.contact?.name}</h3>
                        <Card.Subtitle>
                        Host
                        </Card.Subtitle>
                    </Card.Title>


                    <Card.Text style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-evenly", alignItems: "center"}}>

                        <Image src={eventData?.contact?.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} />
                        {eventData?.contact?.bootName}


                        
                    </Card.Text>
                    <Card.Footer>
                        <Button className='formButton' href={`mailto: ${eventData?.contact?.email}`}>
                            <Image src="/email.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>
                        {eventData?.contact?.phone && <Button className='formButton' href={`tel: ${eventData?.contact?.phone}`}>
                            <Image src="/phone.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>}
                    </Card.Footer>
                </Card.Body>
            </Card>

        {eventData?.guests?.length > 0 ? (
            <>
          {eventData?.guests?.map((guest) => (
            <Card key={guest._id} style={{marginTop: "5px"}}>
                <Card.Body style={{display: "flex"}}>
                    <Card.Title>
                        <h3 style={{fontSize: "3cqb"}}>{guest.name}</h3>
                        <Card.Subtitle>
                            <span> {guest.boots[0]?.bootName} </span>
                            
                        </Card.Subtitle>
                        <Card.Subtitle style={{padding: "10px"}}> 
                            <span>{guest.boots?.map((boot) => ` ${boot.width}${boot.size}`)}</span>
                        </Card.Subtitle>
                    </Card.Title>
                    
                    <Card.Text style={{textAlign: "center", width:"100%"}}><Image src={guest.boots[0]?.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} /></Card.Text>
                    

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
  