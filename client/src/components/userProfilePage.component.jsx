import React,{useContext} from 'react';
import { userContext } from '../../util/context/userContext';


const UserProfilePage = () => {
    const { userData } = useContext(userContext);



    return (
        <div>
            <ul> 
                <li>Username: {userData.username}</li>
                <li>Email: {userData.email}</li>
                <li>First Name: {userData.firstName}</li>
                <li>Last Name: {userData.lastName}</li>
                <li>Phone Number: {userData.phoneNumber}</li>
                <li>Address: {userData.address}</li>
                <li>City: {userData.city}</li>
                <li>State: {userData.state}</li>
                <li>Zip Code: {userData.zipCode}</li>
            </ul>
        </div>
    );
};

export default UserProfilePage;
