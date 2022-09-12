const fetchItem = async (query) => {
  const API_URL = `https://api.mercadolibre.com/items/${query}`;

  const PROMISE = await fetch(API_URL);
  const RESPONSE = await PROMISE.json();
  return RESPONSE;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
