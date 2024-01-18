import React,{ useContext, useState } from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../util/queries';
import { UserForm } from '../forms';
import { UserContext } from '../../util/context/UserContext';

const UserProfilePage = () => {
    const { userData, admin } = useContext(UserContext);

    const { loading, data } = useQuery(QUERY_ME);

    console.log(data);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{backgroundColor: "var(--alviesBlue)"}}>
            <UserForm userData={userData} formTitle={'edit user info'} admin={admin}/>
        </div>
    );
};

export default UserProfilePage;
