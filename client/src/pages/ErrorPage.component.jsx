import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError()
  
  return (
    <div className='bg-dark text-light'>
      <h1 >Error <span>{error.status}</span></h1>
      <p>{error.statusText}</p>
        <p>{error.message}</p>
        
      <Link onClick={() => history.back()} >Back</Link>
    </div>
  );
};

export default ErrorPage;