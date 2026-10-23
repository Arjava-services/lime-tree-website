const fs = require('fs');
const assert = require('assert');

console.log('--- Verifying Unified Luxury Category Cards Model ---');

// 1. Check generated assets exist
assert(fs.existsSync('assets/luxury-category-clothing.jpg'), 'Clothing image exists');
assert(fs.existsSync('assets/luxury-category-candle.jpg'), 'Candle image exists');
assert(fs.existsSync('assets/luxury-category-jewellery.jpg'), 'Jewellery image exists');
assert(fs.existsSync('assets/homepage-botanical-bg.jpg'), 'Homepage botanical background exists');
console.log('✓ High quality product images and background exist in assets');

// 2. Check index.html markup
const indexHtml = fs.readFileSync('index.html', 'utf8');

// 3 category cards
assert(indexHtml.includes('id="cardRiyaaTrends"'), 'Clothing card ID preserved');
assert(indexHtml.includes('id="cardGlowHome"'), 'Scented candles card ID preserved');
assert(indexHtml.includes('id="cardEarkart"'), 'Jewellery card ID preserved');
console.log('✓ Preserved existing IDs');

// Links preserved
assert(indexHtml.includes('href="riyaa-trends.html"'), 'Riyaa trends link preserved');
assert(indexHtml.includes('href="glow-home.html"'), 'Glow home link preserved');
assert(indexHtml.includes('href="earkart.html"'), 'Earkart link preserved');
console.log('✓ Preserved navigation links');

// Editorial and Brand headings
assert(indexHtml.includes('Clothing</h2>'), 'Clothing editorial heading present');
assert(indexHtml.includes('Jewellery</h2>'), 'Jewellery editorial heading present');
assert(indexHtml.includes('Riyaa Trends</h3>'), 'Riyaa Trends brand present');
assert(indexHtml.includes('Glow Home</h2>'), 'Glow Home brand present');
assert(indexHtml.includes('Earkart</h3>'), 'Earkart brand present');
assert(indexHtml.includes('Timeless styles for every you'), 'Timeless styles description present');
assert(indexHtml.includes('Calm and comfort'), 'Calm and comfort description present');
assert(indexHtml.includes('Elegant designs for you'), 'Elegant designs description present');
assert(indexHtml.includes('Calm<br>Scents<br>Better<br>Days'), 'Italic quote on candles card present');
console.log('✓ Headings, brand names, and descriptions match reference mockup model');

// Buttons and overlays
assert(indexHtml.includes('Shop Now'), 'Shop Now buttons present');
assert(indexHtml.includes('luxury-bottom-overlay-box'), 'Bottom dark olive overlay box present');
assert(indexHtml.includes('luxury-circle-arrow-btn'), 'Circular arrow buttons present');
assert(indexHtml.includes('card-arch-portal'), 'card-arch-portal preserved for compatibility');
console.log('✓ Shop Now buttons, circular arrow buttons, and overlay modules verified');

// 3. Check CSS rules in style.css
const css = fs.readFileSync('style.css', 'utf8');

assert(css.includes('.nature-brand-grid'), 'Grid container defined');
assert(css.includes('.luxury-brand-card'), 'Luxury card styling defined');
assert(css.includes('.card-clothing .luxury-portal-frame'), 'Clothing portal styling defined');
assert(css.includes('.card-candles .luxury-portal-frame'), 'Candles portal styling defined');
assert(css.includes('.card-jewellery .luxury-portal-frame'), 'Jewellery portal styling defined');
assert(css.includes('.luxury-bottom-overlay-box'), 'Bottom overlay box styling defined');
assert(css.includes('.luxury-overlay-btn-pill'), 'Pill button styling defined');
assert(css.includes('.luxury-circle-arrow-btn'), 'Circular arrow button styling defined');
assert(css.includes('homepage-botanical-bg.jpg'), 'Botanical background image referenced in CSS');
console.log('✓ CSS classes, typography, and styling verified');

console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
