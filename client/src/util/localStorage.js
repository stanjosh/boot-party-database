export const getInventories = () => {
  const productIds = localStorage.getItem('savedInventories')
    ? JSON.parse(localStorage.getItem('savedInventories'))
    : [];

  return productIds;
};

export const saveInventory = (inventoryIds) => {
  if (inventoryIds.length) {
    localStorage.setItem('savedInventories', JSON.stringify(inventoryIds));
  } else {
    localStorage.removeProduct('savedInventories');
  }
};

export const removeProductId = (productId) => {
  const productIds = localStorage.getItem('savedInventories')
    ? JSON.parse(localStorage.getItem('savedInventories'))
    : null;

  if (!productIds) {
    return false;
  }

  const updatedProductIds = productIds?.filter((ProductId) => ProductId !== productId);
  localStorage.setItem('saved_products', JSON.stringify(updatedProductIds));

  return true;
};
