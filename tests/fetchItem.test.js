require('../mocks/fetchSimulator');
const { expect } = require('@jest/globals');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('verifica se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('ao chamar a função \'fetchItem\' com o argumento \'MLB1615760527\', verifica se função \'fetch\' foi chamada', async () => {
    const ARG = 'MLB1615760527';

    expect.assertions(1);
    await fetchItem(ARG)
    expect(fetch).toHaveBeenCalled();
  });

  it('ao chamar a função \'fetchItem\' com o argumento \'MLB1615760527\', verifica se função \'fetch\' utiliza o endpoint \'https://api.mercadolibre.com/items/MLB1615760527\'', async () => {
    const ARG = 'MLB1615760527';
    const EXPECTED = 'https://api.mercadolibre.com/items/MLB1615760527';

    expect.assertions(1);
    await fetchItem(ARG)
    expect(fetch).toHaveBeenCalledWith(EXPECTED);
  });

  it('ao chamar a função \'fetchItem\' com o argumento \'MLB1615760527\', verifica se função \'fetch\' utiliza o endpoint \'https://api.mercadolibre.com/items/MLB1615760527\'', async () => {
    const ARG = 'MLB1615760527';

    expect.assertions(1);
    await fetchItem(ARG)
    expect(fetch).toMatchObject(item);
  });

  it('ao chamar a função \'fetchItem\' sem argumento, verifica se função \'fetch\' retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    const EXPECTED = 'You must provide an url';

    try {
      await fetchItem();
    } catch (e) {
      expect(e.message).toBe(EXPECTED);
    }
  });



});
