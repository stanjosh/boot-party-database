
import React, { useEffect, useState} from "react"
import { useLazyQuery, useQuery } from '@apollo/client';
import { PartnerDisplay } from "./";
import { Form, Modal, InputGroup, Button, Image, FloatingLabel } from 'react-bootstrap';
import { QUERY_PARTNERS_SEARCH, QUERY_PARTNERS } from '../../util/queries';
import { PartnerForm } from '../forms';



const PartnersList = () => {

    const [showNewPartnerModal, setNewShowPartnerModal] = useState(false);

    const { loading: partnersLoading, data: partnersData } = useQuery(QUERY_PARTNERS);
    const [ searchPartners, { loading: searchLoading, data: searchData, error: searchError }] = useLazyQuery(QUERY_PARTNERS_SEARCH)

    const loading = partnersLoading || searchLoading;
    

    const [currentSearch, setCurrentSearch] = useState('');

    const [sortedData, setSortedData] = useState(partnersData?.findAllPartners)

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setCurrentSearch(value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        searchPartners({ 
            variables: { 
                search: currentSearch 
            }})
            .then((res) => {
                setSortedData(res.data.findPartnersBySearch)
            }
        )


        
    }

    console.log(sortedData)

    return (
        <div>
            
            <div style={{display:"flex", alignContent:"center"}}>
                
                <Form onSubmit={handleSearchSubmit} style={{width: "100%", display: "flex"}}>
                    
                        <InputGroup className="mb-3"  controlId="formBasicSearch">
                        <FloatingLabel controlId="floatingInput" label="partner search">
                        <Form.Control type="text" placeholder="name or email search" required onChange={handleSearchChange} />
                        </FloatingLabel>
                        <Form.Control id="search" type="submit" value="search"  style={{backgroundColor: "var(--alviesBlue)", maxWidth: "min-content"}} />
                        
                        </InputGroup>
                        
                    

                </Form>
                
            </div>        

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>

                    {sortedData?.map((partnerData, index) =>  
                        
                        <PartnerDisplay key={index} partnerData={partnerData} admin={true} />


                    )}
                    <Button onClick={() => setNewShowPartnerModal(true)} style={{flex: "0 1 100px"}}>new</Button>
                </div>
            )}
        
        <Modal show={showNewPartnerModal} onHide={() => setNewShowPartnerModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
                <Modal.Title>new partner</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='bg-dark text-light'>
                <PartnerForm  success={() => setNewShowPartnerModal(false)}/>
            </Modal.Body>
            <Modal.Footer  className='bg-dark text-light'>
            </Modal.Footer>
        </Modal>

        </div>

    )
}

export default PartnersList