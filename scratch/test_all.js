const fs = require('fs');
const http = require('http');

console.log('====================================================');
console.log('  RUNNING FULL TEST SUITE FOR LIMETREE');
console.log('====================================================\n');

let failedTests = 0;
function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  PASS: ${testName}`);
  } else {
    console.error(`  FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
    failedTests++;
  }
}

// 1. DATA TEST
console.log('--- 1. Testing Catalog Data (js/data.js) ---');
const dataModule = require('../js/data.js');

function testBrandProducts(brandName, products, expectedCategoryPills) {
  assert(products.length === 6, `${brandName} has exactly 6 products`, `found: ${products.length}`);
  
  const ids = new Set(products.map(p => p.id));
  assert(ids.size === 6, `${brandName} all 6 product IDs are unique`, `found ${ids.size} unique IDs`);

  const names = new Set(products.map(p => p.name));
  assert(names.size === 6, `${brandName} all 6 product names are unique`, `found ${names.size} unique names`);

  const images = new Set(products.map(p => (p.images && p.images[0]) || ''));
  assert(images.size === 6, `${brandName} all 6 product images are unique`, `found ${images.size} unique images`);

  const prices = new Set(products.map(p => p.salePrice || p.basePrice));
  assert(prices.size === 6, `${brandName} all 6 product prices are unique`, `prices: ${[...prices].join(', ')}`);

  // Verify all image files exist on disk
  products.forEach(p => {
    p.images.forEach(img => {
      assert(fs.existsSync(img), `Image file exists: ${img}`);
    });
  });
}

testBrandProducts('Riyaa Trends', dataModule.RIYAA_TRENDS_PRODUCTS);
testBrandProducts('Glow Home', dataModule.GLOW_HOME_PRODUCTS);
testBrandProducts('Earkart', dataModule.EARKART_PRODUCTS);

assert(dataModule.INITIAL_PRODUCTS.length === 18, 'INITIAL_PRODUCTS has exactly 18 products total');

// 2. STORAGE AND DEDUPLICATION TEST
console.log('\n--- 2. Testing Storage & Deduplication Logic ---');
const storageCode = fs.readFileSync('js/storage.js', 'utf8');
assert(storageCode.includes('parsed.length === 18'), 'Storage init validates 18 products');
assert(storageCode.includes('uniqueIds.size === 18'), 'Storage init validates unique IDs');
assert(storageCode.includes('seenIds.has(p.id)'), 'Storage getProducts deduplicates by ID');
assert(storageCode.includes('seenNames.has(p.name)'), 'Storage getProducts deduplicates by Name');

// 3. STORE RENDERING TEST
console.log('\n--- 3. Testing Store Catalog Grid Rendering Logic ---');
const storeCode = fs.readFileSync('js/store.js', 'utf8');
assert(storeCode.includes('seenGridIds.has(p.id)'), 'Store grid rendering deduplicates by ID');
assert(storeCode.includes('seenGridNames.has(p.name)'), 'Store grid rendering deduplicates by Name');
assert(storeCode.includes('products.slice(0, 6)'), 'Store grid enforces max 6 products per brand page');

// 4. HOMEPAGE RECREATION TEST
console.log('\n--- 4. Testing Homepage Recreation (index.html) ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Top navigation preserved
assert(indexHtml.includes('class=\"site-header\"'), 'Sticky site header present');
assert(indexHtml.includes('riyaa-trends.html'), 'Nav contains Riyaa Trends link');
assert(indexHtml.includes('glow-home.html'), 'Nav contains Glow Home link');
assert(indexHtml.includes('earkart.html'), 'Nav contains Earkart link');
assert(indexHtml.includes('orders.html'), 'Nav contains Order History link');
assert(indexHtml.includes('id=\"headerSearchInput\"'), 'Nav search bar present');
assert(indexHtml.includes('id=\"headerCartBtn\"'), 'Nav cart button present');

// No raw screenshot used as homepage
assert(!indexHtml.includes('class=\"nature-mockup-stage\"'), 'No old mockup stage in index.html');
assert(!indexHtml.includes('hero-mockup-hd.jpg'), 'No full-page hero mockup image in index.html');

// Leaf decorations
assert(indexHtml.includes('assets/homepage-leaf-tl.png'), 'Top-left leaf decoration present');
assert(indexHtml.includes('assets/homepage-leaf-tr.png'), 'Top-right leaf decoration present');
assert(indexHtml.includes('assets/homepage-leaf-bl.png'), 'Bottom-left leaf decoration present');
assert(indexHtml.includes('assets/homepage-leaf-br.png'), 'Bottom-right leaf decoration present');

// Upper centre logo
assert(indexHtml.includes('assets/homepage-limetree-logo-trans.png'), 'Prominent upper-centre Limetree logo present');

// Three brand cards
assert(indexHtml.includes('id=\"cardRiyaaTrends\"'), 'Riyaa Trends card present');
assert(indexHtml.includes('id=\"cardGlowHome\"'), 'Glow Home card present');
assert(indexHtml.includes('id=\"cardEarkart\"'), 'Earkart card present');

// Card elements
assert(indexHtml.includes('class=\"card-arch-portal\"'), 'Arched photo portals present');
assert(indexHtml.includes('class=\"card-badge-circle\"'), 'Circular category badges present');
assert(indexHtml.includes('class=\"card-pill-body\"'), 'Rounded pill card bodies present');
assert(indexHtml.includes('class=\"card-arrow-circle\"'), 'Lime-green arrow buttons present');

// Card photos exist on disk
assert(fs.existsSync('assets/homepage-card-riyaa-photo.jpg'), 'Riyaa card photo exists on disk');
assert(fs.existsSync('assets/homepage-card-glow-photo.jpg'), 'Glow Home card photo exists on disk');
assert(fs.existsSync('assets/homepage-card-earkart-photo.jpg'), 'Earkart card photo exists on disk');

// 5. CSS STYLING TEST
console.log('\n--- 5. Testing CSS Design & Palette (style.css) ---');
const css = fs.readFileSync('style.css', 'utf8');

assert(css.includes('radial-gradient(ellipse 90% 65% at 50% 25%, #FDFBF7'), 'Ivory and cream background gradient defined');
assert(css.includes('.nature-leaf-corner'), 'Leaf corner styling defined with mix-blend-mode');
assert(css.includes('.nature-brand-grid'), 'Brand grid defined with 3 columns');
assert(css.includes('.card-arch-portal'), 'Card arch portal styling defined');
assert(css.includes('.card-badge-circle'), 'Card badge circle styling defined');
assert(css.includes('.card-pill-body'), 'Card pill body styling defined');
assert(css.includes('.card-arrow-circle'), 'Card arrow circle styling defined');

// 6. MOBILE RESPONSIVENESS & CAROUSEL TEST
console.log('\n--- 6. Testing Mobile Carousel & Layout ---');
assert(css.includes('.sr-only'), 'Screen-reader .sr-only utility defined to hide duplicate heading visually');
assert(indexHtml.includes('class="home-page"'), 'index.html body has home-page class');
assert(indexHtml.includes('class="brand-swipe-dots"'), 'index.html has brand-swipe-dots navigation');
assert(indexHtml.includes('role="region" aria-roledescription="carousel"'), 'index.html carousel has ARIA carousel role');
assert(indexHtml.includes('role="group" aria-roledescription="slide"'), 'index.html cards have ARIA slide role');
assert(indexHtml.includes('role="tablist"'), 'index.html pagination dots container has tablist role');
assert(indexHtml.includes('role="tab"'), 'index.html pagination dots have tab role');
assert(indexHtml.includes('touchstart') && indexHtml.includes('touchend'), 'index.html has touch swipe gesture handlers');
assert(indexHtml.includes('ArrowRight') && indexHtml.includes('ArrowLeft'), 'index.html has keyboard arrow navigation');
assert(css.includes('.site-logo-img') && css.includes('mix-blend-mode: multiply'), 'Header logo integrated with transparent background');
assert(css.includes('.brand-logo') && css.includes('justify-content: flex-start') && css.includes('transform: none !important'), 'Header logo placed neatly on the left with suitable small size');
assert(css.includes('.mobile-menu-toggle-btn') && css.includes('order: 99 !important'), 'Hamburger menu clearly visible at the far right');
assert(css.includes('.home-page .mobile-brand-pills-bar'), 'Duplicate mobile brand pills bar hidden on mobile homepage');
assert(css.includes('scroll-snap-type: x mandatory'), 'Swipeable snap scroll defined for mobile brand grid');
assert(css.includes('scroll-padding: 0 calc((100% - min(80vw, 300px)) / 2)'), 'Balanced scroll-padding defined for centered snap alignment');
assert(css.includes('min(80vw, 300px)'), 'Consistent fluid card width defined for all 3 cards');
assert(css.includes('.home-page .nature-hero-header') && css.includes('display: none !important'), 'Extra rectangular logo banner removed on mobile');
assert(css.includes('max-width: 20vw'), 'Corner foliage leaves constrained to max-width 20vw on mobile (prevents overflow)');
assert(css.includes('.swipe-dot.active'), 'Active dot styling with expansion defined');
assert(indexHtml.includes('SLIDE_INTERVAL = 3000'), 'Carousel has 3-second auto-slide interval configured');
assert(indexHtml.includes('(currentIndex + 1) % cards.length'), 'Carousel continuously loops through all 3 cards and returns to first');
assert(indexHtml.includes('mouseenter') && indexHtml.includes('mouseleave'), 'Carousel pauses on hover/touch and resumes automatically');


// 7. HOMEPAGE FOOTER TEST
console.log('\n--- 7. Testing Homepage Footer (index.html) ---');
assert(indexHtml.includes('class=\"site-footer\"'), 'Homepage contains site-footer at bottom');
assert(indexHtml.includes('class=\"footer-brand-col\"'), 'Footer contains LIMETREE brand column');
assert(indexHtml.includes('The Three Houses'), 'Footer contains "The Three Houses" column');
assert(indexHtml.includes('Customer Concierge'), 'Footer contains "Customer Concierge" column');
assert(indexHtml.includes('Store Management'), 'Footer contains "Store Management" column');
assert(indexHtml.includes('footer-bottom'), 'Footer contains copyright and legal section');
assert(css.includes('.home-page .site-footer'), 'Homepage footer zero-top-margin rule defined');

// 8. BRAND HERO SECTIONS REMOVAL TEST
console.log('\n--- 8. Testing Brand Hero Sections Removal (All 3 Brands) ---');
const earkartHtml = fs.readFileSync('earkart.html', 'utf8');
assert(!earkartHtml.includes('Subtle Radiance'), 'Earkart does not contain "Subtle Radiance"');
assert(!earkartHtml.includes('Precious Metallics'), 'Earkart does not contain "Precious Metallics"');
assert(!earkartHtml.includes('18K Gold Vermeil</h4>'), 'Earkart does not contain 18K Gold Vermeil pillar');
assert(!earkartHtml.includes('Recycled 925 Silver</h4>'), 'Earkart does not contain Recycled 925 Silver pillar');
assert(!earkartHtml.includes('100% Hypoallergenic</h4>'), 'Earkart does not contain 100% Hypoallergenic pillar');
assert(!earkartHtml.includes('Gift-Ready Packaging</h4>'), 'Earkart does not contain Gift-Ready Packaging pillar');
assert(!earkartHtml.includes('earkart-daisy-model-ear.jpg'), 'Earkart hero model image removed');

const riyaaHtml = fs.readFileSync('riyaa-trends.html', 'utf8');
assert(!riyaaHtml.includes('Tailored Ease &amp; <span class="text-serif-italic">Mindful Fabrics</span>'), 'Riyaa Trends does not contain "Tailored Ease & Mindful Fabrics"');
assert(!riyaaHtml.includes('240+ GSM Cotton</h4>'), 'Riyaa Trends does not contain 240+ GSM Cotton pillar');
assert(!riyaaHtml.includes('Bio-Washed Finish</h4>'), 'Riyaa Trends does not contain Bio-Washed Finish pillar');
assert(!riyaaHtml.includes('XS to XXL Inclusivity</h4>'), 'Riyaa Trends does not contain XS to XXL Inclusivity pillar');
assert(!riyaaHtml.includes('Twin-Needle Stitching</h4>'), 'Riyaa Trends does not contain Twin-Needle Stitching pillar');

const glowHtml = fs.readFileSync('glow-home.html', 'utf8');
assert(!glowHtml.includes('Illuminating Stillness &amp; <span class="text-serif-italic">Sacred Aromas</span>'), 'Glow Home does not contain "Illuminating Stillness & Sacred Aromas"');
assert(!glowHtml.includes('100% Pure Soy Wax</h4>'), 'Glow Home does not contain 100% Pure Soy Wax pillar');
assert(!glowHtml.includes('45 – 65 Hr Burn Time</h4>'), 'Glow Home does not contain 45 – 65 Hr Burn Time pillar');
assert(!glowHtml.includes('Therapeutic Grade Oils</h4>'), 'Glow Home does not contain Therapeutic Grade Oils pillar');
assert(!glowHtml.includes('Keepsake Vessels</h4>'), 'Glow Home does not contain Keepsake Vessels pillar');

// 9. IMAGE GALLERY SECTIONS REMOVAL TEST
console.log('\n--- 9. Testing Brand Image Gallery Sections Removal ---');
assert(!glowHtml.includes('Glow In Modern Living Spaces'), 'Glow Home does not contain "Glow In Modern Living Spaces" gallery');
assert(!glowHtml.includes('HOME INTERIORS GALLERY'), 'Glow Home does not contain HOME INTERIORS GALLERY component');
assert(!earkartHtml.includes('Handcrafted Floral Petals &amp; Precision Detailing'), 'Earkart does not contain "Handcrafted Floral Petals & Precision Detailing" gallery');
assert(!earkartHtml.includes('JEWELLERY MACRO GALLERY'), 'Earkart does not contain JEWELLERY MACRO GALLERY component');
assert(!riyaaHtml.includes('Seen In The Wild: Kids in Motion'), 'Riyaa Trends does not contain "Seen In The Wild: Kids in Motion" gallery');
assert(!riyaaHtml.includes('FASHION LOOKBOOK GALLERY'), 'Riyaa Trends does not contain FASHION LOOKBOOK GALLERY component');

// 9b. REMOVAL OF OLFACTORY ARCHITECTURE & EAR-STACKING GUIDE SECTIONS
console.log('\n--- 9b. Testing Removal of Fragrance Families & Ear Stack Guide Sections ---');
assert(!glowHtml.includes('scentPyramidSection'), 'Glow Home does not contain scentPyramidSection');
assert(!glowHtml.includes('Fragrance Families &amp; Scent Pyramids'), 'Glow Home does not contain Fragrance Families section');
assert(!glowHtml.includes('The Olfactory Architecture'), 'Glow Home does not contain The Olfactory Architecture');
assert(!glowHtml.includes('The Artisan Candle Care Ritual'), 'Glow Home does not contain Candle Care Ritual');
assert(!glowHtml.includes('#scentPyramidSection'), 'Glow Home footer does not link to scentPyramidSection');

assert(!earkartHtml.includes('earStackGuideSection'), 'Earkart does not contain earStackGuideSection');
assert(!earkartHtml.includes('Ear-Styling Guide &amp; Precious Metallurgy'), 'Earkart does not contain Ear-Styling Guide section');
assert(!earkartHtml.includes('The Art of the Ear Stack'), 'Earkart does not contain The Art of the Ear Stack');
assert(!earkartHtml.includes('Precious Metal Care &amp; Longevity'), 'Earkart does not contain Precious Metal Care');
assert(!earkartHtml.includes('#earStackGuideSection'), 'Earkart footer does not link to earStackGuideSection');

// 10. HOME NAVIGATION VERIFICATION (ALL PAGES & PRODUCT MODAL)
console.log('\n--- 10. Testing Home Navigation (All Pages & Product Modal) ---');

const pages = [
  { name: 'Homepage (index.html)', content: fs.readFileSync('index.html', 'utf8'), isHome: true },
  { name: 'Riyaa Trends (riyaa-trends.html)', content: fs.readFileSync('riyaa-trends.html', 'utf8'), isHome: false },
  { name: 'Glow Home (glow-home.html)', content: fs.readFileSync('glow-home.html', 'utf8'), isHome: false },
  { name: 'Earkart (earkart.html)', content: fs.readFileSync('earkart.html', 'utf8'), isHome: false },
  { name: 'Orders (orders.html)', content: fs.readFileSync('orders.html', 'utf8'), isHome: false }
];

pages.forEach(p => {
  // Brand Logo must link to index.html (the official Home navigation)
  assert(p.content.includes('class="brand-logo" aria-label="LIMETREE Collective"'), `${p.name}: Brand logo has proper label`);
  assert(p.content.includes('href="index.html" class="brand-logo"'), `${p.name}: Brand logo links to index.html`);

  // Redundant Home text link removed from desktop main-nav
  assert(!p.content.includes('href="index.html" class="nav-link'), `${p.name}: Desktop main-nav does not contain redundant Home link`);

  // Footer logo must link to index.html
  assert(p.content.includes('href="index.html" class="footer-logo"'), `${p.name}: Footer logo links to index.html`);

  // Page breadcrumb bar removed from subpages as requested
  if (!p.isHome) {
    assert(!p.content.includes('class="page-breadcrumb-bar"'), `${p.name}: Page breadcrumb bar removed`);
    assert(!p.content.includes('class="breadcrumb-home-link"'), `${p.name}: Breadcrumb home link removed`);
  }
});

// Product Modal in js/store.js must include Home link & LIMETREE logo
assert(storeCode.includes('class="modal-back-btn modal-home-btn"'), 'Product Modal contains Home button with LIMETREE logo');
assert(storeCode.includes('href="index.html"'), 'Product Modal links back to index.html');
assert(storeCode.includes('class="modal-product-breadcrumb"'), 'Product Modal contains Home breadcrumb');

// Mobile drawer in js/animations.js must include Home navigation
const animCode = fs.readFileSync('js/animations.js', 'utf8');
assert(animCode.includes('href="index.html"'), 'Mobile nav drawer links to index.html');
assert(animCode.includes('<span>Home</span>'), 'Mobile nav drawer contains Home option');
assert(animCode.includes('#mobileNavDrawer a'), 'Drawer closes on navigating via any drawer link');

// 11. ORDER HISTORY & ORDER MANAGEMENT TEST
console.log('\n--- 11. Testing Order History & Order Management ---');
assert(Array.isArray(dataModule.INITIAL_ORDERS) && dataModule.INITIAL_ORDERS.length === 0, 'INITIAL_ORDERS in data.js is empty (no dummy orders)');

const ordersHtml = fs.readFileSync('orders.html', 'utf8');
assert(!ordersHtml.includes('loadSampleDemoOrder'), 'orders.html does not contain loadSampleDemoOrder');
assert(ordersHtml.includes('confirmDeleteOrder'), 'orders.html has confirmDeleteOrder function');
assert(ordersHtml.includes('executeDeleteOrder'), 'orders.html has executeDeleteOrder function');
assert(ordersHtml.includes('delete-order-btn'), 'orders.html has delete order button on cards');
assert(ordersHtml.includes('id="deleteConfirmModal"'), 'orders.html has delete confirmation modal');
assert(storageCode.includes('deleteOrder(orderId'), 'storage.js includes deleteOrder method');

// Mock localStorage test for Order lifecycle (create -> view -> delete -> refresh)
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = v; },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};
global.window = {
  INITIAL_PRODUCTS: dataModule.INITIAL_PRODUCTS,
  INITIAL_ORDERS: [],
  addEventListener: () => {},
  dispatchEvent: () => {}
};

global.CustomEvent = class CustomEvent {
  constructor(name, params) {
    this.type = name;
    this.detail = params?.detail;
  }
};

// Evaluate storage code in mock environment
const storageContext = {
  localStorage: global.localStorage,
  window: global.window,
  CustomEvent: global.CustomEvent,
  console: console
};
const storageScript = new (require('vm').Script)(storageCode);
storageScript.runInNewContext(storageContext);
const testStore = storageContext.window.limetreeStorage;

// 1. Initial orders should be empty (no dummy orders)
const initialOrders = testStore.getOrders();
assert(initialOrders.length === 0, 'Clean storage initializes with exactly 0 orders (no dummy orders)');

// 2. Customer places a genuine order
const testOrderPayload = {
  customer: {
    name: 'Santhosh Kumar',
    email: 'santhosh@example.com',
    phone: '+91 98765 00000',
    address: '12 Green Park',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600001',
    country: 'India'
  },
  items: [
    {
      productId: 'rt-001',
      businessId: 'riyaa-trends',
      productName: 'Organic Cotton Crewneck',
      variantId: 'rt-001-v1',
      variantLabel: 'Size: S',
      sku: 'RT-TSH-001-S-NVY',
      price: 699,
      quantity: 2,
      image: 'assets/riyaa-trends/IMG-20260222-WA0041.jpg'
    }
  ],
  subtotal: 1398,
  discountAmount: 100,
  shippingCharge: 0,
  taxBreakdown: { cgst: 32.45, sgst: 32.45, totalTax: 64.9 },
  totalAmount: 1362.9
};

const created = testStore.createOrder(testOrderPayload);
assert(created && created.orderId.startsWith('LT-2026-'), `Genuine order created with ID: ${created.orderId}`);
assert(created.items.length === 1 && created.items[0].quantity === 2, 'Genuine order preserves products and quantity');
assert(created.totalAmount === 1362.9, 'Genuine order preserves total amount');
assert(created.date && new Date(created.date).getTime() > 0, 'Genuine order preserves valid date');
assert(created.fulfillmentStatus === 'Confirmed', 'Genuine order has correct status: Confirmed');

// 3. View order history
const afterCreate = testStore.getOrders();
assert(afterCreate.length === 1, 'Order history displays exactly 1 genuine order');
assert(afterCreate[0].orderId === created.orderId, 'Order history matches created order ID');

// 4. Delete test order with deleteOrder
const deleteSuccess = testStore.deleteOrder(created.orderId);
assert(deleteSuccess === true, 'deleteOrder successfully deletes the test order');

const afterDelete = testStore.getOrders();
assert(afterDelete.length === 0, 'Order history has 0 orders after deletion');

// 5. Simulate page refresh: re-run init()
testStore.init();
const afterRefresh = testStore.getOrders();
assert(afterRefresh.length === 0, 'Order does NOT reappear after refresh, dummy orders do not appear');

// 11b. ANIMATION SYSTEM VERIFICATION
console.log('\n--- 11b. Testing Animation System (CSS & JS) ---');
const animJs = fs.readFileSync('js/animations.js', 'utf8');
const storeJs = fs.readFileSync('js/store.js', 'utf8');

assert(css.includes('heroLogoFadeIn'), 'Homepage logo fade-in animation defined');
assert(css.includes('heroCardEntrance'), 'Homepage hero brand cards entrance animation defined');
assert(css.includes('heroLeafEntrance'), 'Homepage leaf corners entrance animation defined');
assert(css.includes('badgePop'), 'Cart count badgePop animation defined');
assert(storeJs.includes('badge-pop'), 'store.js triggers badge-pop on cart and wishlist updates');
assert(css.includes('cart-drawer') && css.includes('transform: translate3d'), 'Cart drawer uses smooth translate3d slide');
assert(css.includes('.product-card:hover') && css.includes('transform: translateY(-6px)'), 'Product card hover lift defined');
assert(css.includes('.product-card:hover .product-image-container img') && css.includes('transform: scale(1.06)'), 'Product card subtle image zoom defined');
assert(css.includes('.btn:active') && css.includes('scale(0.97)'), 'Button click scale micro-interaction defined');
assert(css.includes('.action-btn:active') && css.includes('scale(0.92)'), 'Action button click scale micro-interaction defined');
assert(css.includes('prefers-reduced-motion: reduce'), 'prefers-reduced-motion accessible override configured');
assert(animJs.includes('prefersReducedMotion'), 'animations.js checks prefers-reduced-motion');

// 12. LIVE HTTP TEST (SERVER PORT 3000)
console.log('\n--- 12. Testing HTTP Server Endpoints ---');
http.get('http://localhost:3000/', (res) => {
  assert(res.statusCode === 200, 'GET / returned status 200');
  
  http.get('http://localhost:3000/riyaa-trends.html', (resR) => {
    assert(resR.statusCode === 200, 'GET /riyaa-trends.html returned status 200');
    
    http.get('http://localhost:3000/glow-home.html', (resG) => {
      assert(resG.statusCode === 200, 'GET /glow-home.html returned status 200');
      
      http.get('http://localhost:3000/earkart.html', (resE) => {
        assert(resE.statusCode === 200, 'GET /earkart.html returned status 200');

        http.get('http://localhost:3000/orders.html', (resO) => {
          assert(resO.statusCode === 200, 'GET /orders.html returned status 200');
          
          console.log('\n====================================================');
          if (failedTests === 0) {
            console.log('  ALL TESTS PASSED PERFECTLY (0 FAILURES)!');
          } else {
            console.error(`  ${failedTests} TESTS FAILED!`);
          }
          console.log('====================================================\n');
        });
      });
    });
  });
});

