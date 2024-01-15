import React from "react";
import Header from "./components/pageElements/Header.component";
import Footer from "./components/pageElements/Footer.component";
import { Outlet } from "react-router-dom"
import { UserContextProvider, UserContext } from "./util/context/UserContext";



function App() {



  return (
    <UserContextProvider>
    <div style={{minHeight: "100vh", height: "100%"}}>
        <UserContext.Consumer>
          {({user}) => <Header user={user}/>}
        </UserContext.Consumer>
      <main>
        <UserContext.Consumer>
          {({user}) => <Outlet user={user}/>}
        </UserContext.Consumer>
      </main>

        <Footer />

    </div>
    </UserContextProvider>
  );
}

export default App;