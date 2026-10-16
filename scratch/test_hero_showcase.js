const fs = require('fs');

console.log('--- TESTING 3-PRODUCT HERO SHOWCASE ---');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

// Check elements
console.log('1. Showcase container:', html.includes('id=\"heroProductsShowcase\"'));
console.log('2. House tabs (3 brands):', html.includes('Riyaa Trends') && html.includes('Glow Home') && html.includes('Earkart'));
console.log('3. Three slides:', html.includes('Kids Signature Graphic Tees Trio') && html.includes('Artisan Golden Amber Glass Jar Candle') && html.includes('Handcrafted White Daisy Floral Studs'));
console.log('4. Real product images:');
console.log('   - Riyaa Trends:', html.includes('assets/riyaa-trends/IMG-20260222-WA0060.jpg'), 'file exists:', fs.existsSync('assets/riyaa-trends/IMG-20260222-WA0060.jpg'));
console.log('   - Glow Home:', html.includes('assets/glow-home/IMG_20260816_171236.jpg'), 'file exists:', fs.existsSync('assets/glow-home/IMG_20260816_171236.jpg'));
console.log('   - Earkart:', html.includes('assets/earkart/earkart-daisy-pair-original.jpg'), 'file exists:', fs.existsSync('assets/earkart/earkart-daisy-pair-original.jpg'));
console.log('5. Interactive arrows & dots:', html.includes('hero-nav-arrow') && html.includes('hero-slide-dots'));
console.log('6. Showcase script controller:', html.includes('updateHeroShowcase') && html.includes('HERO_CYCLE_DURATION'));
console.log('7. CSS classes present:', css.includes('.hero-stage-container') && css.includes('.hero-product-slide.active') && css.includes('.hero-product-slide.next-peek'));
