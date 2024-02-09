
import { useState } from "react"
import { useLazyQuery } from '@apollo/client';
import { Form, Modal, InputGroup, Button, FloatingLabel } from 'react-bootstrap';
import { QUERY_PARTNERS_SEARCH } from '../../util/queries';
import { PartnerForm } from '../forms';
import { useDebounce } from '../../util/hooks';



const PartnersList = () => {

    const [ searchPartners, { loading, data, error }] = useLazyQuery(QUERY_PARTNERS_SEARCH)



    const [currentSearch, setCurrentSearch] = useState('');
    const [sortedData, setSortedData] = useState(data?.findPartnersBySearch || [])



        






    const [sort, setSort] = useState(-1)

    const [showNewPartnerModal, setShowNewPartnerModal] = useState(false);
    const [showPartnerModal, setShowPartnerModal] = useState(0);


    function sortTable(e){
        const col = e.target.getAttribute("name")
        
        setSort(sort == 1 ? -1 : 1)

        


        switch (col) {
            case "name": {
                const sorted = [...sortedData].sort((a, b) => {
                    if (a.name?.toUpperCase() < b.name?.toUpperCase()) return sort
                    if (a.name?.toUpperCase() > b.name?.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            case "events": {
                const sorted = [...sortedData].sort((a, b) => {
                    if (a.events?.length < b.events?.length) return sort
                    if (a.events?.length > b.events?.length) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
            case "users": {
                const sorted = [...sortedData].sort((a, b) => {
                    if (a.users?.length < b.users?.length) return sort
                    if (a.users?.length > b.users?.length) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }
        
            default: {
                const sorted = [...sortedData].sort((a, b) => {
                    if (a.name?.toUpperCase() < b.name?.toUpperCase()) return sort
                    if (a.name?.toUpperCase() > b.name?.toUpperCase()) return -sort
                    return 0
                })
                setSortedData(sorted)
                break;
            }

        }
    }





    
    console.log(sortedData)

    return (
        
        <div>
            {error && <div>{error.message}</div>}
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", padding: "5px"}}>
                
                <Form onSubmit={(e) => {e.preventDefault()}} style={{width: "100%", maxWidth: "300px", display: "flex"}}>
                    
                        <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label="partner search">
                        <Form.Control type="text" placeholder="name or email search" required onChange={(e) => setCurrentSearch(e.target.value)} />
                        </FloatingLabel>
                        <Form.Control id="search" type="submit" value="search"  style={{backgroundColor: "var(--alviesBlue)", maxWidth: "min-content"}} />
                        
                        </InputGroup>
                        
                        

                </Form>
                
            </div>        

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                <table>
                <thead>
                    <tr>
                    <th 
                        style={{cursor: "n-resize"}}
                        scope="col"
                        name="title" 
                        onClick={(e) => sortTable(e)}
                    >
                        name</th>
                    <th 
                        style={{cursor: "n-resize"}}
                        scope="col"
                        name="events" 
                        onClick={(e) => sortTable(e)}
                    >
                        events
                    </th>
                    <th 
                        style={{cursor: "n-resize"}}
                        scope="col"
                        name="users"
                        onClick={(e) => sortTable(e)}
                    >
                        users
                    </th>

                    <th 
                        style={{cursor: "n-resize"}}
                        scope="col"
                        name="admin"
                        
                    ><Button onClick={() => setShowNewPartnerModal(true)}>new</Button></th>

                    </tr>
                    
                    
                </thead>
                <tbody>

                
                    
                    {sortedData?.map((partnerData, index) =>  

                    <>
                        
                    <tr key={index} style={{cursor: "pointer", backgroundColor: (index % 2 === 0 ? "lightgray" : "aliceblue")}}
                        onClick={() => setShowPartnerModal(index)}
                        >
                            
                            <td>{partnerData?.name}</td>
                        
                            <td>{partnerData?.events?.length}</td>

                            <td>{partnerData?.users?.length}</td>

                            <td><Button onClick={() => setShowPartnerModal(index)}>edit</Button></td>

                        </tr>

                        <Modal show={(showPartnerModal && showPartnerModal === index)} onHide={() => {setShowPartnerModal(0)}}>
                            <Modal.Header closeButton>
                                <Modal.Title>{partnerData?.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PartnerForm partnerData={partnerData} success={() => {setShowPartnerModal(0)}} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {setShowPartnerModal(0)}}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </>

                    )}
                    
                    </tbody>
                </table>
            </div>
            )}
        
        <Modal show={showNewPartnerModal} onHide={() => setShowNewPartnerModal(false)} >
            <Modal.Header closeButton className='bg-dark text-light'>
                <Modal.Title>new partner</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='bg-dark text-light'>
                <PartnerForm  success={() => setShowNewPartnerModal(false)}/>
            </Modal.Body>
            <Modal.Footer  className='bg-dark text-light'>
            </Modal.Footer>
        </Modal>

        </div>

    )
}

export default PartnersList