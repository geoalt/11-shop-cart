require('../mocks/fetchSimulator');
const { expect } = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('verifica se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('ao chamar a função \'fetchProducts\' com o argumento \'computador\', verifica se função \'fetch\' foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  });

  it('ao chamar a função \'fetchProducts\' com o argumento \'computador\', verifica se função \'fetch\' utiliza o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computador\'', async () => {
    const EXPECTED = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(EXPECTED);
  });

  it('ao chamar a função \'fetchProducts\' com o argumento \'computador\', verifica se o retorno é uma estrutura de dados igual ao objeto \'computadorSearch\'', async () => {
    const ARG = 'computador'

    expect.assertions(1);
    await fetchProducts(ARG);
    console.log(fetch)
    expect(fetch).toMatchObject(computadorSearch);
  });

  it('ao chamar a função \'fetchProduct\' sem argumento, verifica se função \'fetch\' retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    expect.assertions(1);

    try {
      await fetchProducts();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
