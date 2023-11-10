import { useState } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Product = ({productData}) => {
//   // State to manage product editing
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(name);
//   const [editedQuantity, setEditedQuantity] = useState(quantity);

//   // Function to toggle product editing mode
//   const toggleEdit = () => {
//     setIsEditing(!isEditing); 
//   };

//   // Function to save edited product
//   const saveEditedProduct = () => {
//     // Perform validation if needed
//     if (editedName && editedQuantity) {
//       onEdit(id, editedName, editedQuantity);
//       setIsEditing(false);
//     }
//   };
// 0
//   function removeProduct(button) {
//     const listProduct = button.parentElement;
//     listProduct.remove();
// }

// function addProduct() {
//   if (productText === "") {
//       alert("Please enter an product.");
//       return;
//   }


  //<button onclick="removeProduct(this)">Delete</button>

  return (

        <Card key={productData.productId} style={{ width: '18rem' }} border='dark'>
          {productData.image ? (
            <Card.Img src={productData.image} alt={`The cover for ${productData.name}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{productData.name}</Card.Title>
            <p className='small'>Brand: {productData.brand}</p>
            <p className='small'>Price: {`$${productData.price.toFixed(2)}`}</p>
            <p className='small'>UPC: {productData.UPC}</p>
            <Card.Text>{productData.description}</Card.Text>
            {/* {Auth.loggedIn() && (
              <Button
                disabled={savedProductIds?.some((savedProductId) => savedProductId === productData.productId)}
                className='btn-block btn-info'
                onClick={() => handleSaveItem(productData.productId)}>
                {savedProductIds?.some((savedProductId) => savedProductId === productData.productId)
                  ? 'This item has already been saved!'
                  : 'Save this Item!'}
              </Button>
            )} */}
          </Card.Body>
              {/* <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
          <button onClick={saveEditedProduct}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      )
       : (
        <div>
          <span>{name} (Quantity: {quantity})</span>
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </li> */}
        </Card>



  )
};

Product.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default Product;