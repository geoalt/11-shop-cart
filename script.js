// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const CART_PRICE = document.querySelector('.total-price');
const EMPTY_CART = document.querySelector('.empty-cart');
const CREATE_PARA = document.createElement('P');

function displayLoading(selector, element) {
  const s = document.querySelector(selector);
  const e = document.createElement(element);
  e.innerText = 'carregando...';
  e.classList.add('loading');

  s.append(e);
}

function removeLoading() {
  const LOADING = document.querySelector('.loading');
  LOADING.remove();
}

function refreshPrice() {
  const CART_TOTAL = ITEM_STORAGE
    .reduce((total, item) => total + item.price, 0);

  CREATE_PARA.innerText = `Subtotal: R$${CART_TOTAL}`;
  CART_PRICE.appendChild(CREATE_PARA);
}

function append(item, parentElement) {
  const SELECT_SECTION = document.querySelector(parentElement);
  SELECT_SECTION.appendChild(item);
}

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  append(section, '.items');
};

function clearStorage() {
  while (ITEM_STORAGE.length > 0) {
    ITEM_STORAGE.pop();
  }

  localStorage.clear();
}

function removeFromLocalStorage(id, callback) {
  const STORAGE = JSON.parse(getSavedCartItems());
  const FIND_ITEM = STORAGE.findIndex((item) => item.id === id);
  STORAGE.splice(FIND_ITEM, 1);

  callback();

  STORAGE.forEach((item) => {
    saveCartItems(item);
  });
}

function extractCartItemId(string) {
  const TARGET_TEXT = string.innerText;
  const SPLIT = TARGET_TEXT.split(' | ');
  const SLICE = SPLIT[0].slice(4);
  removeFromLocalStorage(SLICE, clearStorage);
}

function cartItemClickListener(e) {
  const TARGET = e.target;
  TARGET.remove();
  extractCartItemId(TARGET);
  refreshPrice();
}

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);

  append(li, '.cart__items');
  saveCartItems({ id, title, price });
};

async function sendCartItemToBeCreated(id) {
  displayLoading('.cart', 'p');

  const FETCH = await fetchItem(id);
  createCartItemElement(FETCH);

  removeLoading();
  refreshPrice();
}

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => {
  const SECTION = product.target.parentElement;
  const SELECT_CLASS = SECTION.querySelector('.item_id');
  const ITEM_ID = SELECT_CLASS.innerText;
  sendCartItemToBeCreated(ITEM_ID);
};

async function requestFromProductName() {
  displayLoading('.items', 'p');

  const FETCH = await fetchProducts('computador');
  FETCH.results.forEach(createProductItemElement);

  removeLoading();
}

function addEventToProductButton() {
  const GET_BUTTONS = document.querySelectorAll('.item__add');
  GET_BUTTONS.forEach((button) => button.addEventListener('click', getIdFromProductItem));
}

function requestLocalCartItems() {
  const RECOVERY = getSavedCartItems();
  const PARSING = JSON.parse(RECOVERY);
  if (PARSING) {
    PARSING.forEach(createCartItemElement);
  }
}

function emptyCart() {
  const CART_ITEM = document.querySelectorAll('.cart__item');
  CART_ITEM.forEach((it) => it.remove());

  clearStorage();
  refreshPrice();
}

EMPTY_CART.addEventListener('click', emptyCart);

window.onload = async () => {
  await requestFromProductName();
  addEventToProductButton();
  requestLocalCartItems();
  refreshPrice();
};