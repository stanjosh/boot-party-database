import { useEffect, useState, useRef } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_PARTNER } from '../../util/mutations';



const PartnerForm = ({ partnerData, success }) => {
    
    const [addPartner, { loading, error }] = useMutation(CREATE_PARTNER);



    const  [formData, setFormData] = useState({

        name: '',
        imgSrc: '',

    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        addPartner({
            variables: { 
                partnerInput : {...formData}
            }
        })
        .then((res) => {
            console.log('Partner created: ', res.data);
            localStorage.setItem('partner', JSON.stringify(res.data.createPartner));
            success();
        })
        .catch((err) => {
            alert('Error creating partner:', err);
            console.error('Error creating partner:', err);
        });

    }


    const { name, imgSrc } = formData;






  return (
    <Form onSubmit={handleSubmit} >
        <div className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' name='name' value={name} onChange={handleInputChange} />
            
            <Form.Label>Image Source</Form.Label>
            <Form.Control type='text' name='imgSrc' value={imgSrc} onChange={handleInputChange} />
            
        
        

        </div>
        { imgSrc ? <div style={{width: "100%", textAlign: "center", alignItems: "center"}}>
        <Image src={imgSrc} rounded style={{maxHeight: "100px"}} />
        </div>
        : null}

        {error && <Alert variant='danger'>Error updating partner</Alert>}
                
        <Button type='submit' className='mt-3' disabled={loading}>
            save
        </Button>

    </Form>



  );
};

export default PartnerForm;
