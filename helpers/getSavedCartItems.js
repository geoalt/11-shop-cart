const getSavedCartItems = () => {
  const RECOVERY_STORAGE_ITEMS = localStorage.getItem('cartItems');
  return RECOVERY_STORAGE_ITEMS;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
