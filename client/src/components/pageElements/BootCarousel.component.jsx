import React, { useEffect, useState } from 'react';
import { Card, Form, Image } from 'react-bootstrap';

const bootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";

const shoeSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17];


const BootCarousel = ({ handleCustomerInputChange, customerForm }) => {
    const [bootData, setBootData] = useState([]);
    const [showBoots, setShowBoots] = useState(false);
    const [selectedBoot, setSelectedBoot] = useState(null);

    useEffect(() => {
        fetch(bootDataURL)
            .then((response) => response.json())
            .then((data) => {
                const filteredBoots = []
                data.products?.filter((style) => 
                    style.variants.forEach((variant) => {
                        if (variant.available === true && variant.option1 === customerForm.shoeSize && variant.option2 === customerForm.shoeWidth ) {
                            console.log(variant)
                            variant.alt = style.title
                            filteredBoots.push(variant)
                        }
                    }))
                    
                console.log(filteredBoots)
                setBootData(filteredBoots);
            });
    }, [handleCustomerInputChange, customerForm]);

    const handleCarouselChange = (e) => {
        handleCustomerInputChange(e);
        if (customerForm.shoeSize && customerForm.shoeWidth) {
            setShowBoots(true);
        } else if (selectedBoot) {
            customerForm.boot = e.target.value;
            
            setShowBoots(false);
        } else {
            setShowBoots(false);
        }
        console.log(customerForm)
    }


  return (
    <>
    <Form.Group style={{display: "flex"}}>
    
    <Form.Select 
        id="shoeSize" 
        aria-label="Womens' Boot Sizes"
        placeholder="Womens' Boot Sizes"
        onChange={handleCarouselChange}
        name="shoeSize"
        value={customerForm.shoeSize}
        style={{width: "50%"}}    
    >
        <option value={null}>Boot Size</option>
        {shoeSizes.map((size) =>               
            <option key={size}>{size}</option>
        )}
    </Form.Select>
    <Form.Select 
        id="shoeWidth" 
        aria-label="Boot Width"
        placeholder="Boot Width"
        onChange={handleCarouselChange}
        name="shoeWidth"
        value={customerForm.shoeWidth}
        style={{width: "50%"}}    
    >
            <option value={null}>Boot Width</option>
            <option value="B">B (Women)</option>
            <option value="D">D (Men)</option>
            <option value="EE">EE (Men Wide)</option>
    </Form.Select>
    </Form.Group>
    <Form.Group>
    <Form.Check
        type='radio'
        aria-label="Default select example"
        style={{ display: "flex", flexWrap: "wrap", overflowY: "scroll", height: "50cqh", width: "100%", margin: "auto"}}
        name="boot"
        id="boot"
        max={1}
        required
        onChange={handleCarouselChange}
    >
      {bootData.map((boot) => (
        <div key={boot.id}>
        <Form.Check.Input 
            type="radio" 
            value={boot.sku}
            name="boot"
            id={boot.id}
            autoComplete="off" 
            style={{display: "none"}}
            onClick={() => setSelectedBoot(boot.sku)}
        />
        <Form.Check.Label  value={boot.sku} className="btn btn-outline-primary" htmlFor={boot.id} style={{width: "100%", maxWidth: "400px"}}>
            
            <h2 style={{fontSize: "3cqh"}}>{boot.alt} <br /> {boot.option3}</h2>
            <Image width={"100%"} src={boot.featured_image.src} alt={boot.title} />
            
        </Form.Check.Label>
        </div>
        ))}
    </Form.Check>
    {customerForm.boot && !showBoots ? (
        <Card>
            <Card.Title><h2 style={{fontSize: "3cqh"}}>{bootData.find((boot) => boot.sku === customerForm.boot).alt} {bootData.find((boot) => boot.sku === customerForm.boot).option3}</h2></Card.Title>
            <Card.Body><Image style={{width: "100%"}} src={bootData.find((boot) => boot.sku === customerForm.boot).featured_image.src} alt={bootData.find((boot) => boot.sku === customerForm.boot).title} /></Card.Body>
        </Card>
        ) : null}
    </Form.Group>

    </>
  );
};

export default BootCarousel;


{/* <Card key={boot.id}>
<Card.Title><h2 style={{fontSize: "3cqh"}}>{boot.alt} {boot.option3}</h2></Card.Title>
<Card.Body><Image style={{width: "100%"}} src={boot.featured_image.src} alt={boot.title} /></Card.Body>
</Card> */}