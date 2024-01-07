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
            <div>
                {userData?.events?.map(event => (
                    <div key={event._id}>
                        <p>{event.name}</p>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.location}</p>
                        <p>{event.guests}</p>
                    </div>
                ))    
                }
            </div>
            <LogoutButton />
        </div>

    );
}

export default UserProfile;
