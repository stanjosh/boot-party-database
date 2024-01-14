
import React, { useState} from "react"
import { useLazyQuery } from '@apollo/client';
import { UserDisplay } from "./";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { QUERY_USERS_SEARCH } from '../../util/queries';



const PartnersList = () => {

    const [currentSearch, setCurrentSearch] = useState('');

    const [ searchPartners, { loading, data, error }] = useLazyQuery(QUERY_PARTNERS_SEARCH, {
        variables: { search: currentSearch },
        
    });


    const handleSearchChange = (event) => {
        const { value } = event.target;
        setCurrentSearch(value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        searchPartners();
    };

    

    return (
        <div>
            <div>
                <Form onSubmit={handleSearchSubmit}>
                    <InputGroup className="mb-3">
                    <Form.Label htmlFor="search" visuallyHidden >name or email search </Form.Label>
                        <InputGroup.Text controlId="formBasicSearch">
                        
                            <Form.Control type="text" placeholder="search by name or email" onChange={handleSearchChange} />
                            <Form.Control id="search" type="submit"  />

                        </InputGroup.Text>
                    </InputGroup>
                </Form>
            </div>        

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    
                    {data?.findPartnersBySearch?.map((userData, index) => <div key={index} style={{flex: "1 1 250px", maxHeight: "50%"}}> <UserDisplay userData={userData}  admin/> </div>)}
                </div>
            )}
        </div>

    )
}

export default PartnersList