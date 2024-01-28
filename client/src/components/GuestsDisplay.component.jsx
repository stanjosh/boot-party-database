import React from 'react';
import { Card, Button, Container, Image } from 'react-bootstrap';


const GuestsDisplay = ( { eventData } ) => {
   

    return (
        <>
        
            <Card key={eventData?.contact?._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    <Card.Title>
                        Host <h3 style={{fontSize: "3cqb"}}> {eventData?.contact?.name}</h3>
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

        {eventData?.guests.length > 0 ? (
            <>





          {eventData?.guests.map((signup) => (
            <Card key={signup._id} style={{marginTop: "5px"}}>
                <Card.Body>
                    <Card.Title>
                        <h3 style={{fontSize: "3cqb"}}>{signup.name}</h3>
                    </Card.Title>
                    <Card.Text style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-evenly", alignItems: "center"}}>

                        <Image src={signup.boots[0]?.bootImgSrc} style={{maxHeight: "100px", maxWidth: "100px"}} />
                        {signup.boots[0]?.bootName}

                        
    

                        
                    </Card.Text>
                    <Card.Footer>
                        <Button className='formButton' href={`mailto: ${signup.email}`}>
                            <Image src="/email.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>
                        {signup.phone && <Button className='formButton' href={`tel: ${signup.phone}`}>
                            <Image src="/phone.svg" style={{maxHeight: "25px", filter: "invert(100%)"}} />
                        </Button>}
                    </Card.Footer>
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
  