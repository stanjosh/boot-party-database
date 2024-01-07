import React, { useContext } from "react";
import { LogoutButton } from "./forms/buttons";
import { UserContext } from "../util/context/UserContext";

const UserProfile = () => {
    const { userData } = useContext(UserContext);
    
    return (
        <div>
            <h1>User Profile</h1>
            <p>{userData?.username}</p>
            <p>{userData?.email}</p>
            <p>{userData?.guestProfile?.firstName}</p>
            <p>{userData?.guestProfile?.lastName}</p>
            <p>{userData?.guestProfile?.phoneNumber}</p>
            <p>{userData?.guestProfile?.address}</p>
            <LogoutButton />
        </div>

    );
}

export default UserProfile;
