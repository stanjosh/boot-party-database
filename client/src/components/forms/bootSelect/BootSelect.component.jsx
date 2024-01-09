import React, { useEffect, useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';
import { useShopifyBoots } from '../../../util/hooks';
import { selectHttpOptionsAndBody } from '@apollo/client';


const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";



const BootSelect = ({ formData, onSelectBoot, clearSelection, scrollBackTo }) => {

    const { shoeWidth, shoeSize, bootSku, bootName, bootImgSrc } = formData;
    const { bootData, error, loading: bootDataLoading } = useShopifyBoots({shoeSize, shoeWidth});
    const [imagesLoading, setImagesLoading] = useState(false);
    const [nearSizeBootData, setNearSizeBootData] = useState([]);

    

    const [imagesLoaded, setImagesLoaded] = useState([]);
    


    useEffect(() => {
        if (bootData) {
            setImagesLoading(true);
            
        }


    }, [bootData])

    const handleloadImage = (e) => {
        setImagesLoading(!(imagesLoaded.length === bootData.length));
        setImagesLoaded([...imagesLoaded, e.target.src]);
        if (imagesLoaded.length === bootData.length) {
            setImagesLoading(false);
        }
    }


    const handleSelectBoot = (e) => {
        if (!e) {
            clearSelection();
            scrollBackTo();
            return;
        }
        const { nearsizes } = e.currentTarget.dataset;
        if (nearsizes) {
            console.log(nearsizes)
            setNearSizeBootData(JSON.parse(nearsizes));
            console.log(nearSizeBootData)
        } else {
            setNearSizeBootData([]);
        }
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
                    {nearSizeBootData && <div>we&apos;ll also bring these sizes: {nearSizeBootData.map((boot) => `${boot.option1 + boot.option2} `)}</div> }
                </div>
            </div>
            
            

        
        : 
        <>
        <div style={{position: "sticky", top: "15px", zIndex: "1"}}>
        
            { console.log(bootData.length, imagesLoaded.length, imagesLoading, bootDataLoading) }
            {
                
             
                
                error ? <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>Something went wrong. Please try again later.</Alert>
                : shoeSize && shoeWidth && ( imagesLoading || bootDataLoading ) ? <Alert variant="info" style={{textAlign: "center", fontSize: "2cqh"}}>Loading...</Alert>
                : shoeSize && shoeWidth && (!imagesLoading || !bootDataLoading) && bootData.length <= 0  ? <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>We don&apos;t have any boots in {shoeSize + shoeWidth} </Alert>
                : shoeSize && shoeWidth && (!imagesLoading || !bootDataLoading) ? <Alert variant="success" style={{textAlign: "center", fontSize: "2cqh"}}>We have {bootData.length} styles in {shoeSize + shoeWidth}. Pick one! </Alert>
                : null                
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
                        data-nearsizes={JSON.stringify(boot.nearSizes)}
                        onClick={handleSelectBoot}
                        onLoad={handleloadImage}
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


