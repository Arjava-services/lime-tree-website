/**
 * Test & Validation Script for LIMETREE Parallax Implementation
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n--- 1. Testing style.css parallax rules ---');
const cssContent = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf8');

assert(cssContent.includes('.product-image-container img'), 'CSS defines .product-image-container img');
assert(cssContent.includes('--parallax-y'), 'CSS uses --parallax-y variable for scroll parallax');
assert(cssContent.includes('--hover-x'), 'CSS uses --hover-x variable for desktop hover parallax');
assert(cssContent.includes('--hover-y'), 'CSS uses --hover-y variable for desktop hover parallax');
assert(cssContent.includes('.product-card:hover .product-image-container img'), 'CSS defines hover transform on product image');
assert(cssContent.includes('.brand-parallax-deco'), 'CSS defines .brand-parallax-deco for subtle multi-speed background elements');
assert(cssContent.includes('.modal-gallery-wrap'), 'CSS defines .modal-gallery-wrap for product modal parallax');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'CSS includes prefers-reduced-motion media query');
assert(cssContent.includes('transform: none !important'), 'CSS completely resets transforms under reduced motion');

console.log('\n--- 2. Testing js/animations.js Parallax Engine ---');
const animContent = fs.readFileSync(path.join(rootDir, 'js/animations.js'), 'utf8');

assert(animContent.includes('initScrollParallax'), 'animations.js implements initScrollParallax');
assert(animContent.includes('refreshParallax'), 'animations.js implements refreshParallax');
assert(animContent.includes('bindProductCardHover'), 'animations.js implements bindProductCardHover for desktop hover parallax');
assert(animContent.includes('bindHomepageBrandCardHover'), 'animations.js implements bindHomepageBrandCardHover');
assert(animContent.includes('bindModalParallax'), 'animations.js implements bindModalParallax for product detail page');
assert(animContent.includes('updateParallax'), 'animations.js implements updateParallax');
assert(animContent.includes('visibleElements'), 'animations.js optimizes with IntersectionObserver visibleElements set');
assert(animContent.includes('limetree:products-updated'), 'animations.js listens for limetree:products-updated to re-index parallax cards');
assert(animContent.includes('prefersReducedMotion'), 'animations.js respects prefersReducedMotion setting');

console.log('\n--- 3. Testing js/store.js Product Cards & Modal ---');
const storeContent = fs.readFileSync(path.join(rootDir, 'js/store.js'), 'utf8');

assert(storeContent.includes('modal-gallery-wrap'), 'store.js wraps modalMainImg in modal-gallery-wrap');
assert(storeContent.includes('bindModalParallax'), 'store.js calls bindModalParallax when opening product detail modal');
assert(storeContent.includes('limetree:products-updated'), 'store.js emits limetree:products-updated when catalog renders/updates');

console.log('\n--- 4. Testing HTML Pages Markup ---');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
assert(indexHtml.includes('nature-leaf-tl') && indexHtml.includes('data-parallax-speed'), 'index.html has multi-speed parallax on corner leaves');
assert(indexHtml.includes('card-arch-portal'), 'index.html preserves 3 brand cards');

const riyaaHtml = fs.readFileSync(path.join(rootDir, 'riyaa-trends.html'), 'utf8');
assert(riyaaHtml.includes('brand-parallax-deco'), 'riyaa-trends.html includes brand-parallax-deco');
assert(riyaaHtml.includes('productCatalogGrid'), 'riyaa-trends.html includes productCatalogGrid');

const glowHtml = fs.readFileSync(path.join(rootDir, 'glow-home.html'), 'utf8');
assert(glowHtml.includes('brand-parallax-deco'), 'glow-home.html includes brand-parallax-deco');
assert(glowHtml.includes('glowWorkshopVideo'), 'glow-home.html preserves video showcase');

const earkartHtml = fs.readFileSync(path.join(rootDir, 'earkart.html'), 'utf8');
assert(earkartHtml.includes('brand-parallax-deco'), 'earkart.html includes brand-parallax-deco');
assert(earkartHtml.includes('earkartVideo'), 'earkart.html preserves video showcase');

const ordersHtml = fs.readFileSync(path.join(rootDir, 'orders.html'), 'utf8');
assert(ordersHtml.includes('brand-parallax-deco'), 'orders.html includes brand-parallax-deco');

console.log('\n--- 5. Testing HTTP Server Endpoint Responses ---');
const pages = [
  '/',
  '/index.html',
  '/riyaa-trends.html',
  '/glow-home.html',
  '/earkart.html',
  '/orders.html',
  '/admin.html',
  '/style.css',
  '/js/animations.js',
  '/js/store.js',
  '/js/data.js'
];

let pendingRequests = pages.length;

pages.forEach(urlPath => {
  http.get(`http://localhost:3000${urlPath}`, (res) => {
    assert(res.statusCode === 200, `HTTP GET ${urlPath} returned 200 OK`);
    res.resume();
    pendingRequests--;
    if (pendingRequests === 0) {
      console.log(`\n========================================`);
      console.log(`SUMMARY: ${passedTests} / ${totalTests} tests PASSED!`);
      console.log(`========================================\n`);
      process.exit(totalTests === passedTests ? 0 : 1);
    }
  }).on('error', (err) => {
    assert(false, `HTTP GET ${urlPath} error: ${err.message}`);
    pendingRequests--;
    if (pendingRequests === 0) {
      process.exit(1);
    }
  });
});
