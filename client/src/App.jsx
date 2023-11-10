import "./App.css";
import Header from "./components/pageElements/Header.component";
import Footer from "./components/pageElements/Footer.component";
import { Outlet } from "react-router-dom"



function App() {
  return (
    <>
      <Header />
      <main>
          <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;