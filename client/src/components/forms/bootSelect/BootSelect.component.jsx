import React, { useEffect, useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';
import { useShopifyBoots } from '../../../util/hooks';


const BootSelect = ({ formData, onSelectBoot, clearSelection, scrollBackTo }) => {

    const { shoeWidth, shoeSize, bootSku, bootName, bootImgSrc } = formData;
    const { bootData, error, loading: bootDataLoading } = useShopifyBoots({shoeSize, shoeWidth});
    const [nearSizeBootData, setNearSizeBootData] = useState([]);


    useEffect(() => {
        if (!shoeSize || !shoeWidth) return;
        if (bootSku && bootName) {
            handleSelectBoot();
        }
  
    }, [bootData, shoeSize, shoeWidth])




    const handleSelectBoot = (e) => {
        if (!e) {
            clearSelection();
            scrollBackTo();
            return;
        }
        const { nearsizes, bootcolor } = e.currentTarget.dataset;
        if (nearsizes) {
            const nearSizesData = JSON.parse(nearsizes);
            const nearSizes = nearSizesData.filter((boot) => boot.option3 == bootcolor )
            setNearSizeBootData(nearSizes);
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
            <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {bootData?.map((boot) => (
                    <Card 
                        key={boot[0].id} 
                        id={boot[0].sku}
                        alt={boot[0].title} 
                        data-bootmodel={boot[0].alt} 
                        data-bootsku={boot[0].sku} 
                        data-bootname={boot[0].title}
                        data-color={boot[0].option3}
                        data-bootimgsrc={boot[0].featured_image.src}
                        data-nearsizes={JSON.stringify(boot)}
                        onClick={handleSelectBoot}
                        
                        value={boot[0].sku}
                        
                        style={{
                            flex: "1 0 340px", 
                            backgroundColor: "#FFFFFF", 
                            borderRadius: "5px", 
                            margin: "10px",
                            cursor: "pointer",
                            }} 
                        >
                
                        
                        <Card.Title style={{textAlign: "left"}}>
                            <h2 style={{fontSize: "2cqh", fontStyle: "italic"}}>{boot[0].alt}</h2>
                        </Card.Title>
                        <Card.Body style={{margin: "0", padding: "0"}} >
                            <Image width={"100%"} src={boot[0].featured_image.src} alt={boot[0].option3} />
                        </Card.Body>
                        <Card.Footer style={{margin: "0", padding: "0"}}>
                            <a href={`https://rickshaw-boots.myshopify.com/variants/${boot[0].id}`} target="_blank" rel="noreferrer" style={{position: "absolute", top: "0", right: "0", margin: "10px", fontSize: "2cqh"}}>
                                <img src="/external-link.svg" alt="alvies.com" style={{height: "4cqh", width: "3.5cqh"}} loading='lazy'/>
                            </a>
                            <h3 style={{fontSize: "2cqh", textAlign: "right", color: "var(--alviesDarkBlue"}}>{boot[0].option3}</h3>
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


