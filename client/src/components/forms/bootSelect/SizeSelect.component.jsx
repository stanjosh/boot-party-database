
import React from "react";
import { Form } from "react-bootstrap";


const menSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
const womenSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];


const SizeSelect = ({ formData, handleInputChange }) => {
    
    const { shoeWidth, shoeSize, bootSku } = formData;

    return (
        <>        

        <Form.Group hidden={bootSku} style={{
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
                onChange={handleInputChange}
                name="shoeWidth"
                value={shoeWidth}
                style={{flex: "1 0 125px", marginRight: "10px"}}
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
                onChange={handleInputChange}
                name="shoeSize"
                value={shoeSize}
                style={{flex: "1 0 125px", marginLeft: "10px"}}
            >
                <option value={null}>Boot Size</option>
                    {(shoeWidth === "B" ? womenSizes : menSizes).map((size) =>               
                        <option value={size} key={size}>{size}</option>
                )}
            </Form.Select>
        </Form.Group>
    </>
    );
}

export default SizeSelect;