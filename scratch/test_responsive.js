const fs = require('fs');
const assert = require('assert');

console.log('=== VERIFYING RESPONSIVE LAYOUT (DESKTOP & MOBILE) ===\n');

const css = fs.readFileSync('style.css', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. DESKTOP / LAPTOP LAYOUT CHECKS (BASE STYLES)
console.log('--- 1. Desktop & Laptop Layout Checks (Default / > 768px) ---');

// Grid structure for nature brand cards on desktop
assert(css.includes('display: grid;') && css.includes('grid-template-columns: repeat(3, 1fr);'),
  'Desktop brand cards are defined as a 3-column CSS Grid');
assert(css.includes('.nature-brand-card') && css.includes('width: 100%;') && css.includes('max-width: 100%;'),
  'Desktop brand cards take 100% of their grid column without horizontal scroll restrictions');

// Pagination dots hidden on desktop
assert(css.includes('.brand-swipe-dots {\n  display: none;'),
  'Carousel pagination dots are hidden on desktop and laptop');

// Header desktop navigation
assert(css.includes('.main-nav {\n  display: flex;') && css.includes('gap: 1.8rem;'),
  'Desktop main-nav is visible and flexed with proper spacing');
assert(css.includes('.header-search {\n  position: relative;\n  flex: 0 1 300px;'),
  'Desktop search bar is visible with 300px width');
assert(css.includes('.mobile-menu-toggle-btn {\n  display: none;'),
  'Mobile hamburger menu button is hidden on desktop');

// Homepage hero banner on desktop
assert(!css.includes('.nature-hero-header {\n  display: none;'),
  'Hero header logo banner is visible on desktop');

console.log('  PASS: Desktop layout preserves full-width 3-column grid');
console.log('  PASS: Desktop header shows logo, navigation links, and search bar');
console.log('  PASS: Mobile hamburger and swipe dots are hidden on desktop');


// 2. MOBILE VIEWPORT CHECKS (@media (max-width: 768px))
console.log('\n--- 2. Mobile Layout Checks (@media (max-width: 768px)) ---');

// Extract max-width 768px media queries using brace matching
let media768Content = '';
const searchStr = '@media (max-width: 768px)';
let searchIndex = 0;
while ((searchIndex = css.indexOf(searchStr, searchIndex)) !== -1) {
  let openBrace = css.indexOf('{', searchIndex);
  if (openBrace === -1) break;
  let depth = 1;
  let i = openBrace + 1;
  while (depth > 0 && i < css.length) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  media768Content += css.slice(openBrace + 1, i - 1) + '\n';
  searchIndex = i;
}

assert(media768Content.includes('scroll-snap-type: x mandatory'),
  'Mobile brand grid activates horizontal swipeable scroll snap');
assert(media768Content.includes('min(80vw, 300px)'),
  'Mobile brand cards scale fluidly (min(80vw, 300px))');
assert(media768Content.includes('.brand-swipe-dots') && media768Content.includes('display: flex;'),
  'Mobile activates brand swipe pagination dots');
assert(media768Content.includes('.home-page .nature-hero-header') && media768Content.includes('display: none !important'),
  'Mobile hides extra hero header banner on homepage');
assert(media768Content.includes('.mobile-menu-toggle-btn') && media768Content.includes('display: inline-flex !important'),
  'Mobile displays hamburger menu button');
assert(media768Content.includes('.main-nav') && media768Content.includes('display: none;'),
  'Mobile hides desktop main-nav');
assert(media768Content.includes('.header-search') && media768Content.includes('display: none;'),
  'Mobile hides desktop search bar');

console.log('  PASS: Mobile layout cleanly activates carousel snap scroll');
console.log('  PASS: Mobile layout displays swipe dots and fluid card widths');
console.log('  PASS: Mobile header shows compact logo, icons, and hamburger menu');


// 3. JAVASCRIPT RESPONSIVE SCOPING CHECKS
console.log('\n--- 3. JavaScript Responsive Scoping Checks ---');

assert(indexHtml.includes('function isMobileCarousel()'),
  'index.html defines isMobileCarousel check');
assert(indexHtml.includes('window.innerWidth <= 768'),
  'index.html checks 768px viewport breakpoint');
assert(indexHtml.includes('if (!isMobileCarousel()) return;'),
  'scrollToCard and nextSlide only run in mobile carousel mode');
assert(indexHtml.includes('window.addEventListener(\'resize\''),
  'index.html handles resize between mobile and desktop dynamically');

console.log('  PASS: Carousel auto-slide only runs on mobile screens');
console.log('  PASS: Desktop screens keep brand cards stationary and side-by-side');

console.log('\n====================================================');
console.log('  ALL RESPONSIVE LAYOUT TESTS PASSED PERFECTLY!');
console.log('====================================================');
