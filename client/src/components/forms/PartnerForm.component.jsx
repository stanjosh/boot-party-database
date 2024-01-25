import { useEffect, useState, useRef } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_PARTNER } from '../../util/mutations';
import { UserDisplay } from '../';


const PartnerForm = ({ partnerData, success }) => {
    
    const [addPartner, { loading, error }] = useMutation(CREATE_PARTNER);

    const users = partnerData?.users || [];

    const  [formData, setFormData] = useState({

        name: partnerData?.name || '',
        imgSrc: partnerData?.imgSrc || '',
        

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





    console.log('partnerData: ', partnerData);
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
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button className='mt-3'>delete</Button>

                    <Button type='submit' className='mt-3' disabled={loading}>
                        save
                    </Button>
                </div>

                { users ? <div style={{width: "100%", textAlign: "center", alignItems: "center"}}>
                <strong>Users</strong>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                {users?.map((userData, index) => {
                    return (
                    <div key={index} style={{flex: "1 1 250px", maxHeight: "50%"}}>
                        <UserDisplay userData={userData}  admin/> 
                    </div>
                    )})}
                    </div>      
            
        </div>
        : null}

        

    </Form>



  );
};

export default PartnerForm;
