const fetchProducts = async (query) => {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  try {
    const PROMISE = await fetch(API_URL);
    const RESPONSE = await PROMISE.json();
    return RESPONSE;
  } catch (error) {
    console.error(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
