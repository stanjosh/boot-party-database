// MyContext.jsx
import React, { createContext, useState, useEffect } from "react";

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../queries';


export const UserContext = createContext({
    userData: null,
    setUserData: () => {},
});

export const UserContextProvider = ({ children }) => {
    const { loading, data } = useQuery(QUERY_ME);
    const [userData, setUserData] = useState(data?.me);

    useEffect(() => { 
        if (data?.me) {
          setUserData(data?.me)
        }
      }  , [userData, data, loading])

      return (
		<UserContext.Provider value={{ userData, loading }}>
			{children}
		</UserContext.Provider>
	);
};

