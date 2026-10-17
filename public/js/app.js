// LimeTree Main Interactive Application Logic
// Features: Router, Filtering & Sorting, Product Modals, Cart Drawer, Multi-Step Checkout, Auth, Reviews, Contact, Search

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

let currentProducts = [...INITIAL_PRODUCTS];
let selectedSize = null;
let selectedColor = null;
let activeModalProduct = null;
let currentModalQty = 1;

function initApp() {
  setupNavigation();
  setupSearch();
  setupFilters();
  setupCartDrawer();
  setupProductModal();
  setupCheckoutModal();
  setupAuthModal();
  setupContactForm();
  setupNewsletter();
  setupKeyboardShortcuts();
  initParallaxController();
  
  // Listen to state changes
  window.store.subscribe((event, data) => {
    handleStateChange(event, data);
  });

  // Initial render
  updateNavCounters();
  handleRoute();
}

/* ==========================================================================
   Navigation & Routing
   ========================================================================== */

function setupNavigation() {
  window.addEventListener('hashchange', handleRoute);
  
  // Mobile Hamburger menu toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      mobileBackdrop.classList.add('open');
    });
  }

  const closeMobile = () => {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
  };

  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

  // Close mobile drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

function handleRoute() {
  const hash = window.location.hash || '#home';
  const cleanHash = hash.split('?')[0];

  // Highlight active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === cleanHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Page sections visibility
  const homeSection = document.getElementById('homePage');
  const catalogSection = document.getElementById('catalogPage');
  const aboutSection = document.getElementById('aboutPage');
  const contactSection = document.getElementById('contactPage');
  const accountSection = document.getElementById('accountPage');

  // Hide all main pages
  [homeSection, catalogSection, aboutSection, contactSection, accountSection].forEach(p => {
    if (p) p.style.display = 'none';
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (cleanHash === '#home') {
    if (homeSection) homeSection.style.display = 'block';
    renderFeaturedProducts();
  } else if (cleanHash === '#clothing' || cleanHash === '#candles' || cleanHash === '#studs' || cleanHash === '#catalog') {
    if (catalogSection) catalogSection.style.display = 'block';
    setupCategoryView(cleanHash.replace('#', ''));
  } else if (cleanHash === '#about') {
    if (aboutSection) aboutSection.style.display = 'block';
  } else if (cleanHash === '#contact') {
    if (contactSection) contactSection.style.display = 'block';
  } else if (cleanHash === '#account') {
    if (accountSection) accountSection.style.display = 'block';
    renderAccountPage();
  } else {
    // Default fallback to home
    if (homeSection) homeSection.style.display = 'block';
    renderFeaturedProducts();
  }

  // Refresh parallax elements for newly visible page
  setTimeout(refreshParallax, 60);
}

function setupCategoryView(catKey) {
  const catTitleEl = document.getElementById('catalogTitle');
  const catDescEl = document.getElementById('catalogSubtitle');
  const catBannerWrap = document.getElementById('catalogBannerWrap');
  const catBannerImg = document.getElementById('catalogBannerImg');
  const catSubNav = document.getElementById('catalogSubcategories');

  let brandData = STORE_BRANDS.find(b => b.id === catKey);

  if (brandData) {
    if (catTitleEl) catTitleEl.textContent = `${brandData.name} — ${brandData.category}`;
    if (catDescEl) catDescEl.textContent = brandData.description;
    if (catBannerImg) catBannerImg.src = brandData.banner;
    if (catBannerWrap) catBannerWrap.style.display = 'block';

    // Render subcategory pills
    if (catSubNav) {
      catSubNav.innerHTML = brandData.subcategories.map(sub => `
        <button class="sub-pill ${sub === 'All' ? 'active' : ''}" data-subcategory="${sub}">
          ${sub}
        </button>
      `).join('');

      catSubNav.querySelectorAll('.sub-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
          catSubNav.querySelectorAll('.sub-pill').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          filterProductsBySubcategory(e.target.dataset.subcategory, catKey);
        });
      });
    }

    // Set active category tab
    document.querySelectorAll('.cat-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === catKey);
    });

    filterProductsByCategory(brandData.category, catKey);
  } else {
    // "All Marketplace Items"
    if (catTitleEl) catTitleEl.textContent = "LimeTree Unified Marketplace";
    if (catDescEl) catDescEl.textContent = "Browse clothing by Riyaa Trends, scented candles by Glow Home, and fine ear studs by Earkart in one cart.";
    if (catBannerWrap) catBannerWrap.style.display = 'none';
    if (catSubNav) catSubNav.innerHTML = '';
    renderProductGrid(INITIAL_PRODUCTS);
  }
}

/* ==========================================================================
   Product Rendering & Filtering
   ========================================================================== */

function renderFeaturedProducts() {
  const container = document.getElementById('featuredProductsGrid');
  if (!container) return;

  const featured = INITIAL_PRODUCTS.filter(p => p.featured).slice(0, 8);
  container.innerHTML = featured.map(createProductCardHTML).join('');
  attachProductCardEvents(container);
  refreshParallax();
}

function renderProductGrid(products) {
  const container = document.getElementById('catalogProductsGrid');
  const countEl = document.getElementById('catalogCount');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `Showing ${products.length} product${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.5rem;">No products found</h3>
        <p style="color: var(--slate-500); margin-bottom: 1.5rem;">Try adjusting your search terms or filters.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(createProductCardHTML).join('');
  attachProductCardEvents(container);
  refreshParallax();
}

function createProductCardHTML(p) {
  const isWishlisted = window.store.isInWishlist(p.id);
  const discountPercent = p.origPrice ? Math.round(((p.origPrice - p.price) / p.origPrice) * 100) : 0;
  
  // Variant hints
  let variantHint = '';
  if (p.sizes) {
    variantHint = `<span class="card-size-tag">${p.sizes.slice(0, 4).join(', ')}${p.sizes.length > 4 ? '+' : ''}</span>`;
  } else if (p.fragranceProfile) {
    variantHint = `<span class="card-size-tag">${p.fragranceProfile.family}</span>`;
  } else if (p.material) {
    variantHint = `<span class="card-size-tag">${p.material.split(' ')[0]}</span>`;
  }

  // Color dots
  let colorDots = '';
  if (p.colors) {
    colorDots = p.colors.slice(0, 3).map(c => `
      <span class="card-color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
    `).join('');
  }

  return `
    <div class="product-card" data-id="${p.id}" data-parallax-tilt="true">
      <div class="product-card-media" onclick="openProductModal('${p.id}')">
        <img class="parallax-product-img" src="${p.image}" alt="${p.name}" loading="lazy" data-parallax-type="media" data-parallax-speed="0.12" />
        ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
        
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); toggleWishlist('${p.id}', this)" 
                title="Save to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div class="quick-view-overlay">
          <span class="quick-view-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
          </span>
        </div>
      </div>

      <div class="product-card-body">
        <div class="product-card-meta">
          <span class="product-brand-tag">${p.brand}</span>
          <div class="product-rating">
            <svg class="star-icon" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>${p.rating}</span>
            <span style="color: var(--slate-400); font-weight: normal;">(${p.reviewCount})</span>
          </div>
        </div>

        <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>

        <div class="card-variants">
          ${colorDots}
          ${variantHint}
        </div>

        <div class="product-footer">
          <div class="price-box">
            <span class="current-price">$${p.price.toFixed(2)}</span>
            ${p.origPrice ? `<span class="orig-price">$${p.origPrice.toFixed(2)}</span>` : ''}
          </div>

          <button class="btn-add-cart" 
                  onclick="quickAddToCart('${p.id}', event)" 
                  title="Add to Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachProductCardEvents(container) {
  // Any extra delegations can be handled here
}

/* ==========================================================================
   Filter & Search Handlers
   ========================================================================== */

function setupFilters() {
  // Category tabs on catalog page
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.dataset.category;
      if (cat === 'all') {
        window.location.hash = '#catalog';
      } else {
        window.location.hash = `#${cat}`;
      }
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      applySorting(e.target.value);
    });
  }

  // Price slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceValueDisplay');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      if (priceDisplay) priceDisplay.textContent = `$${e.target.value}`;
      filterByPrice(parseFloat(e.target.value));
    });
  }
}

function setupSearch() {
  const searchInputs = [
    document.getElementById('navSearchInput'),
    document.getElementById('mobileSearchInput'),
    document.getElementById('heroSearchInput')
  ];

  searchInputs.forEach(input => {
    if (!input) return;
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      performSearch(q);
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.location.hash = '#catalog';
      }
    });
  });
}

function performSearch(query) {
  if (!query) {
    renderProductGrid(currentProducts);
    return;
  }

  const filtered = currentProducts.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.subcategory.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  renderProductGrid(filtered);
}

function filterProductsByCategory(category, catKey) {
  const key = (catKey || category || 'all').toLowerCase();
  
  if (key === 'all' || !key) {
    currentProducts = [...INITIAL_PRODUCTS];
  } else if (key === 'clothing' || key.includes('cloth') || key.includes('riyaa') || key.includes('kid')) {
    currentProducts = INITIAL_PRODUCTS.filter(p => 
      (p.brandSlug && (p.brandSlug === 'clothing' || p.brandSlug === 'riyaa')) ||
      (p.category && p.category.toLowerCase().includes('cloth')) ||
      (p.brand && p.brand.toLowerCase().includes('riyaa'))
    );
  } else if (key === 'candles' || key.includes('candle') || key.includes('glow')) {
    currentProducts = INITIAL_PRODUCTS.filter(p => 
      (p.brandSlug && (p.brandSlug === 'candles' || p.brandSlug === 'glow-home')) ||
      (p.category && p.category.toLowerCase().includes('candle')) ||
      (p.brand && p.brand.toLowerCase().includes('glow'))
    );
  } else if (key === 'studs' || key.includes('stud') || key.includes('earkart') || key.includes('jewel')) {
    currentProducts = INITIAL_PRODUCTS.filter(p => 
      (p.brandSlug && (p.brandSlug === 'studs' || p.brandSlug === 'earkart')) ||
      (p.category && (p.category.toLowerCase().includes('stud') || p.category.toLowerCase().includes('jewel'))) ||
      (p.brand && p.brand.toLowerCase().includes('earkart'))
    );
  } else {
    currentProducts = INITIAL_PRODUCTS.filter(p => 
      (p.category && p.category.toLowerCase() === key) ||
      (p.brandSlug && p.brandSlug.toLowerCase() === key)
    );
  }
  
  renderProductGrid(currentProducts);
}

function filterProductsBySubcategory(subcategory, catKey) {
  if (!subcategory || subcategory === 'All') {
    filterProductsByCategory('', catKey);
    return;
  }
  
  const key = (catKey || '').toLowerCase();
  const sub = subcategory.toLowerCase();
  
  const filtered = INITIAL_PRODUCTS.filter(p => {
    const pSlug = (p.brandSlug || '').toLowerCase();
    const pCat = (p.category || '').toLowerCase();
    const pBrand = (p.brand || '').toLowerCase();
    const pSub = (p.subcategory || '').toLowerCase();
    
    let matchesCat = true;
    if (key === 'clothing' || key.includes('cloth') || key.includes('kid')) {
      matchesCat = pSlug === 'clothing' || pCat.includes('cloth') || pBrand.includes('riyaa');
    } else if (key === 'candles' || key.includes('candle') || key.includes('glow')) {
      matchesCat = pSlug === 'candles' || pSlug === 'glow-home' || pCat.includes('candle') || pBrand.includes('glow');
    } else if (key === 'studs' || key.includes('stud') || key.includes('jewel')) {
      matchesCat = pSlug === 'studs' || pSlug === 'earkart' || pCat.includes('stud') || pBrand.includes('earkart');
    }
    
    return matchesCat && (pSub === sub || pSub.includes(sub) || sub.includes(pSub));
  });
  
  renderProductGrid(filtered);
}

function filterByPrice(maxPrice) {
  const filtered = currentProducts.filter(p => p.price <= maxPrice);
  renderProductGrid(filtered);
}

function applySorting(sortVal) {
  let sorted = [...currentProducts];
  if (sortVal === 'price-low') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price-high') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sortVal === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  currentProducts = sorted;
  renderProductGrid(currentProducts);
}

window.resetFilters = function() {
  currentProducts = [...INITIAL_PRODUCTS];
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceValueDisplay');
  if (priceSlider) priceSlider.value = 100;
  if (priceDisplay) priceDisplay.textContent = '$100';
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';
  renderProductGrid(currentProducts);
};

/* ==========================================================================
   Product Modal View & Operations
   ========================================================================== */

function setupProductModal() {
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const qtyMinus = document.getElementById('modalQtyMinus');
  const qtyPlus = document.getElementById('modalQtyPlus');
  const addBtn = document.getElementById('modalAddToCartBtn');
  const wishBtn = document.getElementById('modalWishlistBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeProductModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (currentModalQty > 1) {
        currentModalQty--;
        document.getElementById('modalQtyVal').textContent = currentModalQty;
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      currentModalQty++;
      document.getElementById('modalQtyVal').textContent = currentModalQty;
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!activeModalProduct) return;
      window.store.addToCart(activeModalProduct, {
        size: selectedSize,
        color: selectedColor,
        quantity: currentModalQty
      });
      showToast(`Added ${currentModalQty}x ${activeModalProduct.name} to cart!`);
      closeProductModal();
      openCartDrawer();
    });
  }

  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      if (!activeModalProduct) return;
      const added = window.store.toggleWishlist(activeModalProduct.id);
      wishBtn.classList.toggle('active', added);
      showToast(added ? `Saved to your wishlist` : `Removed from wishlist`);
    });
  }
}

window.openProductModal = function(productId) {
  const product = INITIAL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;
  currentModalQty = 1;
  selectedSize = product.sizes ? product.sizes[0] : null;
  selectedColor = product.colors ? product.colors[0].name : null;

  const modal = document.getElementById('productModal');
  const mainImg = document.getElementById('modalMainImg');
  const thumbsContainer = document.getElementById('modalThumbs');
  const brandBadge = document.getElementById('modalBrandBadge');
  const titleEl = document.getElementById('modalTitle');
  const priceEl = document.getElementById('modalPrice');
  const origPriceEl = document.getElementById('modalOrigPrice');
  const discountEl = document.getElementById('modalDiscount');
  const ratingEl = document.getElementById('modalRating');
  const descEl = document.getElementById('modalDesc');
  const sizeOptionGroup = document.getElementById('modalSizeGroup');
  const sizeButtonsWrap = document.getElementById('modalSizeButtons');
  const colorOptionGroup = document.getElementById('modalColorGroup');
  const colorSwatchesWrap = document.getElementById('modalColorSwatches');
  const specsContainer = document.getElementById('modalSpecsCard');
  const wishBtn = document.getElementById('modalWishlistBtn');
  const qtyVal = document.getElementById('modalQtyVal');

  // Populate data
  if (mainImg) mainImg.src = product.image;
  if (brandBadge) {
    brandBadge.textContent = product.brand;
    brandBadge.className = `modal-brand-badge badge-${product.brandSlug}`;
  }
  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
  if (origPriceEl) {
    origPriceEl.textContent = product.origPrice ? `$${product.origPrice.toFixed(2)}` : '';
    origPriceEl.style.display = product.origPrice ? 'inline' : 'none';
  }
  if (discountEl) {
    if (product.origPrice) {
      const off = Math.round(((product.origPrice - product.price) / product.origPrice) * 100);
      discountEl.textContent = `${off}% OFF`;
      discountEl.style.display = 'inline-block';
    } else {
      discountEl.style.display = 'none';
    }
  }
  if (ratingEl) ratingEl.innerHTML = `★ ${product.rating} <span style="color: var(--slate-400)">(${product.reviewCount} customer reviews)</span>`;
  if (descEl) descEl.textContent = product.description;
  if (qtyVal) qtyVal.textContent = '1';

  // Wishlist state
  if (wishBtn) {
    wishBtn.classList.toggle('active', window.store.isInWishlist(product.id));
  }

  // Gallery thumbs
  if (thumbsContainer) {
    thumbsContainer.innerHTML = (product.images || [product.image]).map((imgSrc, i) => `
      <button class="thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchModalImage('${imgSrc}', this)">
        <img src="${imgSrc}" alt="${product.name}" />
      </button>
    `).join('');
  }

  // Sizes selector (Clothing)
  if (product.sizes && product.sizes.length) {
    if (sizeOptionGroup) sizeOptionGroup.style.display = 'flex';
    if (sizeButtonsWrap) {
      sizeButtonsWrap.innerHTML = product.sizes.map((s, i) => `
        <button class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize('${s}', this)">${s}</button>
      `).join('');
    }
  } else {
    if (sizeOptionGroup) sizeOptionGroup.style.display = 'none';
  }

  // Colors selector
  if (product.colors && product.colors.length) {
    if (colorOptionGroup) colorOptionGroup.style.display = 'flex';
    if (colorSwatchesWrap) {
      colorSwatchesWrap.innerHTML = product.colors.map((c, i) => `
        <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}" 
                onclick="selectColor('${c.name}', this)">
        </button>
      `).join('');
    }
  } else {
    if (colorOptionGroup) colorOptionGroup.style.display = 'none';
  }

  // Specifications list
  if (specsContainer && product.details) {
    specsContainer.innerHTML = Object.entries(product.details).map(([key, val]) => `
      <div class="spec-line">
        <strong>${key}:</strong>
        <span>${val}</span>
      </div>
    `).join('');
  }

  // Open modal
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeProductModal = function() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.switchModalImage = function(src, btn) {
  const mainImg = document.getElementById('modalMainImg');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

window.selectSize = function(size, btn) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const label = document.getElementById('selectedSizeLabel');
  if (label) label.textContent = size;
};

window.selectColor = function(colorName, btn) {
  selectedColor = colorName;
  document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const label = document.getElementById('selectedColorLabel');
  if (label) label.textContent = colorName;
};

/* ==========================================================================
   Shopping Cart Drawer
   ========================================================================== */

function setupCartDrawer() {
  const openBtns = [document.getElementById('navCartBtn'), document.getElementById('mobileCartBtn')];
  const closeBtn = document.getElementById('cartCloseBtn');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  const drawer = document.getElementById('cartDrawer');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  const applyCouponBtn = document.getElementById('applyCouponBtn');

  openBtns.forEach(b => {
    if (b) b.addEventListener('click', openCartDrawer);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const input = document.getElementById('cartCouponInput');
      if (!input) return;
      const res = window.store.applyCoupon(input.value);
      if (res.success) {
        showToast(`Promo code applied: ${res.coupon.label}`);
        input.value = '';
      } else {
        showToast(res.message, 'error');
      }
    });
  }
}

window.openCartDrawer = function() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    renderCartDrawerItems();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.quickAddToCart = function(productId, e) {
  if (e) e.stopPropagation();
  const product = INITIAL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  window.store.addToCart(product, {
    size: product.sizes ? product.sizes[0] : null,
    color: product.colors ? product.colors[0].name : null,
    quantity: 1
  });

  showToast(`Added ${product.name} to cart!`);
  openCartDrawer();
};

function renderCartDrawerItems() {
  const body = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartFooter');
  const freeShipBar = document.getElementById('freeShippingBar');
  const freeShipMsg = document.getElementById('freeShippingMsg');
  const freeShipFill = document.getElementById('freeShippingFill');

  if (!body) return;

  const totals = window.store.getCartTotals();
  const cart = window.store.cart;

  // Free shipping bar calculation
  if (freeShipBar) {
    if (totals.subtotal >= 50 || (window.store.activeCoupon && window.store.activeCoupon.freeShipping)) {
      if (freeShipMsg) freeShipMsg.innerHTML = "🎉 <strong>You unlocked FREE Express Shipping!</strong>";
      if (freeShipFill) freeShipFill.style.width = "100%";
    } else {
      const remaining = (50 - totals.subtotal).toFixed(2);
      const pct = Math.min(100, Math.round((totals.subtotal / 50) * 100));
      if (freeShipMsg) freeShipMsg.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>FREE Shipping</strong>`;
      if (freeShipFill) freeShipFill.style.width = `${pct}%`;
    }
  }

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon-wrap">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h4 style="font-family: var(--font-heading); font-size: 1.2rem;">Your cart is empty</h4>
        <p style="color: var(--slate-500); font-size: 0.875rem;">Discover our clothing, candles, and ear studs.</p>
        <button class="btn-primary" onclick="closeCartDrawer(); window.location.hash='#catalog';">Start Shopping</button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'flex';

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <span class="cart-item-brand">${item.brand}</span>
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-variant">${item.size ? `Size: ${item.size}` : ''} ${item.color ? `• ${item.color}` : ''}</span>
        
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          
          <div class="cart-item-stepper">
            <button class="cart-step-btn" onclick="window.store.updateCartQuantity('${item.cartKey}', ${item.quantity - 1})">-</button>
            <span class="cart-step-val">${item.quantity}</span>
            <button class="cart-step-btn" onclick="window.store.updateCartQuantity('${item.cartKey}', ${item.quantity + 1})">+</button>
          </div>

          <button class="cart-remove-btn" onclick="window.store.removeFromCart('${item.cartKey}')" title="Remove item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Update Bill rows
  document.getElementById('cartSubtotalVal').textContent = `$${totals.subtotal.toFixed(2)}`;
  document.getElementById('cartShippingVal').textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
  document.getElementById('cartTaxVal').textContent = `$${totals.tax.toFixed(2)}`;
  document.getElementById('cartTotalVal').textContent = `$${totals.total.toFixed(2)}`;

  // Discount row
  const discRow = document.getElementById('cartDiscountRow');
  const discVal = document.getElementById('cartDiscountVal');
  const activeCouponBox = document.getElementById('activeCouponBox');

  if (window.store.activeCoupon) {
    if (discRow) discRow.style.display = 'flex';
    if (discVal) discVal.textContent = `-$${totals.discount.toFixed(2)}`;
    if (activeCouponBox) {
      activeCouponBox.style.display = 'flex';
      activeCouponBox.innerHTML = `
        <span>🏷️ <strong>${window.store.activeCoupon.code}</strong> (${window.store.activeCoupon.label})</span>
        <button onclick="window.store.removeCoupon()" style="color: var(--slate-600); font-weight: 700; font-size: 0.8rem;">✕ Remove</button>
      `;
    }
  } else {
    if (discRow) discRow.style.display = 'none';
    if (activeCouponBox) activeCouponBox.style.display = 'none';
  }
}

/* ==========================================================================
   Checkout Multi-Step Modal
   ========================================================================== */

function setupCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('checkoutCloseBtn');
  const nextBtn = document.getElementById('checkoutNextBtn');
  const prevBtn = document.getElementById('checkoutPrevBtn');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const autofillDemoBtn = document.getElementById('autofillDemoBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }

  if (autofillDemoBtn) {
    autofillDemoBtn.addEventListener('click', () => {
      document.getElementById('shipName').value = "Alex Morgan";
      document.getElementById('shipEmail').value = "alex.morgan@example.com";
      document.getElementById('shipPhone').value = "+1 (555) 349-2910";
      document.getElementById('shipAddress').value = "742 Evergreen Terrace";
      document.getElementById('shipCity').value = "Seattle";
      document.getElementById('shipState').value = "WA";
      document.getElementById('shipZip').value = "98101";
      showToast("Demo customer details loaded!");
    });
  }

  // Payment method selection
  document.querySelectorAll('.payment-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.payment-option-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      const method = target.dataset.method;
      
      const cardFields = document.getElementById('cardPaymentFields');
      if (cardFields) {
        cardFields.style.display = method === 'card' ? 'block' : 'none';
      }
    });
  });

  // Step navigation
  let currentStep = 1;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Validate step 1
      const name = document.getElementById('shipName').value.trim();
      const email = document.getElementById('shipEmail').value.trim();
      const address = document.getElementById('shipAddress').value.trim();

      if (!name || !email || !address) {
        showToast("Please fill in required shipping fields", "error");
        return;
      }

      currentStep = 2;
      updateCheckoutStep(currentStep);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentStep = 1;
      updateCheckoutStep(currentStep);
    });
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', submitOrder);
  }
}

function updateCheckoutStep(step) {
  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');
  const step3 = document.getElementById('checkoutStep3');

  const ind1 = document.getElementById('stepInd1');
  const ind2 = document.getElementById('stepInd2');
  const ind3 = document.getElementById('stepInd3');

  if (step === 1) {
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'none';
    if (ind1) ind1.classList.add('active');
    if (ind2) ind2.classList.remove('active');
  } else if (step === 2) {
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
    if (step3) step3.style.display = 'none';
    if (ind1) ind1.classList.add('active');
    if (ind2) ind2.classList.add('active');
    renderCheckoutSummary();
  } else if (step === 3) {
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'block';
    if (ind1) ind1.classList.add('active');
    if (ind2) ind2.classList.add('active');
    if (ind3) ind3.classList.add('active');
  }
}

function renderCheckoutSummary() {
  const summaryBox = document.getElementById('checkoutOrderReview');
  if (!summaryBox) return;

  const totals = window.store.getCartTotals();
  const cart = window.store.cart;

  summaryBox.innerHTML = `
    <div style="background: var(--beige-50); border: 1px solid var(--beige-border); border-radius: var(--radius-md); padding: 1.25rem;">
      <h4 style="font-family: var(--font-heading); margin-bottom: 0.75rem; font-size: 1rem;">Order Items (${totals.totalItems})</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
        ${cart.map(i => `
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span>${i.quantity}x ${i.name}</span>
            <strong>$${(i.price * i.quantity).toFixed(2)}</strong>
          </div>
        `).join('')}
      </div>
      <div style="border-top: 1px dashed var(--slate-300); padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem;">
        <span>Total Due:</span>
        <span style="color: var(--lime-700);">$${totals.total.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function submitOrder() {
  const totals = window.store.getCartTotals();
  const name = document.getElementById('shipName').value.trim();
  const email = document.getElementById('shipEmail').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const city = document.getElementById('shipCity').value.trim();
  const state = document.getElementById('shipState').value.trim();
  const zip = document.getElementById('shipZip').value.trim();

  const activeMethodBtn = document.querySelector('.payment-option-btn.active');
  const method = activeMethodBtn ? activeMethodBtn.dataset.method : 'card';

  const orderId = 'LT-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const estDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toDateString();

  const newOrder = {
    orderId,
    createdAt: now.toISOString(),
    status: 'Processing',
    estimatedDelivery: estDate,
    customer: { name, email, address: `${address}, ${city}, ${state} ${zip}` },
    items: [...window.store.cart],
    payment: { method, last4: "4242" },
    totals
  };

  window.store.addOrder(newOrder);

  // Render receipt
  const receiptWrap = document.getElementById('orderSuccessReceipt');
  if (receiptWrap) {
    receiptWrap.innerHTML = `
      <div class="order-receipt-card">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--beige-border); padding-bottom: 0.75rem; margin-bottom: 1rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--slate-500); text-transform: uppercase;">Order Number</span>
            <h4 style="font-family: var(--font-heading); color: var(--lime-700); font-size: 1.25rem;">${orderId}</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--slate-500); text-transform: uppercase;">Estimated Delivery</span>
            <h4 style="font-family: var(--font-heading); font-size: 1rem;">${estDate}</h4>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--slate-600); margin-bottom: 0.85rem;">
          Confirmation receipt has been sent to <strong>${email}</strong>.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; margin-bottom: 1rem;">
          ${newOrder.items.map(it => `
            <div style="display: flex; justify-content: space-between;">
              <span>${it.quantity}x ${it.name} (${it.brand})</span>
              <span>$${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>

        <div style="border-top: 1px dashed var(--slate-300); padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: 800;">
          <span>Paid Total</span>
          <span style="color: var(--lime-700); font-size: 1.15rem;">$${totals.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  updateCheckoutStep(3);
  showToast("🎉 Order placed successfully! Thank you for shopping with LimeTree.");
}

window.openCheckoutModal = function() {
  if (window.store.cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    updateCheckoutStep(1);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   User Authentication (Login & Register)
   ========================================================================== */

function setupAuthModal() {
  const modal = document.getElementById('authModal');
  const closeBtn = document.getElementById('authCloseBtn');
  const openBtns = [document.getElementById('navUserBtn'), document.getElementById('mobileUserBtn')];
  const loginTab = document.getElementById('authLoginTab');
  const regTab = document.getElementById('authRegisterTab');
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  const fillDemoBtn = document.getElementById('fillDemoUserBtn');

  openBtns.forEach(b => {
    if (b) {
      b.addEventListener('click', () => {
        if (window.store.user) {
          window.location.hash = '#account';
        } else {
          openAuthModal();
        }
      });
    }
  });

  if (closeBtn && modal) closeBtn.addEventListener('click', closeAuthModal);

  if (loginTab && regTab) {
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      regTab.classList.remove('active');
      if (loginForm) loginForm.style.display = 'block';
      if (regForm) regForm.style.display = 'none';
    });
    regTab.addEventListener('click', () => {
      regTab.classList.add('active');
      loginTab.classList.remove('active');
      if (loginForm) loginForm.style.display = 'none';
      if (regForm) regForm.style.display = 'block';
    });
  }

  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      document.getElementById('loginEmail').value = "alex@example.com";
      document.getElementById('loginPassword').value = "password123";
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      window.store.login({
        id: "user-1",
        name: email.split('@')[0] || "Customer",
        email: email
      });
      showToast(`Welcome back, ${email.split('@')[0]}!`);
      closeAuthModal();
      window.location.hash = '#account';
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      window.store.login({ id: "user-" + Date.now(), name, email });
      showToast(`Account created! Welcome to LimeTree, ${name}`);
      closeAuthModal();
      window.location.hash = '#account';
    });
  }
}

window.openAuthModal = function() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

function renderAccountPage() {
  const accountWrap = document.getElementById('accountPageContent');
  if (!accountWrap) return;

  const user = window.store.user;
  const orders = window.store.orders;

  if (!user) {
    accountWrap.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <h3>Please Sign In</h3>
        <p style="color: var(--slate-500); margin-bottom: 1.5rem;">You need to be signed in to view your orders and profile.</p>
        <button class="btn-primary" onclick="openAuthModal()">Sign In to LimeTree</button>
      </div>
    `;
    return;
  }

  accountWrap.innerHTML = `
    <div style="display: grid; grid-template-columns: 320px 1fr; gap: 2.5rem; align-items: start;">
      <div style="background: var(--white); border: 1px solid var(--beige-border); border-radius: var(--radius-lg); padding: 2rem;">
        <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background: var(--lime-100); color: var(--lime-700); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem;">
          ${user.name.charAt(0).toUpperCase()}
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.25rem;">${user.name}</h3>
        <p style="color: var(--slate-500); font-size: 0.85rem; margin-bottom: 1.5rem;">${user.email}</p>
        
        <div style="border-top: 1px solid var(--beige-200); padding-top: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="font-size: 0.85rem; color: var(--slate-600);">
            <strong>Default Address:</strong><br />
            742 Evergreen Terrace<br />Seattle, WA 98101
          </div>
          <button class="btn-secondary" onclick="window.store.logout(); window.location.hash='#home';" style="margin-top: 1rem; width: 100%;">
            Sign Out
          </button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem;">Order History (${orders.length})</h3>
        ${orders.length === 0 ? `
          <p style="color: var(--slate-500);">No orders placed yet.</p>
        ` : orders.map(ord => `
          <div style="background: var(--white); border: 1px solid var(--beige-border); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--beige-200); padding-bottom: 0.75rem; margin-bottom: 1rem;">
              <div>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--lime-700);">${ord.orderId}</span>
                <span style="color: var(--slate-400); font-size: 0.8rem;"> • ${new Date(ord.createdAt).toLocaleDateString()}</span>
              </div>
              <span style="background: var(--lime-100); color: var(--lime-900); font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
                ${ord.status}
              </span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem;">
              ${ord.items.map(item => `
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span>${item.quantity}x ${item.name} (${item.brand})</span>
                  <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--slate-200); padding-top: 0.75rem;">
              <span style="font-size: 0.85rem; color: var(--slate-500);">Delivery: ${ord.estimatedDelivery}</span>
              <span style="font-size: 1.15rem; font-weight: 800; color: var(--slate-900);">$${ord.totals.total.toFixed(2)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   Wishlist Operations
   ========================================================================== */

window.toggleWishlist = function(productId, btn) {
  const added = window.store.toggleWishlist(productId);
  if (btn) {
    btn.classList.toggle('active', added);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', added ? '#ef4444' : 'none');
  }
  showToast(added ? "Saved to your wishlist!" : "Removed from wishlist");
};

/* ==========================================================================
   Forms: Contact & Newsletter
   ========================================================================== */

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      showToast(`Thank you ${name}! Your inquiry has been received.`);
      form.reset();
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      item.classList.toggle('open');
    });
  });
}

function setupNewsletter() {
  const forms = [document.getElementById('footerNewsletterForm'), document.getElementById('homeNewsletterForm')];
  forms.forEach(f => {
    if (!f) return;
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("🎉 Welcome to LimeTree! Use coupon LIMETREE10 for 10% off.");
      f.reset();
    });
  });
}

/* ==========================================================================
   Toast Notifications & Helper Utilities
   ========================================================================== */

window.showToast = function(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--lime-400); font-size: 1.1rem;">${type === 'error' ? '⚠️' : '🌿'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

function handleStateChange(event, data) {
  updateNavCounters();
  if (event === 'cart_updated' || event === 'coupon_applied' || event === 'coupon_removed') {
    renderCartDrawerItems();
  }
}

function updateNavCounters() {
  const cartBadge = document.getElementById('cartCounterBadge');
  const wishBadge = document.getElementById('wishCounterBadge');
  const totals = window.store.getCartTotals();

  if (cartBadge) {
    cartBadge.textContent = totals.totalItems;
    cartBadge.style.display = totals.totalItems > 0 ? 'flex' : 'none';
  }

  if (wishBadge) {
    wishBadge.textContent = window.store.wishlist.length;
    wishBadge.style.display = window.store.wishlist.length > 0 ? 'flex' : 'none';
  }
}

function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Esc to close modals
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
      closeCheckoutModal();
      closeAuthModal();
    }
    // '/' to focus search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const search = document.getElementById('navSearchInput');
      if (search) search.focus();
    }
  });
}

/* ==========================================================================
   Parallax Controller Engine
   Multi-Speed Scroll Parallax & Interactive 3D Mouse Tilt
   ========================================================================== */

let parallaxScrollElements = [];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initParallaxController() {
  if (prefersReducedMotion.matches) return;

  setupParallaxScroll();
  setupParallaxTilt();

  window.addEventListener('resize', debounceParallax(refreshParallax, 150));
}

function refreshParallax() {
  if (prefersReducedMotion.matches) return;

  const scrollEls = document.querySelectorAll('[data-parallax-speed], [data-parallax-type]');
  parallaxScrollElements = Array.from(scrollEls).filter(el => {
    return el.offsetParent !== null;
  });

  setupParallaxTilt();
  updateParallax();
}

function setupParallaxScroll() {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(updateParallax, 80);
}

function updateParallax() {
  if (prefersReducedMotion.matches) return;

  const windowHeight = window.innerHeight;
  const elements = parallaxScrollElements.length > 0
    ? parallaxScrollElements
    : document.querySelectorAll('[data-parallax-speed], [data-parallax-type]');

  elements.forEach(el => {
    if (!el.isConnected || el.offsetParent === null) return;

    const rect = el.getBoundingClientRect();
    // Element must be somewhat near viewport (buffer of 200px)
    if (rect.bottom < -200 || rect.top > windowHeight + 200) return;

    const speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
    const type = el.dataset.parallaxType || 'element';

    // Calculate distance from viewport center
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const offsetFromCenter = elementCenter - viewportCenter;

    if (type === 'hero-bg' || type === 'banner-bg') {
      // Background images inside overflow-hidden wrappers
      const translateY = (offsetFromCenter * speed).toFixed(1);
      el.style.transform = `translate3d(0, ${translateY}px, 0)`;
    } else if (type === 'media') {
      // Product cards and story media sliding smoothly in cropped container
      const translateY = (offsetFromCenter * speed).toFixed(1);
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.06)`;
    } else if (type === 'circle-media') {
      // Pillar circle backgrounds
      const shiftY = (52 + (offsetFromCenter * speed * 0.12)).toFixed(1);
      el.style.backgroundPositionY = `${shiftY}%`;
    } else {
      // Floating badges, ambient orbs, text headers
      const translateY = (offsetFromCenter * speed).toFixed(1);
      el.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }
  });
}

function setupParallaxTilt() {
  if (prefersReducedMotion.matches) return;
  // Disable 3D tilt on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const tiltElements = document.querySelectorAll('[data-parallax-tilt="true"]');
  tiltElements.forEach(el => {
    if (el._hasTiltListener) return;
    el._hasTiltListener = true;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (((y - centerY) / centerY) * -5.5).toFixed(2);
      const rotateY = (((x - centerX) / centerX) * 5.5).toFixed(2);

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

function debounceParallax(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

