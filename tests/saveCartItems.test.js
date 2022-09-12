const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('ao chamar a função \'saveCartItems\' com o argumento \'cartItem\', verifica se o método \'localStorage.setItem\' foi chamado', async () => {
    const ARG = 'cartItem';

    expect.assertions(1);
    await saveCartItems(ARG)
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('ao chamar a função \'saveCartItems\' com o argumento \'cartItem\', verifica se o método \'localStorage.setItem\' foi chamado com dois parâmetros, sendo o primeiro a chave \'cartItems\' e o segundo sendo o valor passado como argumento para \'saveCartItems\'', async () => {
    const ARG_A = 'cartItems';
    const ARG_B = '[{},{}]';

    expect.assertions(1);
    await saveCartItems(ARG_B)
    expect(localStorage.setItem).toHaveBeenCalledWith(ARG_A, ARG_B);
  });

});
