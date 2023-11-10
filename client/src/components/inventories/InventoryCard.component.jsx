import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Container, NavDropdown } from 'react-bootstrap';
import AddProduct from './AddProduct.component';

import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY, ADD_PRODUCT_QUANTITY, REMOVE_INVENTORY } from '../../util/mutations';

const InventoryCard = ({ inventory, onRemoveInventory }) => {
  const [ decreaseProductQuantity ] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);
  const [ increaseProductQuantity ] = useMutation(ADD_PRODUCT_QUANTITY);
  const [ inventoryData, setInventoryData ] = useState({...inventory});
  const [ productData, setProductData ] = useState([...inventory.products]);
  const [ removeInventory ] = useMutation(REMOVE_INVENTORY);


  useEffect(() => {
    if (inventory) {
      setInventoryData(inventory);
      setProductData(inventory.products);
      console.log(productData);
    }
  }, [inventory, productData]);

  const reduceProductToQuantity = (products) => {
    const productsToQuantize = products.map((product) => {
      return  { 
        quantity : products.filter((p) => p._id === product._id).length,
        ...product
      }
    })
    return quantizeProducts(productsToQuantize)
  }

  const quantizeProducts = (products) => {
    let quantProducts = products.reduce((acc, product) =>
    acc.find((v) => v._id === product._id) 
      ? acc 
      : [...acc, product], [])  
  return quantProducts
  };


  const increaseProduct = async (inventoryId, productId) => {
    try {
      await increaseProductQuantity({
        variables: { inventoryId, productId }
      });
      console.log(inventoryId)
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseProduct = async (inventoryId, productId, quantity) => {
    try {
      quantity = quantity - 1
      await decreaseProductQuantity({
        variables: { inventoryId, productId, quantity }
      });
    } catch (err) {
      console.error(err);
    }
  };


  const handleRemoveInventory = async (inventoryId) => {
    try {
      await removeInventory({
        variables: { inventoryId }
      });
      
      // Call the onRemoveInventory function if it is passed as a prop
      if (onRemoveInventory) {
        onRemoveInventory(inventoryId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }


return(

    <Card bg='dark' text='light' className='w-100 my-5' key={inventory._id}>
      <Card.Header>
        <h3>
          {inventoryData.inventoryName} {`$${inventoryData?.priceTotal?.toFixed(2)}`}

        </h3>
      </Card.Header>
    
    <h5>Products:</h5>
    <ListGroup variant='flush' >
    {reduceProductToQuantity(productData).map((product) => {
        return(
        <ListGroup.Item key={product._id + product.quantity } style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h4>{product.quantity} {product.name}</h4>
            <Container fluid='true' >{`${formatMoney(product.quantity * product.price)}`}
            <Button color='dark' style={{width: '2rem' }} onClick={() => increaseProduct(inventory._id, product._id)}>+</Button>
            <Button color='dark' style={{width: '2rem' }} onClick={() => decreaseProduct(inventory._id, product._id, product.quantity)}>-</Button>
            </Container>

        </ListGroup.Item>)
    })}
    </ListGroup>
    <NavDropdown
        title="Add New Products"
        id={`offcanvasNavbarDropdown-expand-${false}`}
        >
        <AddProduct inventoryId={inventory._id}/>
        </NavDropdown>
    </Card>
)
  };

export default InventoryCard;