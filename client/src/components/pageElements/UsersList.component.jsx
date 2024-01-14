
import React from "react"
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../util/queries';
import { UserDisplay } from "./";

    
const UsersList = () => {
    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.findAllUsers;


    return (
        <div>
            

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    
                    {users?.map((event, index) => <div key={index} style={{flex: "1 1 250px", maxHeight: "50%"}}> <UserDisplay userData={event}  admin/> </div>)}
                </div>
            )}
        </div>
    )
}

export default UsersList