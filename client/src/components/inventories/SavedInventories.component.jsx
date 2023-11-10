import React, { useState, useEffect } from 'react';
import {
  Container,

} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_INVENTORY } from '../../util/mutations';

import Bar from './Toolbar.component';
import InventoryCard from './InventoryCard.component';



const Inventories = ({userData}) => {

  const [ removeInventory ] = useMutation(REMOVE_INVENTORY);
  const [ inventoriesData, setInventoriesData ] = useState(userData?.inventories);

  useEffect(() => {
    console.log(userData)
    if (userData) {
      setInventoriesData(userData?.inventories);
      console.log(inventoriesData)
    }
  }, [inventoriesData, userData]);


  

  const handleRemoveInventory = async (inventoryId) => {
    try {
      await removeInventory({
        variables: { inventoryId }
      });
    } catch (err) {
      console.error(err);
    }
  };



  
  return (
    <Container>
      { (inventoriesData?.length === 0) ? (
        <div>
          <h2 className="text-center">You have no saved Inventories!</h2>
        </div>
      ) : (    
        inventoriesData?.map((inventory) => {
          return(
            <InventoryCard key={inventory._id} inventory={inventory} removeInventory={handleRemoveInventory}/>
          )
        })
      )}
      <Bar inventoryData={inventoriesData}/>
    </Container>
  );
};

export default Inventories;
