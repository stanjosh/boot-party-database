
import React, { useState} from "react"
import { useLazyQuery } from '@apollo/client';
import { UserDisplay } from "..";
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { QUERY_USERS_SEARCH } from '../../util/queries';



const UsersList = () => {

    const [searchText, setSearchText] = useState("");

    const [searchUsers, { loading, data }] = useLazyQuery(QUERY_USERS_SEARCH, 
        {
            variables: { search: searchText },
        });

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        searchUsers();
    }


    

    return (
        <div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", padding: "5px"}}>
                
                <Form onSubmit={handleSearchSubmit} style={{width: "100%", maxWidth: "300px", display: "flex"}}>
                    
                        <InputGroup className="mb-3">
                        <FloatingLabel controlId="floatingInput" label="user search">
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
                    
                    {data?.findUsersBySearch?.map((userData, index) => {
                        console.log(userData)
                        return (
                        <div key={index} style={{flex: "1 1 250px", maxHeight: "50%"}}>
                            <UserDisplay userData={userData}  admin/> 
                        </div>
                        )})}
                </div>
            )}
        </div>

    )
}

export default UsersList