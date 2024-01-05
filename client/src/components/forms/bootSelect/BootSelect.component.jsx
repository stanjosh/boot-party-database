import React, { useEffect, useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';
import { useShopifyBoots } from '../../../util/hooks';
import { selectHttpOptionsAndBody } from '@apollo/client';


const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";



const BootSelect = ({ formData, onSelectBoot, scrollBackTo }) => {

    const { shoeWidth, shoeSize, bootSku, bootName, bootImgSrc } = formData;
    const { bootData } = useShopifyBoots({shoeSize, shoeWidth});



    const handleSelectBoot = (e) => {
        onSelectBoot(e);    
        scrollBackTo();
    }


  return (
    <>

    
    {( bootSku && bootName ) 
        
        ?   
        (shoeSize && shoeWidth)
        &&
        

            
            <div style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",

                backgroundColor: "#FFFFFF",  

                padding: "10px", 
                justifyContent: "center",
                borderRadius: "4px", 
                margin: "5px"}}>
                


                <Button style={{width: "5cqb", height: "5cqb", padding: "0", alignSelf:  "end" }} variant="danger"  onClick={() => {handleSelectBoot();}}>X</Button>    
                
                <div style={{justifyContent: "center"}}>
                    <Image src={bootImgSrc} alt={bootName} style={{maxWidth: "250px"}} />
                    <h2 style={{fontSize: "3cqb"}}>{bootName}</h2>
                </div>
            </div>
            
            

        
        : 
        <>
        <div style={{position: "sticky", top: "15px", zIndex: "1"}}>
        
            { bootData && shoeSize && shoeWidth 
                ? <Alert dismissible> These are the styles we have in that size. Pick one!</Alert>
                : bootData && shoeSize && shoeWidth  && bootData.length <= 0 ? <Alert dismissible> We don't have any boots in that size. </Alert> 
                : bootData.length > 0 && <Alert dismissible> Select a size to see available styles.</Alert>
            }
        
        </div>
            <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {bootData?.map((boot) => (
                    <Card 
                        key={boot.id} 
                        id={boot.sku}
                        alt={boot.title} 
                        data-bootmodel={boot.alt} 
                        data-bootsku={boot.sku} 
                        data-bootname={boot.title}
                        data-bootimgsrc={boot.featured_image.src}
                        onClick={handleSelectBoot}
                        value={boot.sku}
                        style={{
                            flex: "1 0 340px", 
                            backgroundColor: "#FFFFFF", 
                            borderRadius: "5px", 
                            margin: "10px",
                            cursor: "pointer",
                            }} 
                        >
                
                        
                        <Card.Title style={{textAlign: "left"}}>
                            <h2 style={{fontSize: "2cqh", fontStyle: "italic"}}>{boot.alt}</h2>
                        </Card.Title>
                        <Card.Body style={{margin: "0", padding: "0"}} >
                            <Image width={"100%"} src={boot.featured_image.src} alt={boot.option3} />
                        </Card.Body>
                        <Card.Footer style={{margin: "0", padding: "0"}}>
                            <a href={`https://rickshaw-boots.myshopify.com/variants/${boot.id}`} target="_blank" rel="noreferrer" style={{position: "absolute", top: "0", right: "0", margin: "10px", fontSize: "2cqh"}}>
                                <img src="/external-link.svg" alt="alvies.com" style={{height: "4cqh", width: "3.5cqh"}} loading='lazy'/>
                            </a>
                            <h3 style={{fontSize: "2cqh", textAlign: "right", color: "var(--alviesDarkBlue"}}>{boot.option3}</h3>
                        </Card.Footer>
                    </Card>
                    ))}
            </Container>
        </> 
        }
    </>
        
    
    
    

   
  );
};

export default BootSelect;


