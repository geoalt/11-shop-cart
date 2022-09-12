const ITEM_STORAGE = [];

const saveCartItems = ({ id, price, title }) => {
  ITEM_STORAGE.push({
    id,
    price,
    title,
  });

  localStorage.setItem('cartItems', JSON.stringify(ITEM_STORAGE));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
