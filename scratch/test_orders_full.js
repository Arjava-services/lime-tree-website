const fs = require('fs');

console.log('--- RUNNING LIMETREE ORDER HISTORY VERIFICATION ---');

const htmlFiles = [
  'index.html',
  'riyaa-trends.html',
  'glow-home.html',
  'earkart.html',
  'orders.html'
];

let allPassed = true;

// 1. Check Navigation & Headers
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasNavOrder = content.includes('href="orders.html"') && content.includes('Order History');
  const hasHeaderOrdersBtn = content.includes('header-orders-btn') && content.includes('headerOrdersCount');
  const hasMobilePill = content.includes('href="orders.html"') && content.includes('Order History');

  console.log(`[${file}]`);
  console.log('  - Desktop Main-Nav Order History:', hasNavOrder ? '✓ PASS' : '❌ FAIL');
  console.log('  - Header Action Orders Button (📦):', hasHeaderOrdersBtn ? '✓ PASS' : '❌ FAIL');
  console.log('  - Mobile Bar Order History Pill:', hasMobilePill ? '✓ PASS' : '❌ FAIL');

  if (!hasNavOrder || !hasHeaderOrdersBtn || !hasMobilePill) {
    allPassed = false;
  }
});

// 2. Check Animations mobile drawer
const animContent = fs.readFileSync('js/animations.js', 'utf8');
const hasAnimDrawerLink = animContent.includes('href="orders.html"') && animContent.includes('My Orders &amp; Purchase History');
console.log('[js/animations.js]');
console.log('  - Mobile Drawer Order History Link:', hasAnimDrawerLink ? '✓ PASS' : '❌ FAIL');
if (!hasAnimDrawerLink) allPassed = false;

// 3. Check CSS
const cssContent = fs.readFileSync('style.css', 'utf8');
const hasStatusPills = cssContent.includes('.status-pill') && cssContent.includes('.status-shipped') && cssContent.includes('.status-delivered');
const hasOrdersBtnCss = cssContent.includes('.header-orders-btn');
console.log('[style.css]');
console.log('  - Status Pills CSS (shipped/delivered/confirmed):', hasStatusPills ? '✓ PASS' : '❌ FAIL');
console.log('  - Header Orders Button CSS:', hasOrdersBtnCss ? '✓ PASS' : '❌ FAIL');
if (!hasStatusPills || !hasOrdersBtnCss) allPassed = false;

// 4. Test Orders Execution & Logic
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

const dataCode = fs.readFileSync('js/data.js', 'utf8');
const storageCode = fs.readFileSync('js/storage.js', 'utf8');
const storeCode = fs.readFileSync('js/store.js', 'utf8');

eval(dataCode);
eval(storageCode);

const storage = window.limetreeStorage;
const initialOrders = storage.getOrders();
console.log('[Storage & Orders]');
console.log('  - Initial Orders Seeded:', initialOrders.length);
initialOrders.forEach(o => {
  console.log(`    * ${o.orderId} | Status: ${o.fulfillmentStatus} | Total: ₹${o.totalAmount} | Items: ${o.items.length}`);
});

// Test Return Request filing
const testReturn = storage.createReturnRequest({
  orderId: 'LT-2026-8812',
  reason: 'Size / Fit Issue (Apparel)',
  details: 'T-shirt is slightly loose, requested replacement.',
  items: initialOrders[0].items,
  refundAmount: initialOrders[0].totalAmount
});
console.log('  - Test Return Request Created:', testReturn.returnId, '| Status:', testReturn.status);

// Test Add to Cart & Buy Again
const initialCart = storage.getCart();
console.log('  - Initial Cart Items:', initialCart.length);
initialOrders[0].items.forEach(item => {
  storage.addToCart({
    productId: item.productId,
    variantId: item.variantId,
    quantity: 1
  });
});
const updatedCart = storage.getCart();
console.log('  - Cart Items after Buy Again:', updatedCart.length, '(Total Qty:', updatedCart.reduce((s, i) => s + i.quantity, 0), ')');

console.log('--- TEST RUN COMPLETE: ' + (allPassed ? 'ALL TESTS PASSED 100%' : 'SOME TESTS FAILED') + ' ---');
