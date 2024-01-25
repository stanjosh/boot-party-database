
import React, { useState} from "react"
import { useQuery } from '@apollo/client';
import { UserDisplay } from "..";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { QUERY_USERS_SEARCH } from '../../util/queries';



const UsersList = () => {

    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");

    const { loading, data } = useQuery(QUERY_USERS_SEARCH, {
        variables: { search },
    });

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearch(searchText);
        setSearchText("");
    }


    

    return (
        <div>
            <div>
                <Form onSubmit={handleSearchSubmit}>
                    <InputGroup className="mb-3" >
                    <Form.Label htmlFor="search" visuallyHidden >name or email search </Form.Label>
                        <InputGroup.Text>
                        
                            <Form.Control type="text" placeholder="search by name or email" value={searchText} onChange={handleSearchChange} />
                            <Form.Control id="search" type="submit"  />

                        </InputGroup.Text>
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