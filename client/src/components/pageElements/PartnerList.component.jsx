
import React, { useEffect, useState} from "react"
import { useLazyQuery, useQuery } from '@apollo/client';
import { UserDisplay } from "./";
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


    return (
        <div>
            <div style={{display:"flex", alignContent:"center"}}>
                <Form onSubmit={handleSearchSubmit} style={{width: "400px", maxWidth: "100%"}}>
                    
                    <InputGroup className="mb-3">
                        <Button onClick={() => setNewShowPartnerModal(true)} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>new</Button>
                        <FloatingLabel controlId="floatingInput" label="name or email search">
                        <Form.Control type="text" placeholder="name or email search" onChange={handleSearchChange} />
                        </FloatingLabel>
                        <Form.Control id="search" type="submit" value="search"  required style={{backgroundColor: "var(--alviesBlue)", maxWidth: "min-content"}} />
                    </InputGroup>

                </Form>
                
            </div>        

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    
                    {sortedData?.map((partnerData, index) => <div key={index} style={{flex: "1 1 250px", display: "flex", justifyContent: "space-around", margin: "5px", padding: "5px", border: "1px solid black", borderRadius: "5px", alignContent: "center"}}> 
                        <div style={{display: "flex", flex: "1 0 75%", alignItems: "center", justifyContent: "center"}}><strong>{partnerData?.name}</strong>
                        </div>


                        <Button>edit</Button>



                     </div>)}
                </div>
            )}
        
        <Modal show={showNewPartnerModal} onHide={() => setNewShowPartnerModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
              <Modal.Title>add guest</Modal.Title>
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