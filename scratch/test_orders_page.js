const fs = require('fs');

const dataJs = fs.readFileSync('js/data.js', 'utf8');
const storageJs = fs.readFileSync('js/storage.js', 'utf8');
const storeJs = fs.readFileSync('js/store.js', 'utf8');
const ordersHtml = fs.readFileSync('orders.html', 'utf8');

console.log('File lengths:', {
  dataJs: dataJs.length,
  storageJs: storageJs.length,
  storeJs: storeJs.length,
  ordersHtml: ordersHtml.length
});

// Check mock DOM execution
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = v; },
  removeItem: (k) => { delete mockLocalStorage[k]; }
};

global.window = {
  localStorage: global.localStorage,
  dispatchEvent: () => {},
  addEventListener: () => {},
  location: { search: '' }
};
global.CustomEvent = class CustomEvent {};

eval(dataJs);
eval(storageJs);

console.log('window.INITIAL_ORDERS count:', window.INITIAL_ORDERS ? window.INITIAL_ORDERS.length : 0);
console.log('limetreeStorage orders:', window.limetreeStorage.getOrders().length);

const orders = window.limetreeStorage.getOrders();
console.log('Sample order:', orders[0] ? orders[0].orderId : 'none');
if (orders[0]) {
  console.log('Customer:', orders[0].customer);
  console.log('Items:', orders[0].items.length);
  console.log('Status:', orders[0].fulfillmentStatus);
}
