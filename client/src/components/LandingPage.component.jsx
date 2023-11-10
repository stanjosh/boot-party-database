
import { useState, useEffect } from 'react';
import SignUpForm from './pageElements/SignupForm.component';

const LandingPage = () => {
    return (
      <>
            <div className="landingPageBox">
                <h1>Welcome to InventoryWiz!</h1>

                <h4>A perfect tool for managing your pantry effortlessly. </h4>
                <h4>Sign up now to start optimizing your inventory management!</h4>
                
               <SignUpForm/>  
               
               </div>
      </>
    );
  };
  
  export default LandingPage;