const fs = require('fs');
const assert = require('assert');

console.log('====================================================');
console.log('  TESTING SIZE GUIDE REMOVAL & PER-DRESS ORDER FLOW');
console.log('====================================================\n');

// 1. Verify riyaa-trends.html static section removed
const riyaaHtml = fs.readFileSync('riyaa-trends.html', 'utf8');
assert(!riyaaHtml.includes('id="sizeGuideSection"'), 'FAIL: sizeGuideSection must be removed from riyaa-trends.html');
assert(!riyaaHtml.includes('href="#sizeGuideSection"'), 'FAIL: footer link must not point to #sizeGuideSection');
assert(riyaaHtml.includes('openSizeGuideModal()'), 'PASS: footer link connects to openSizeGuideModal()');
console.log('✓ PASS: Static sizeGuideSection completely removed from riyaa-trends.html');

// 2. Verify catalog data has full XS to XXL sizes
const data = require('../js/data.js');
const rtProducts = data.RIYAA_TRENDS_PRODUCTS;
assert.strictEqual(rtProducts.length, 6, 'Riyaa Trends must have 6 products');

rtProducts.forEach(prod => {
  const sizes = (prod.variants || []).map(v => v.size);
  ['XS', 'S', 'M', 'L', 'XL', 'XXL'].forEach(size => {
    assert(sizes.includes(size), `Product ${prod.id} (${prod.name}) missing size ${size}`);
  });
});
console.log('✓ PASS: All 6 apparel products have complete XS, S, M, L, XL, XXL variants');

// 3. Verify store.js contains per-dress Size & Fit Guide logic
const storeJs = fs.readFileSync('js/store.js', 'utf8');
assert(storeJs.includes('apparel-size-buttons-grid'), 'store.js has apparel size buttons grid');
assert(storeJs.includes('modal-size-table'), 'store.js has embedded size table');
assert(storeJs.includes('Comprehensive Size &amp; Fit Guide'), 'store.js has Comprehensive Size & Fit Guide in modal');
assert(storeJs.includes('Precision Tailoring Standards'), 'store.js has Precision Tailoring Standards');
assert(storeJs.includes('1. Chest Measurement:'), 'store.js has 1. Chest Measurement pointer');
assert(storeJs.includes('2. Garment Length:'), 'store.js has 2. Garment Length pointer');
assert(storeJs.includes('3. Care Instructions:'), 'store.js has 3. Care Instructions pointer');
assert(storeJs.includes('toggleModalSizeGuide()'), 'store.js has toggleModalSizeGuide method');
assert(storeJs.includes('openSizeGuideModal()'), 'store.js has openSizeGuideModal method');
console.log('✓ PASS: Store engine embeds Comprehensive Size & Fit Guide inside dress quick-view modal');

// 4. Test ordering with selected size in Storage engine
// Mock localStorage
const storageStore = {};
global.localStorage = {
  getItem: (key) => storageStore[key] || null,
  setItem: (key, val) => { storageStore[key] = String(val); },
  removeItem: (key) => { delete storageStore[key]; }
};
global.window = {
  INITIAL_PRODUCTS: data.INITIAL_PRODUCTS,
  INITIAL_SETTINGS: data.INITIAL_SETTINGS || {},
  INITIAL_INVENTORY_BATCHES: data.INITIAL_INVENTORY_BATCHES || [],
  LIMETREE_BUSINESSES: data.LIMETREE_BUSINESSES
};

delete require.cache[require.resolve('../js/storage.js')];
const LimetreeStorageClass = require('../js/storage.js');
const storage = new LimetreeStorageClass();

// Test adding a dress with size "M"
const firstDress = rtProducts[0];
const mVariant = firstDress.variants.find(v => v.size === 'M');
assert(mVariant, 'M variant exists');

storage.clearCart();
storage.addToCart({
  productId: firstDress.id,
  variantId: mVariant.id,
  quantity: 2
});

const cart = storage.getCart();
assert.strictEqual(cart.length, 1, 'Cart has 1 item');
assert(cart[0].variantLabel.includes('Size: M'), `Cart item has size M label: ${cart[0].variantLabel}`);
console.log(`✓ PASS: Dress added to cart with selected size: ${cart[0].variantLabel}`);

// Test creating order with size M
const order = storage.createOrder({
  items: cart,
  subtotal: cart[0].price * 2,
  discount: 0,
  shipping: 0,
  tax: 0,
  total: cart[0].price * 2,
  customer: {
    name: 'Priya Sundaram',
    email: 'priya@example.com',
    phone: '9876543210',
    address: '12 Temple Street, Coimbatore'
  },
  paymentMethod: 'UPI'
});

assert(order && order.orderId, 'Order created successfully');
assert.strictEqual(order.items[0].variantId, mVariant.id, 'Order retains exact selected variant ID');
assert(order.items[0].variantLabel.includes('Size: M'), 'Order retains Size: M in item label');
console.log(`✓ PASS: Order ${order.orderId} placed successfully with chosen size M!`);

console.log('\n====================================================');
console.log('  ALL SIZE GUIDE & ORDER SELECTION TESTS PASSED!');
console.log('====================================================');
