import { useState } from 'react';
import { Card, Form, Image, Container, Alert, Button } from 'react-bootstrap';
import { useShopifyBoots } from '../../../util/hooks';


const menSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
const womenSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];


const BootSelect = ({ formData, onSelectBoot, clearSelection, scrollBackTo }) => {

    const { boots } = formData;

    const { bootName, bootImgSrc } = boots[0] || {};
    
    

    const [shoeWidth, setShoeWidth] = useState('');
    const [shoeSize, setShoeSize] = useState('');
    
    const { bootData, error, loading: bootDataLoading } = useShopifyBoots({shoeSize, shoeWidth});

    const handleSelectBoot = (e, boot) => {
        if (!e) {
            setShoeSize('');
            setShoeWidth('');
            clearSelection();

            scrollBackTo();
            return;
        }
        onSelectBoot(e, boot);    
        scrollBackTo();
    }

    if (error) return (
        <div style={{position: "sticky", top: "15px", zIndex: "1"}}>
            {bootDataLoading  ? <Alert variant="info" style={{textAlign: "center", fontSize: "2cqh"}}>Loading...</Alert>
            : !bootDataLoading && bootData.length <= 0  ? <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>We don&apos;t have any boots in {shoeSize + shoeWidth} </Alert>
            : !bootDataLoading ? <Alert variant="success" style={{textAlign: "center", fontSize: "2cqh"}}>We have {bootData.length} styles in {shoeSize + shoeWidth}. Pick one! </Alert>
            : <Alert variant="danger" style={{textAlign: "center", fontSize: "2cqh"}}>Something went wrong. Please try again later.</Alert>}
        </div>
    )
    if (shoeSize == '' || shoeWidth == '') {
        return (
            <>        

            <Form.Group style={{
                display: "flex", 
                flexWrap: "wrap", 
                textAlign: "right", 
                justifyContent: "space-between", 
                width: "100%",
                marginBottom: "15px"
            }} >

                <Form.Select 
                    id="shoeWidth" 
                    aria-label="Boot Width"
                    placeholder="Boot Width"
                    onChange={(e) => setShoeWidth(e.target.value)}
                    name="shoeWidth"
                    value={shoeWidth}
                    style={{flex: "1 0 125px", marginRight: "10px"}}
                >
                    <option value={''}>Boot Width</option>
                    <option value="B">B (Women)</option>
                    <option value="D">D (Men)</option>
                    <option value="EE">EE (Men Wide)</option>

                </Form.Select> 
                <Form.Select 
                    id="shoeSize" 
                    aria-label="Boot Sizes"
                    placeholder="Boot Sizes"
                    onChange={(e) => setShoeSize(e.target.value)}
                    name="shoeSize"
                    value={shoeSize}
                    style={{flex: "1 0 125px", marginLeft: "10px"}}
                >
                    <option value={''}>Boot Size</option>
                        {(shoeWidth === "B" ? womenSizes : menSizes).map((size) =>               
                            <option value={size} key={size}>{size}</option>
                    )}
                </Form.Select>
            </Form.Group>
        </>
        )

    }  

    if (!boots.length && bootData.length) return (
        <>
            <Container fluid style={{display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                {bootData?.map((boot) => {
                    const { sku, title, bootImgSrc , option3 : color, id, alt } = boot[0];

 
                    return (
                    <Card 
                        key={id} 
                        id={sku}
                        alt={title} 
                        data-boot={JSON.stringify(boot.map((b) => { return { bootSku: b.sku, bootName: `${b.title} / ${b.option3}` , bootImgSrc: b.bootImgSrc, size : b.option1, width: b.option2 } }))}
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
                        <a href={`https://rickshaw-boots.myshopify.com/variants/${id}`} target="_blank" rel="noreferrer" style={{position: "absolute", top: "0", right: "0", margin: "10px", fontSize: "2cqh"}}>
                            <img src="/external-link.svg" alt="alvies.com" style={{height: "4cqh", width: "3.5cqh"}} loading='lazy'/>
                        </a>
                        
                        <Card.Title style={{textAlign: "left"}}>
                            <h2 style={{fontSize: "3cqb", fontStyle: "italic", color: "var(--alviesDarkBlue"}}>{title}</h2>
                        </Card.Title>
                        <Card.Body style={{margin: "0", padding: "0", textAlign:"center"}} >
                            <Image src={bootImgSrc} alt={color} style={{maxHeight: "50vh", maxWidth: "100%"}} />
                        </Card.Body>
                        <Card.Footer style={{margin: "0", padding: "0"}}>

                            <h3 style={{fontSize: "2cqh", textAlign: "right", color: "var(--alviesDarkBlue"}}>{color}</h3>
                        </Card.Footer>
                    </Card> )
                }
                    )}
            </Container>

        </> 


        
    )

    




    if (boots) return (
        <>
            <Card style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                
                backgroundColor: "#FFFFFF",  

                padding: "10px", 
                justifyContent: "center",
                borderRadius: "4px", 
                margin: "5px"}}
                
                >
                <Button variant="danger" onClick={() => handleSelectBoot()} style={{position: "absolute", top: "0", right: "0", margin: "10px", fontSize: "2cqh"}} >X </Button>

                <Card.Title>
                    <h2 style={{fontSize: "4cqb"}}>{bootName}</h2>
                </Card.Title>
                    <Card.Body style={{margin: "0", padding: "0", textAlign:"center"}} >
                        <Image src={bootImgSrc} style={{maxHeight: "70vh", maxWidth: "100%"}} />
                    </Card.Body>
                <Card.Footer>
                    
                    <span style={{ color: "var(--alviesDarkBlue"}}>{ boots ? ("We'll bring these sizes: " + boots?.map((b) => { return b.size + b.width }).join(', ') ) : null } </span>
                </Card.Footer>
            </Card>
        </>    
        )
        
        

    
    

};

export default BootSelect;


