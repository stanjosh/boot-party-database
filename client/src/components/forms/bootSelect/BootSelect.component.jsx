import React, { useEffect, useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';
import { useShopifyBoots } from '../../../util/hooks';


const BootSelect = ({ formData, onSelectBoot, clearSelection, scrollBackTo }) => {

    const { shoeWidth, shoeSize, boots } = formData;
    console.log(formData)
    const { bootSku, bootName, bootImgSrc } = boots[0] || {};
    const { bootData, error, loading: bootDataLoading } = useShopifyBoots({shoeSize, shoeWidth});
    const [nearSizeBootData, setNearSizeBootData] = useState([]);
    

    useEffect(() => {
        if (!shoeSize || !shoeWidth) return;
  
    }, [bootData, shoeSize, shoeWidth])

  


    const handleSelectBoot = (e, boot) => {
        if (!e) {
            clearSelection();
            scrollBackTo();
            return;
        }
        onSelectBoot(e, boot);    
        scrollBackTo();
    }


  return (
    <>

    
    {( bootSku && bootName && shoeSize && shoeWidth ) 
        
        ?   
  
        

            
            <div style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",

                backgroundColor: "#FFFFFF",  

                padding: "10px", 
                justifyContent: "center",
                borderRadius: "4px", 
                margin: "5px"}}>
                


                <Button style={{width: "5cqb", height: "5cqb", padding: "0", alignSelf:  "end" }} variant="danger"  onClick={handleSelectBoot}>X</Button>    
                
                <div style={{justifyContent: "center"}}>
                    <Image src={bootImgSrc} alt={bootName} style={{maxWidth: "250px"}} />
                    <h2 style={{fontSize: "3cqb"}}>{bootName}</h2>
                    {nearSizeBootData && <div>we&apos;ll also bring these sizes: {nearSizeBootData.map((boot) => `${boot.option1 + boot.option2} `)}</div> }
                </div>
            </div>
            
            

        
        : 

        <>
        <div style={{position: "sticky", top: "15px", zIndex: "1"}}>
        
            {
                
             
                
                error ? <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>Something went wrong. Please try again later.</Alert>
                : ( shoeSize && shoeWidth ) && bootDataLoading  ? <Alert variant="info" style={{textAlign: "center", fontSize: "2cqh"}}>Loading...</Alert>
                : ( shoeSize && shoeWidth ) && !bootDataLoading && bootData.length <= 0  ? <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>We don&apos;t have any boots in {shoeSize + shoeWidth} </Alert>
                : ( shoeSize && shoeWidth ) && !bootDataLoading ? <Alert variant="success" style={{textAlign: "center", fontSize: "2cqh"}}>We have {bootData.length} styles in {shoeSize + shoeWidth}. Pick one! </Alert>
                : null                
            }
        
        </div>

        {(!bootName && !bootSku && !bootImgSrc) ?
            <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {bootData?.map((boot) => {
                    const { sku, title, bootImgSrc , option3 : color, id, alt } = boot[0];

                    console.log(boot)

                    return (
                    <Card 
                        key={id} 
                        id={sku}
                        alt={title} 
                        data-boot={JSON.stringify(boot.map((b) => { return { bootSku: b.sku, bootName: b.title, bootImgSrc: b.bootImgSrc } }))}
                        onClick={(e) => handleSelectBoot(e)}
                        
                        value={sku}
                        
                        style={{
                            flex: "1 0 340px", 
                            backgroundColor: "#FFFFFF", 
                            borderRadius: "5px", 
                            margin: "10px",
                            cursor: "pointer",
                            }} 
                        >
                
                        
                        <Card.Title style={{textAlign: "left"}}>
                            <h2 style={{fontSize: "2cqh", fontStyle: "italic"}}>{alt}</h2>
                        </Card.Title>
                        <Card.Body style={{margin: "0", padding: "0"}} >
                            <Image width={"100%"} src={bootImgSrc} alt={color} />
                        </Card.Body>
                        <Card.Footer style={{margin: "0", padding: "0"}}>
                            <a href={`https://rickshaw-boots.myshopify.com/variants/${id}`} target="_blank" rel="noreferrer" style={{position: "absolute", top: "0", right: "0", margin: "10px", fontSize: "2cqh"}}>
                                <img src="/external-link.svg" alt="alvies.com" style={{height: "4cqh", width: "3.5cqh"}} loading='lazy'/>
                            </a>
                            <h3 style={{fontSize: "2cqh", textAlign: "right", color: "var(--alviesDarkBlue"}}>{color}</h3>
                        </Card.Footer>
                    </Card> )
                }
                    )}
            </Container>
            : null }
        </> 
        }
    </>
        
    
    
    

   
  );
};

export default BootSelect;


