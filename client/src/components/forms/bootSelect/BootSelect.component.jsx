import React, { useEffect, useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';

const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";

const menSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
const womenSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

const BootSelect = ({ handleCustomerInputChange, customerForm }) => {
    const [bootData, setBootData] = useState([]);
    const [showBoots, setShowBoots] = useState(false);
    const [selectedBootSku, setSelectedBootSku] = useState('');
    const [selectedBootName, setSelectedBootName] = useState('');

    const [shoeWidth, setShoeWidth] = useState('');
    const [shoeSize, setShoeSize] = useState('');

    useEffect(() => {
        const bootDataURL = shoeWidth === "B" ? womenBootDataURL : menBootDataURL;
        fetch(bootDataURL)
            .then((response) => response.json())
            .then((data) => {
                const filteredBoots = []
                data.products?.filter((style) => 
                    style.variants.forEach((variant) => {
                        if (variant.available === true && variant.option1 === shoeSize && variant.option2 === shoeWidth ) {
                            variant.alt = style.title
                            filteredBoots.push(variant)
                        }
                    }))
                setBootData(filteredBoots);
                console.log(filteredBoots);
            });
    }, [handleCustomerInputChange, customerForm, shoeSize, shoeWidth]);

    const handleSelectSize = (e) => {
        const { name, value } = e.target;
        if (name === "shoeWidth") {
            setShoeWidth(value);
        } else {
            setShoeSize(value);
            setShowBoots(true);
        } 


    }

    const handleSelectBoot = (e) => {
        console.log(e.currentTarget);
        
        setSelectedBootSku(e.currentTarget.dataset.bootsku);
        setSelectedBootName(`${e.currentTarget.dataset.bootmodel} / ${e.currentTarget.dataset.bootname}`);
        customerForm.bootSku = e.currentTarget.dataset.bootsku;
        customerForm.bootName = e.currentTarget.dataset.bootname;
        window.scrollTo(0, 0)
        setShowBoots(false);
        
    }


  return (
    <>
        {!showBoots && !selectedBootSku 
          ? <div style={{color: "aliceblue", height: "100%", padding: "20px"}}>Select the boots you want to check out?</div>
          : null }
        <Form.Group hidden={selectedBootSku} style={{
            display: "flex", 
            flexWrap: "nowrap", 
            textAlign: "right", 
            justifyContent: "center", 
            alignContent: "center",
            verticalAlign: "center",
            width: "100%"
        }} >
            
            <Form.Select 
                id="shoeWidth" 
                
                aria-label="Boot Width"
                placeholder="Boot Width"
                onChange={handleSelectSize}
                name="shoeWidth"
                value={shoeWidth}
                style={{margin: "15px", maxWidth: "150px" }}
            >
                <option value={null}>Boot Width</option>
                <option value="B">B (Women)</option>
                <option value="D">D (Men)</option>
                <option value="EE">EE (Men Wide)</option>

            </Form.Select> 
            <Form.Select 
                id="shoeSize" 
                aria-label="Boot Sizes"
                placeholder="Boot Sizes"
                onChange={handleSelectSize}
                name="shoeSize"
                value={shoeSize}
                style={{margin: "15px", maxWidth: "150px"}}
            >
                <option value={null}>Boot Size</option>
                    {(shoeWidth === "B" ? womenSizes : menSizes).map((size) =>               
                        <option value={size} key={size}>{size}</option>
                )}
            </Form.Select>
        </Form.Group>
    <Form.Group style={{display: "flex", flexWrap: "nowrap", width: "100%", alignItems: "center", justifyContent: "end", padding: "15px"}} hidden={!selectedBootSku}>
    {selectedBootSku 
        ? <>
            <Form.Control type="hidden" name="bootSku" value={customerForm.bootSku} />
            <Form.Control type="hidden" name="bootName" value={customerForm.bootName} />
            <Form.Text style={{
                fontSize: "2cqh", 
                textAlign: "center", 
                backgroundColor: "#FFFFFF",  
                height: "100%", 
                padding: "10px", 
                verticalAlign: "center", 
                borderRadius: "4px", 
                margin: "5px"}}>
                Boot: {selectedBootName}
            </Form.Text>
            <Button variant="danger" style={{height: "100%", verticalAlign: "center", padding: "10px"}} onClick={() => {setSelectedBootSku(''); setSelectedBootName(''); setShowBoots(true);}}>X</Button>
            </>
        : null}
    
    
    </Form.Group>
    {showBoots ? 
    <>
    <div style={{position: "static", bottom: "0", zIndex: "1"}}>
    <Alert dismissible>
        { bootData.length > 0 && shoeSize && shoeWidth 
            ? <> These are the styles we have in your size. </>
            : <> Looks like we don't have anything in that size. (Try a half size down!) </>
        }
    </Alert>
    </div>

    <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
        
      {bootData.map((boot) => (


        <Card 
            key={boot.id} 
            id={boot.sku}
            alt={boot.title} 
            data-bootmodel={boot.alt} 
            data-bootsku={boot.sku} 
            data-bootname={boot.title} 
            onClick={handleSelectBoot}
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
    : null}
    {console.log(selectedBootSku, selectedBootName)}
    </>
  );
};

export default BootSelect;


