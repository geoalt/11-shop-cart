const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('ao chamar a função \'getSavedCartItems\', verifica se o método \'localStorage.getItem\' foi chamado', async () => {
    expect.assertions(1);
    await getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('ao chamar a função \'getSavedCartItems\', verifica se o método \'localStorage.getItem\' foi chamado com \'cartItems\' como parâmetro', async () => {
    const ARG = 'cartItem';

    expect.assertions(1);
    await getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalledWith(ARG);
  });
});
