import React, { useEffect, useState } from 'react';
import { ButtonToolbar, Modal, Button } from 'react-bootstrap';
import AddInventoryForm from './AddInventoryModal.component';


const Bar = ({inventoryData}) => {
    const [ showAddInventoryModal, setShowAddInventoryModal ] = useState(false);
    useEffect(() => {
     
    }, [inventoryData, showAddInventoryModal]);

    return (
        <>
        <ButtonToolbar className="justify-content-between">
            <Button variant="primary" onClick={() => setShowAddInventoryModal(true)}>Add new inventory</Button>
        </ButtonToolbar>
        <Modal
        size='lg'
        show={showAddInventoryModal}
        onHide={() => setShowAddInventoryModal(false)}
        aria-labelledby='signup-modal'>
        <Modal.Header closeButton>
            <Modal.Title id='add-inventory-modal'>
             Add new inventory
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddInventoryForm inventoryData={inventoryData} handleModalClose={() => setShowAddInventoryModal(false)} />
        </Modal.Body>
      </Modal>
      </>
    );
};

export default Bar;
