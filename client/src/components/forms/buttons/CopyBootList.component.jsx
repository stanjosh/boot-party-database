import { useState } from "react";
import { Button, Alert } from "react-bootstrap";

const CopyBootList = ({ guests }) => {
    const [bootsCopied, setBootsCopied] = useState(false);

    const handleCopyBootList = () => {
        const bootList = document.getElementById('boot-list');
        navigator.clipboard.writeText(bootList.innerText);
        setBootsCopied(true);
     }


    

    return (
        <>
            <Button className="formButton" onClick={handleCopyBootList}>Copy Boot List</Button>
            {bootsCopied && <Alert variant="success">Boot List Copied!</Alert>}
            <table id="boot-list" hidden>
              <tbody>
            { guests?.map((guest, index) => {
              return (
                <>
                <tr key={index}>
                  <td style={{verticalAlign: "top"}}>
                    {guest.name}
                  </td>
                  <td>{guest.boots[0]?.bootName}</td>
                  <td>
                    {guest?.boots?.map((boot, i) => {
                      return (

                        <span key={i}> {boot.size} </span>

                      )
                    })}
                  </td>

                  { guest?.boots?.map((boot, i) => 
                    <td key={i}>{boot.bootSku}</td>  ) }
                  </tr>
                </>
                
              )          
            })}
              </tbody>
            </table>
        </>
    )
}

export default CopyBootList;