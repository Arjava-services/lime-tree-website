/**
 * LIMETREE - Storefront Logic & Interactive Client Engine
 * Vanilla JavaScript (ES6+) for Catalog, Filters, Cart Drawer,
 * Variant Selection, Checkout, GST Calculation, and Invoices.
 */

class LimetreeStorefront {
  constructor() {
    this.storage = window.limetreeStorage;
    this.currentBusinessFilter = null;
    this.currentCategoryFilter = null;
    this.currentSort = 'newest';
    this.inStockOnly = false;
    this.searchQuery = '';
    this.activeProductModal = null;
    this.selectedVariant = null;
    this.appliedCoupon = null;

    this.init();
  }

  init() {
    this.setupUrlRouting();
    this.bindEvents();
    this.updateCounters();
    this.renderCatalog();
  }

  bindEvents() {
    window.addEventListener('limetree:cart-updated', () => {
      this.updateCounters();
      this.renderCartDrawer();
    });

    window.addEventListener('limetree:wishlist-updated', () => {
      this.updateCounters();
      this.renderCatalog();
    });

    window.addEventListener('limetree:products-updated', () => {
      this.renderCatalog();
    });

    window.addEventListener('limetree:orders-updated', () => {
      this.updateCounters();
      if (typeof renderOrderHistory === 'function') {
        renderOrderHistory();
      }
    });

    const cartBtn = document.getElementById('headerCartBtn');
    const cartCloseBtn = document.getElementById('cartDrawerCloseBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');

    if (cartBtn) cartBtn.addEventListener('click', () => this.openCartDrawer());
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', () => this.closeCartDrawer());
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => {
      this.closeCartDrawer();
      this.closeModal();
    });

    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearchInput(e.target.value);
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
          const dropdown = document.getElementById('searchResultsDropdown');
          if (dropdown) dropdown.classList.remove('active');
        }
      });
    }

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCatalog();
      });
    }

    const inStockToggle = document.getElementById('inStockToggle');
    if (inStockToggle) {
      inStockToggle.addEventListener('change', (e) => {
        this.inStockOnly = e.target.checked;
        this.renderCatalog();
      });
    }

    // Only bind to brand filter tabs with data-business attribute
    const brandTabs = document.querySelectorAll('.filter-tab[data-business]');
    brandTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        brandTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const biz = tab.dataset.business;
        this.currentBusinessFilter = (!biz || biz === 'all') ? null : biz;
        this.currentCategoryFilter = null;
        this.renderCatalog();
      });
    });

    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => this.applyCoupon());
    }

    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.closeCartDrawer();
        this.openCheckoutModal();
      });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput && emailInput.value) {
          this.showToast('Thank you for subscribing to Limetree Privileges!', 'success');
          emailInput.value = '';
        }
      });
    }

    const annClose = document.getElementById('announcementCloseBtn');
    if (annClose) {
      annClose.addEventListener('click', () => {
        const bar = document.getElementById('announcementBar');
        if (bar) bar.style.display = 'none';
      });
    }
  }

  setupUrlRouting() {
    const path = (window.location.pathname || '').toLowerCase();
    const href = (window.location.href || '').toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const bizParam = params.get('business');

    if (path.includes('riyaa-trends') || href.includes('riyaa-trends') || bizParam === 'riyaa-trends') {
      this.currentBusinessFilter = 'riyaa-trends';
    } else if (path.includes('glow-home') || href.includes('glow-home') || bizParam === 'glow-home') {
      this.currentBusinessFilter = 'glow-home';
    } else if (path.includes('earkart') || href.includes('earkart') || bizParam === 'earkart') {
      this.currentBusinessFilter = 'earkart';
    } else {
      this.currentBusinessFilter = null;
    }

    const activeTab = document.querySelector(`.filter-tab[data-business="${this.currentBusinessFilter || 'all'}"]`);
    if (activeTab) {
      document.querySelectorAll('.filter-tab[data-business]').forEach(t => t.classList.remove('active'));
      activeTab.classList.add('active');
    }
  }

  setBusinessFilter(brandId) {
    this.currentBusinessFilter = (!brandId || brandId === 'all') ? null : brandId;
    this.currentCategoryFilter = null;
    const activeTab = document.querySelector(`.filter-tab[data-business="${brandId || 'all'}"]`);
    if (activeTab) {
      document.querySelectorAll('.filter-tab[data-business]').forEach(t => t.classList.remove('active'));
      activeTab.classList.add('active');
    }
    this.renderCatalog();
    const catalogSec = document.getElementById('catalogSection') || document.getElementById('productCatalogGrid');
    if (catalogSec) {
      catalogSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateCounters() {
    const cart = this.storage.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('headerCartCount');
    if (cartCountEl) {
      const prevCart = parseInt(cartCountEl.textContent, 10) || 0;
      cartCountEl.textContent = totalItems;
      cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
      if (totalItems > 0 && totalItems !== prevCart) {
        cartCountEl.classList.remove('badge-pop');
        void cartCountEl.offsetWidth; // trigger reflow
        cartCountEl.classList.add('badge-pop');
      }
    }

    const wishlist = this.storage.getWishlist();
    const wishlistCountEl = document.getElementById('headerWishlistCount');
    if (wishlistCountEl) {
      const prevWish = parseInt(wishlistCountEl.textContent, 10) || 0;
      wishlistCountEl.textContent = wishlist.length;
      wishlistCountEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
      if (wishlist.length > 0 && wishlist.length !== prevWish) {
        wishlistCountEl.classList.remove('badge-pop');
        void wishlistCountEl.offsetWidth;
        wishlistCountEl.classList.add('badge-pop');
      }
    }

    try {
      const orders = this.storage.getOrders();
      const ordersCountEl = document.getElementById('headerOrdersCount');
      if (ordersCountEl) {
        ordersCountEl.textContent = orders.length;
        ordersCountEl.style.display = orders.length > 0 ? 'flex' : 'none';
      }
    } catch (e) {}
  }

  // ==================== CATALOG RENDERING ====================
  renderCatalog() {
    const grid = document.getElementById('productCatalogGrid');
    if (!grid) return;

    const filter = {
      businessId: this.currentBusinessFilter,
      category: this.currentCategoryFilter,
      searchQuery: this.searchQuery,
      inStockOnly: this.inStockOnly,
      sortBy: this.currentSort
    };

    let products = [];
    try {
      products = this.storage ? this.storage.getProducts(filter) : [];
    } catch (e) {
      console.error('Error fetching products from storage:', e);
    }

    if (!products || products.length === 0) {
      const all = window.INITIAL_PRODUCTS || [];
      products = all.filter(p => !filter.businessId || p.businessId === filter.businessId);
    }

    // Deduplicate products to prevent any duplicate rendering
    const seenGridIds = new Set();
    const seenGridNames = new Set();
    products = (products || []).filter(p => {
      if (!p || !p.id || !p.name) return false;
      if (seenGridIds.has(p.id) || seenGridNames.has(p.name)) return false;
      seenGridIds.add(p.id);
      seenGridNames.add(p.name);
      return true;
    });

    // Enforce maximum 6 unique products when on a brand page (or filtering by brand)
    if (filter.businessId && filter.businessId !== 'all') {
      products = products.slice(0, 6);
    }

    if (!products || products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-accent-sage);">🌿</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-primary-dark); margin-bottom: 0.5rem;">No products found</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 440px; margin: 0 auto 1.5rem auto;">
            We couldn't find items matching your criteria. Try adjusting your filters or search keywords.
          </p>
          <button class="btn btn-secondary btn-sm" onclick="window.limetreeStore.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((prod, idx) => {
      try {
        return this.buildProductCardHtml(prod, idx);
      } catch (err) {
        console.error('Error rendering product card:', err, prod);
        return '';
      }
    }).join('');

    if (window.limetreeAnimations && typeof window.limetreeAnimations.observeElements === 'function') {
      window.limetreeAnimations.observeElements(grid);
    }
  }

  buildProductCardHtml(prod, idx = 0) {
    const business = window.LIMETREE_BUSINESSES[prod.businessId] || {};
    const totalStock = (prod.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
    const isOutOfStock = totalStock <= 0;
    const isWishlisted = (this.storage && typeof this.storage.isInWishlist === 'function')
      ? this.storage.isInWishlist(prod.id)
      : false;

    let fallbackImg = 'assets/riyaa-trends/IMG-20260222-WA0041.jpg';
    if (prod.businessId === 'glow-home') {
      fallbackImg = 'assets/glow-home/IMG_20260816_171236.jpg';
    } else if (prod.businessId === 'earkart') {
      fallbackImg = 'assets/earkart/earkart-daisy-pair-original.jpg';
    }
    const firstImg = (prod.images && prod.images[0]) || fallbackImg;
    const minPrice = prod.salePrice || prod.basePrice;
    const hasDiscount = prod.salePrice && prod.salePrice < prod.basePrice;
    const discountPct = hasDiscount ? Math.round(((prod.basePrice - prod.salePrice) / prod.basePrice) * 100) : 0;

    let variantBadgeText = '';
    if (prod.businessId === 'riyaa-trends') {
      const sizes = [...new Set((prod.variants || []).map(v => v.size ? v.size.split(' ')[0] : ''))].filter(Boolean).join(', ');
      const colors = [...new Set((prod.variants || []).map(v => v.color))].filter(Boolean).join(', ');
      variantBadgeText = sizes ? `Sizes: ${sizes}` : (colors ? `Colour: ${colors}` : 'Sizes: XS, S, M, L');
      if (colors && sizes) {
        variantBadgeText = `Sizes: ${sizes} · ${colors}`;
      }
    } else if (prod.businessId === 'glow-home') {
      const sizes = [...new Set((prod.variants || []).map(v => v.size ? v.size.split(' ')[0] : ''))].filter(Boolean).join(', ');
      const frag = [...new Set((prod.variants || []).map(v => v.fragrance))].filter(Boolean).join(', ');
      variantBadgeText = sizes ? `Sizes: ${sizes}` : 'Pure Soy Wax';
      if (frag) {
        variantBadgeText = `Sizes: ${sizes || '150g'} · ${frag}`;
      }
    } else if (prod.businessId === 'earkart') {
      const mats = [...new Set((prod.variants || []).map(v => v.material ? v.material.split(' ')[0] : ''))].filter(Boolean).join(' / ');
      const colors = [...new Set((prod.variants || []).map(v => v.color))].filter(Boolean).join(', ');
      variantBadgeText = mats ? `Posts: ${mats}` : 'Hypoallergenic Silver / Gold';
      if (colors) {
        variantBadgeText = `${mats || 'Silver/Gold'} · ${colors}`;
      }
    }

    return `
      <div class="product-card reveal-card" data-product-id="${prod.id}" style="--stagger-i: ${idx % 8};">
        <div class="product-image-container" onclick="window.limetreeStore.openProductModal('${prod.id}')" style="cursor:pointer;">
          <img src="${firstImg}" alt="${prod.name}" loading="lazy" />
          <div class="product-badge-group">
            <span class="badge-brand">${business.name || 'Limetree'}</span>
            ${hasDiscount ? `<span class="badge-sale">${discountPct}% OFF</span>` : ''}
            ${isOutOfStock ? `<span class="badge-out-of-stock">Out of Stock</span>` : ''}
          </div>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="window.limetreeStore.toggleWishlist('${prod.id}', event)" 
                  title="Save to Wishlist">
            ♥
          </button>
          <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); window.limetreeStore.openProductModal('${prod.id}')">
            Quick View
          </button>
        </div>
        <div class="product-info">
          <span class="product-category">${prod.category}</span>
          <h3 class="product-name" onclick="window.limetreeStore.openProductModal('${prod.id}')" style="cursor:pointer;" title="${prod.name}">
            ${prod.name}
          </h3>
          <div class="product-variant-preview" title="${variantBadgeText}">
            <span>✦</span> <span>${variantBadgeText}</span>
          </div>
          <div class="rating-stars">
            <span>★★★★★</span>
            <span class="reviews-count">(${prod.reviewsCount || 24})</span>
          </div>
          <div class="product-price-row">
            <span class="product-current-price">₹${minPrice}</span>
            ${hasDiscount ? `<span class="product-original-price">₹${prod.basePrice}</span>` : ''}
            ${hasDiscount ? `<span class="product-savings-pill">Save ₹${prod.basePrice - prod.salePrice}</span>` : ''}
          </div>
          <button class="btn btn-primary product-card-action-btn" 
                  ${isOutOfStock ? 'disabled' : ''} 
                  onclick="window.limetreeStore.handleProductCardAction('${prod.id}', event)">
            ${isOutOfStock ? 'Sold Out' : '🛒 Add to Cart'}
          </button>
        </div>
      </div>
    `;
  }

  resetFilters() {
    this.setupUrlRouting();
    this.currentCategoryFilter = null;
    this.searchQuery = '';
    this.inStockOnly = false;
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) searchInput.value = '';
    const inStockToggle = document.getElementById('inStockToggle');
    if (inStockToggle) inStockToggle.checked = false;
    document.querySelectorAll('.filter-tab, .category-tab').forEach(t => t.classList.remove('active'));
    const targetTab = document.querySelector(`.filter-tab[data-business="${this.currentBusinessFilter || 'all'}"]`) || document.querySelector('.filter-tab:first-child');
    if (targetTab) targetTab.classList.add('active');
    this.renderCatalog();
  }

  filterByCategory(categoryName, btn = null) {
    this.currentCategoryFilter = (!categoryName || categoryName === 'all') ? null : categoryName;
    if (btn) {
      const parent = btn.closest('.filter-tabs');
      if (parent) {
        parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
      }
    }
    this.renderCatalog();
  }

  // ==================== SEARCH HANDLING ====================
  handleSearchInput(query) {
    this.searchQuery = query;
    const dropdown = document.getElementById('searchResultsDropdown');
    if (!dropdown) return;

    if (!query || query.trim().length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const matches = this.storage.getProducts({ searchQuery: query });
    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding: 1.1rem; text-align: center; font-size: 0.88rem; color: var(--color-text-muted);">No matching products found.</div>`;
      dropdown.classList.add('active');
      return;
    }

    dropdown.innerHTML = matches.slice(0, 6).map(prod => `
      <div class="search-item" onclick="window.limetreeStore.openProductModal('${prod.id}')">
        <img src="${prod.images[0]}" alt="${prod.name}" />
        <div class="search-item-info">
          <div class="search-item-title">${prod.name}</div>
          <div class="search-item-sub">${window.LIMETREE_BUSINESSES[prod.businessId]?.name || ''} · ${prod.category}</div>
        </div>
        <div class="search-item-price">₹${prod.salePrice || prod.basePrice}</div>
      </div>
    `).join('');
    dropdown.classList.add('active');
  }

  toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const btn = event ? (event.currentTarget || event.target) : null;
    if (btn && window.limetreeAnimations) {
      window.limetreeAnimations.popHeart(btn);
    }
    const isAdded = this.storage.toggleWishlist(productId);
    const prod = this.storage.getProductById(productId);
    this.showToast(isAdded ? `Saved ${prod?.name || 'item'} to your wishlist!` : 'Removed item from wishlist.', 'info');
  }

  addToCart(productId, variantId, quantity = 1) {
    return this.storage.addToCart({
      productId,
      variantId,
      quantity
    });
  }

  showInvoiceModal(orderOrId) {
    const orderId = typeof orderOrId === 'string' ? orderOrId : (orderOrId?.orderId || orderOrId?.id);
    if (orderId) {
      this.openPrintableInvoice(orderId);
    }
  }

  handleProductCardAction(productId, event) {
    if (event) event.stopPropagation();
    const btn = event ? (event.currentTarget || event.target) : null;
    if (btn && window.limetreeAnimations) {
      window.limetreeAnimations.pulseButton(btn);
    }
    const prod = this.storage.getProductById(productId);
    if (!prod) return;
    const inStockVar = (prod.variants || []).find(v => v.stock > 0);
    if (!inStockVar) {
      this.showToast('This product is currently out of stock.', 'error');
      return;
    }
    try {
      this.storage.addToCart({
        productId: prod.id,
        variantId: inStockVar.id,
        quantity: 1
      });
      const varLabel = inStockVar.size || inStockVar.material || inStockVar.fragrance || 'Standard';
      this.showToast(`Added ${prod.name} (${varLabel}) to your bag!`, 'success');
      this.openCartDrawer();
    } catch (err) {
      this.showToast(err.message || 'Could not add to cart.', 'error');
    }
  }

  // ==================== PRODUCT DETAIL / QUICK VIEW MODAL ====================
  openProductModal(productId) {
    const prod = this.storage.getProductById(productId);
    if (!prod) return;

    this.activeProductModal = prod;
    const inStockVar = (prod.variants || []).find(v => v.stock > 0);
    this.selectedVariant = inStockVar || (prod.variants && prod.variants[0]) || null;

    const modal = document.getElementById('quickViewModal');
    const container = document.getElementById('quickViewModalBody');
    if (!modal || !container) return;

    container.innerHTML = this.buildProductModalHtml(prod);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    try {
      window.history.pushState({ quickViewModal: true }, '');
    } catch (e) {}

    const dropdown = document.getElementById('searchResultsDropdown');
    if (dropdown) dropdown.classList.remove('active');
  }

  buildProductModalHtml(prod) {
    const business = window.LIMETREE_BUSINESSES[prod.businessId] || {};
    const currentVar = this.selectedVariant;
    const currentPrice = currentVar ? currentVar.price : (prod.salePrice || prod.basePrice);
    const stockQty = currentVar ? currentVar.stock : 0;
    const isOutOfStock = stockQty <= 0;

    // Related products from the same business
    const related = this.storage.getProducts({ businessId: prod.businessId })
      .filter(p => p.id !== prod.id)
      .slice(0, 3);

    return `
      <div class="modal-top-actions" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <a href="index.html" class="modal-back-btn modal-home-btn" onclick="window.limetreeStore.closeModal()" aria-label="LIMETREE Home" title="Return to Homepage" style="text-decoration: none;">
            <img src="assets/logo-transparent.png" alt="LIMETREE" style="height: 20px; width: auto; mix-blend-mode: multiply; vertical-align: middle;" />
            <span style="font-weight: 700;">Home</span>
          </a>
          <button type="button" class="modal-back-btn" onclick="window.limetreeStore.closeModal()" aria-label="Back to Products">
            <span style="font-size: 1.15rem; line-height: 1;">&larr;</span> <span>Back to Products</span>
          </button>
        </div>
        <div class="modal-top-breadcrumb" style="font-size: 0.82rem; color: var(--color-text-muted);">
          <a href="index.html" onclick="window.limetreeStore.closeModal()" style="color: var(--color-leaf-green); font-weight: 600; text-decoration: none;">Home</a>
          <span style="margin: 0 0.35rem; color: var(--color-border);">/</span>
          <span>${business.name || 'Store'}</span>
        </div>
      </div>
      <div class="product-detail-grid">
        <div class="gallery-col">
          <img id="modalMainImg" class="gallery-main-img" src="${prod.images[0]}" alt="${prod.name}" />
          <div class="gallery-thumbs">
            ${(prod.images || []).map((img, idx) => `
              <img class="gallery-thumb ${idx === 0 ? 'active' : ''}" src="${img}" alt="Thumbnail ${idx}" 
                   onclick="window.limetreeStore.switchModalImg('${img}', this)" />
            `).join('')}
          </div>
        </div>

        <div class="details-col">
          <div class="modal-product-breadcrumb" style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-accent-sage); margin-bottom: 0.4rem;">
            <a href="index.html" onclick="window.limetreeStore.closeModal()" style="color: var(--color-leaf-green); text-decoration: none;">Home</a>
            <span style="margin: 0 0.35rem; color: var(--color-text-light);">/</span>
            <a href="${prod.businessId}.html" style="color: var(--color-primary-dark); text-decoration: none;">${business.name}</a>
            <span style="margin: 0 0.35rem; color: var(--color-text-light);">/</span>
            <span>${prod.category}</span>
          </div>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-primary-dark); line-height: 1.25; margin-bottom: 0.6rem;">
            ${prod.name}
          </h2>
          
          <div class="rating-stars" style="margin-bottom: 1rem;">
            <span>★★★★★</span>
            <span class="reviews-count">${prod.rating} / 5.0 (${prod.reviewsCount} verified reviews)</span>
          </div>

          <div class="product-price-row" style="margin-bottom: 1rem;">
            <span id="modalCurrentPrice" style="font-size: 1.65rem; font-weight: 700; color: var(--color-primary-dark);">₹${currentPrice}</span>
            ${prod.salePrice && prod.salePrice < prod.basePrice ? `
              <span style="font-size: 1rem; color: var(--color-text-light); text-decoration: line-through;">₹${prod.basePrice}</span>
            ` : ''}
          </div>

          <p style="font-size: 0.94rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.4rem;">
            ${prod.description}
          </p>

          <div id="modalVariantContainer">
            ${this.renderBusinessVariantSelectors(prod)}
          </div>

          <div id="modalStockStatus">
            ${this.buildStockPillHtml(stockQty)}
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; margin: 1.5rem 0;">
            <div class="qty-control" style="height: 44px;">
              <button class="qty-btn" onclick="window.limetreeStore.adjustModalQty(-1)">−</button>
              <input id="modalQtyInput" class="qty-display" type="text" value="1" readonly />
              <button class="qty-btn" onclick="window.limetreeStore.adjustModalQty(1)">+</button>
            </div>
            <button id="modalAddToCartBtn" class="btn btn-primary" style="flex: 1; height: 44px;" 
                    ${isOutOfStock ? 'disabled' : ''} 
                    onclick="window.limetreeStore.addCurrentModalToCart()">
              ${isOutOfStock ? 'Currently Out of Stock' : 'Add to Bag'}
            </button>
            <button class="btn btn-secondary" style="height: 44px;" 
                    ${isOutOfStock ? 'disabled' : ''}
                    onclick="window.limetreeStore.buyNowCurrentModal()">
              Buy Now
            </button>
          </div>

          <div style="border-top: 1px solid var(--color-border); padding-top: 1.2rem; font-size: 0.82rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
            <div><strong>SKU:</strong> <span id="modalSkuDisplay">${currentVar ? currentVar.sku : prod.sku}</span></div>
            <div><strong>HSN Code:</strong> ${prod.hsnCode || 'N/A'} (GST ${business.gstRate || 18}%)</div>
            <div><strong>Complimentary Shipping:</strong> On orders above ₹999 across India</div>
            <div><strong>Return Policy:</strong> ${business.returnWindowDays}-Day verified exchange/return eligible</div>
          </div>
        </div>
      </div>

      <!-- RELATED PRODUCTS ROW -->
      ${related.length > 0 ? `
        <div style="border-top: 1px solid var(--color-border); padding: 2rem 2.8rem 2.5rem 2.8rem; background: var(--color-bg-base);">
          <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--color-primary-dark); margin-bottom: 1.2rem;">
            You May Also Admire from ${business.name}
          </h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem;">
            ${related.map(r => `
              <div style="display: flex; gap: 0.8rem; align-items: center; background: #FFFFFF; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); cursor: pointer;"
                   onclick="window.limetreeStore.openProductModal('${r.id}')">
                <img src="${r.images[0]}" style="width: 54px; height: 54px; object-fit: cover; border-radius: var(--radius-xs);" />
                <div>
                  <div style="font-size: 0.84rem; font-weight: 600; line-height: 1.2;">${r.name}</div>
                  <div style="font-size: 0.84rem; font-weight: 700; color: var(--color-primary); margin-top: 0.2rem;">₹${r.salePrice || r.basePrice}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  renderBusinessVariantSelectors(prod) {
    if (prod.businessId === 'riyaa-trends') {
      return `
        <div class="variant-selector-group">
          <div class="variant-label"><span>Select Size &amp; Colour Variant</span></div>
          <div class="variant-pills">
            ${(prod.variants || []).map(v => `
              <button class="variant-pill ${v.id === this.selectedVariant?.id ? 'active' : ''} ${v.stock <= 0 ? 'disabled' : ''}" 
                      onclick="window.limetreeStore.selectVariant('${v.id}')">
                ${v.size} - ${v.color} (${v.stock > 0 ? '₹' + v.price : 'Sold out'})
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (prod.businessId === 'glow-home') {
      return `
        <div class="variant-selector-group">
          <div class="variant-label"><span>Select Fragrance &amp; Jar Size</span></div>
          <div class="variant-pills">
            ${(prod.variants || []).map(v => `
              <button class="variant-pill ${v.id === this.selectedVariant?.id ? 'active' : ''} ${v.stock <= 0 ? 'disabled' : ''}" 
                      onclick="window.limetreeStore.selectVariant('${v.id}')">
                ${v.size} (${v.stock > 0 ? '₹' + v.price : 'Sold out'})
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (prod.businessId === 'earkart') {
      return `
        <div class="variant-selector-group">
          <div class="variant-label"><span>Select Metal &amp; Finish</span></div>
          <div class="variant-pills">
            ${(prod.variants || []).map(v => `
              <button class="variant-pill ${v.id === this.selectedVariant?.id ? 'active' : ''} ${v.stock <= 0 ? 'disabled' : ''}" 
                      onclick="window.limetreeStore.selectVariant('${v.id}')">
                ${v.material} (${v.stock > 0 ? '₹' + v.price : 'Sold out'})
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }
    return '';
  }

  buildStockPillHtml(stockQty) {
    if (stockQty <= 0) {
      return `<div class="stock-indicator-pill stock-out">✕ Out of Stock</div>`;
    } else if (stockQty < 5) {
      return `<div class="stock-indicator-pill stock-low">⚠ Only ${stockQty} units left in stock — order soon!</div>`;
    } else {
      return `<div class="stock-indicator-pill stock-in">✓ In Stock (${stockQty} units available)</div>`;
    }
  }

  switchModalImg(src, thumbEl) {
    const mainImg = document.getElementById('modalMainImg');
    if (mainImg) {
      mainImg.classList.add('fade-out');
      setTimeout(() => {
        mainImg.src = src;
        mainImg.classList.remove('fade-out');
      }, 150);
    }
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  selectVariant(variantId) {
    if (!this.activeProductModal) return;
    const v = (this.activeProductModal.variants || []).find(item => item.id === variantId);
    if (!v) return;

    this.selectedVariant = v;

    const priceEl = document.getElementById('modalCurrentPrice');
    if (priceEl) priceEl.textContent = `₹${v.price}`;

    const skuEl = document.getElementById('modalSkuDisplay');
    if (skuEl) skuEl.textContent = v.sku;

    const stockEl = document.getElementById('modalStockStatus');
    if (stockEl) stockEl.innerHTML = this.buildStockPillHtml(v.stock);

    const btn = document.getElementById('modalAddToCartBtn');
    if (btn) {
      btn.disabled = v.stock <= 0;
      btn.textContent = v.stock <= 0 ? 'Currently Out of Stock' : 'Add to Bag';
    }

    document.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
    const activePill = event?.target?.closest('.variant-pill');
    if (activePill) activePill.classList.add('active');
  }

  adjustModalQty(delta) {
    const input = document.getElementById('modalQtyInput');
    if (!input || !this.selectedVariant) return;
    let qty = parseInt(input.value, 10) || 1;
    qty = Math.max(1, qty + delta);

    if (this.selectedVariant && qty > this.selectedVariant.stock) {
      this.showToast(`Only ${this.selectedVariant.stock} units available in stock.`, 'warning');
      return;
    }
    input.value = qty;
  }

  addCurrentModalToCart() {
    if (!this.activeProductModal || !this.selectedVariant) return;
    const input = document.getElementById('modalQtyInput');
    const qty = parseInt(input?.value || '1', 10);

    try {
      this.storage.addToCart({
        productId: this.activeProductModal.id,
        variantId: this.selectedVariant.id,
        quantity: qty
      });
      this.closeModal();
      this.showToast(`Added ${this.activeProductModal.name} to your bag!`, 'success');
      this.openCartDrawer();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  buyNowCurrentModal() {
    this.addCurrentModalToCart();
    this.closeCartDrawer();
    this.openCheckoutModal();
  }

  closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('active');
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.classList.remove('active');
    const invoiceModal = document.getElementById('invoiceModal');
    if (invoiceModal) invoiceModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==================== CART DRAWER ====================
  openCartDrawer() {
    this.renderCartDrawer();
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    try {
      window.history.pushState({ cartDrawer: true }, '');
    } catch (e) {}
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderCartDrawer() {
    const body = document.getElementById('cartDrawerBody');
    const subtotalEl = document.getElementById('cartSubtotalDisplay');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (!body) return;

    const cart = this.storage.getCart();

    if (cart.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 4.5rem 1rem; color: var(--color-text-muted);">
          <div style="font-size: 2.8rem; margin-bottom: 0.8rem; color: var(--color-accent-sage);">🛍</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--color-primary-dark); margin-bottom: 0.4rem;">Your shopping bag is empty</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1.6rem;">Explore curated fashion from Riyaa Trends, luxury fragrance from Glow Home, and fine studs from Earkart.</p>
          <button class="btn btn-primary btn-sm" onclick="window.limetreeStore.closeCartDrawer()">Explore Catalog</button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = false;

    const settings = this.storage.getSettings();
    const threshold = settings.freeShippingThreshold || 999;
    const remaining = Math.max(0, threshold - subtotal);

    let thresholdHtml = '';
    if (remaining > 0) {
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      thresholdHtml = `
        <div style="background: var(--color-bg-base); border: 1px solid var(--color-border); padding: 0.8rem 1.1rem; border-radius: var(--radius-sm); margin-bottom: 1.2rem;">
          <div style="font-size: 0.82rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 0.4rem;">
            Add <span style="color: var(--color-primary); font-weight: 700;">₹${remaining.toFixed(2)}</span> more to unlock <span style="color: var(--color-success); font-weight: 700;">FREE Express Delivery!</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--color-border); border-radius: var(--radius-pill); overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--color-primary); transition: width 0.3s ease;"></div>
          </div>
        </div>
      `;
    } else {
      thresholdHtml = `
        <div style="background: var(--color-success-bg); border: 1px solid var(--color-success); color: var(--color-success); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.2rem; font-size: 0.84rem; font-weight: 700; text-align: center;">
          🎉 Congratulations! You have unlocked FREE Express Delivery!
        </div>
      `;
    }

    body.innerHTML = thresholdHtml + cart.map(item => `
      <div class="cart-item-row" data-variant="${item.variantId}">
        <img class="cart-item-img" src="${item.image}" alt="${item.productName}" />
        <div class="cart-item-details">
          <div class="cart-item-brand">${window.LIMETREE_BUSINESSES[item.businessId]?.name || ''}</div>
          <div class="cart-item-name">${item.productName}</div>
          <div class="cart-item-variant">${item.variantLabel}</div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="window.limetreeStore.updateItemQty('${item.productId}', '${item.variantId}', ${item.quantity - 1})">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="window.limetreeStore.updateItemQty('${item.productId}', '${item.variantId}', ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
            <button class="cart-item-remove-btn" onclick="window.limetreeStore.removeCartItem('${item.productId}', '${item.variantId}', this)">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  updateItemQty(productId, variantId, qty) {
    try {
      this.storage.updateCartQuantity(productId, variantId, qty);
    } catch (e) {
      this.showToast(e.message, 'error');
    }
  }

  removeCartItem(productId, variantId, btnEl) {
    const row = btnEl ? btnEl.closest('.cart-item-row') : document.querySelector(`.cart-item-row[data-variant="${variantId}"]`);
    if (row) {
      row.classList.add('removing');
      setTimeout(() => {
        this.storage.removeFromCart(productId, variantId);
        this.showToast('Item removed from shopping bag.', 'info');
      }, 300);
    } else {
      this.storage.removeFromCart(productId, variantId);
      this.showToast('Item removed from shopping bag.', 'info');
    }
  }

  applyCoupon() {
    const input = document.getElementById('couponCodeInput');
    const code = input?.value?.trim().toUpperCase();
    if (!code) return;

    const cart = this.storage.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const validCoupon = (window.INITIAL_COUPONS || []).find(c => c.code === code);

    if (!validCoupon) {
      this.showToast(`Invalid promo code "${code}". Try LIMETREE10 or FESTIVE20.`, 'error');
      return;
    }

    if (subtotal < validCoupon.minOrder) {
      this.showToast(`Minimum order amount of ₹${validCoupon.minOrder} required for ${code}.`, 'warning');
      return;
    }

    this.appliedCoupon = validCoupon;
    this.showToast(`Promo code ${code} applied successfully!`, 'success');
    this.renderCartDrawer();
  }

  // ==================== CHECKOUT & ORDER EXECUTION ====================
  openCheckoutModal() {
    const cart = this.storage.getCart();
    if (cart.length === 0) {
      this.showToast('Your shopping bag is empty.', 'warning');
      return;
    }

    const modal = document.getElementById('checkoutModal');
    const body = document.getElementById('checkoutModalBody');
    if (!modal || !body) return;

    body.innerHTML = this.buildCheckoutModalHtml();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.recalculateCheckoutTotals();
  }

  buildCheckoutModalHtml() {
    return `
      <div style="padding: 2.2rem;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <h2 style="font-family: var(--font-heading); font-size: 1.7rem; color: var(--color-primary-dark);">
            Secure Checkout — Limetree
          </h2>
          <span style="font-size: 0.8rem; font-weight: 700; background: var(--color-primary-subtle); color: var(--color-primary); padding: 0.3rem 0.75rem; border-radius: var(--radius-pill);">
            🔒 256-Bit SSL Encrypted
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 0.95fr; gap: 2.2rem;">
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); margin-bottom: 1rem;">
              1. Delivery Address &amp; Contact
            </h4>

            <form id="checkoutForm" onsubmit="window.limetreeStore.submitOrder(event)" style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="form-grid">
                <div class="form-group full-width">
                  <label class="form-label">Full Name *</label>
                  <input type="text" id="custName" class="form-control" required placeholder="e.g. Santhosh Kumar" value="Santhosh Kumar" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="custEmail" class="form-control" required placeholder="santhosh@example.com" value="santhosh@example.com" />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" id="custPhone" class="form-control" required placeholder="+91 98765 43210" value="+91 98765 43210" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Street Address *</label>
                  <input type="text" id="custAddress" class="form-control" required placeholder="Apartment, Studio, or Floor & Street" value="Flat 402, Botanical Grove" />
                </div>
                <div class="form-group">
                  <label class="form-label">City *</label>
                  <input type="text" id="custCity" class="form-control" required value="Coimbatore" />
                </div>
                <div class="form-group">
                  <label class="form-label">State *</label>
                  <select id="custState" class="form-control" onchange="window.limetreeStore.recalculateCheckoutTotals()">
                    <option value="Tamil Nadu" selected>Tamil Nadu (Intra-state CGST + SGST)</option>
                    <option value="Karnataka">Karnataka (Inter-state IGST)</option>
                    <option value="Maharashtra">Maharashtra (Inter-state IGST)</option>
                    <option value="Delhi">Delhi (Inter-state IGST)</option>
                    <option value="Telangana">Telangana (Inter-state IGST)</option>
                    <option value="Kerala">Kerala (Inter-state IGST)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Postal / PIN Code *</label>
                  <input type="text" id="custPin" class="form-control" required value="641018" />
                </div>
                <div class="form-group">
                  <label class="form-label">Country *</label>
                  <select id="custCountry" class="form-control" onchange="window.limetreeStore.recalculateCheckoutTotals()">
                    <option value="India" selected>India (Domestic)</option>
                    <option value="United States">United States (International Rate)</option>
                    <option value="United Kingdom">United Kingdom (International Rate)</option>
                    <option value="Singapore">Singapore (International Rate)</option>
                  </select>
                </div>
              </div>

              <h4 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); margin: 1.2rem 0 0.8rem 0;">
                2. Payment Method
              </h4>

              <div style="background: var(--color-bg-base); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.6rem; font-weight: 600; font-size: 0.9rem; cursor: pointer; margin-bottom: 0.6rem;">
                  <input type="radio" name="paymentOption" value="razorpay_test" checked />
                  <span>Razorpay Secure Gateway (Test &amp; Verified Mode)</span>
                </label>
                <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-left: 1.6rem; line-height: 1.45;">
                  Simulates complete live webhook flow, HMAC signature verification, UPI (GPay/PhonePe), and Debit/Credit Cards. Zero sensitive card data stored.
                </div>
              </div>

              <button type="submit" id="placeOrderSubmitBtn" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;">
                Place Order &amp; Pay
              </button>
            </form>
          </div>

          <div style="background: var(--color-bg-base); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.6rem; height: fit-content;">
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--color-primary-dark); margin-bottom: 1.2rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.6rem;">
              Order Summary
            </h4>

            <div id="checkoutItemsList" style="max-height: 230px; overflow-y: auto; margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.85rem;"></div>

            <div style="border-top: 1px solid var(--color-border); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem;">
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Bag Subtotal</span>
                <span id="chkSubtotalDisplay">₹0</span>
              </div>
              <div id="chkDiscountRow" style="display: none; justify-content: space-between; color: var(--color-success); font-weight: 600;">
                <span>Discount (<span id="chkCouponCode"></span>)</span>
                <span id="chkDiscountDisplay">-₹0</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
                <span>Delivery &amp; Shipping</span>
                <span id="chkShippingDisplay">₹0</span>
              </div>

              <div style="background: var(--color-bg-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-xs); padding: 0.7rem 0.9rem; margin: 0.4rem 0;">
                <div style="font-size: 0.74rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-sage); margin-bottom: 0.25rem;">
                  Applicable GST Breakdown
                </div>
                <div id="chkTaxDetails" style="font-size: 0.82rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 0.2rem;"></div>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; color: var(--color-primary-dark); padding-top: 0.7rem; border-top: 2px solid var(--color-border);">
                <span>Total Payable</span>
                <span id="chkGrandTotalDisplay">₹0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  recalculateCheckoutTotals() {
    const cart = this.storage.getCart();
    const itemsListEl = document.getElementById('checkoutItemsList');
    if (!itemsListEl) return;

    itemsListEl.innerHTML = cart.map(item => `
      <div style="display: flex; gap: 0.8rem; align-items: center; font-size: 0.86rem;">
        <img src="${item.image}" style="width: 46px; height: 46px; object-fit: cover; border-radius: var(--radius-xs);" />
        <div style="flex: 1;">
          <div style="font-weight: 600; line-height: 1.25;">${item.productName}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${item.variantLabel} × ${item.quantity}</div>
        </div>
        <div style="font-weight: 700; color: var(--color-primary-dark);">₹${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const settings = this.storage.getSettings();

    let discount = 0;
    if (this.appliedCoupon) {
      if (this.appliedCoupon.discountPct > 0) {
        discount = (subtotal * this.appliedCoupon.discountPct) / 100;
      }
    }

    const country = document.getElementById('custCountry')?.value || 'India';
    let shipping = 0;
    if (country === 'India') {
      if (this.appliedCoupon?.freeShipping || subtotal >= (settings.freeShippingThreshold || 999)) {
        shipping = 0;
      } else {
        shipping = settings.standardShippingRate || 49;
      }
    } else {
      shipping = settings.internationalFlatRate || 799;
    }

    const state = document.getElementById('custState')?.value || 'Tamil Nadu';
    const isIntraState = state.toLowerCase() === (settings.registeredState || 'tamil nadu').toLowerCase();

    let totalTax = 0;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    cart.forEach(item => {
      const itemNet = (item.price * item.quantity) - ((discount / (subtotal || 1)) * (item.price * item.quantity));
      const rate = item.gstRate || 18;
      const taxAmt = (itemNet * rate) / 100;
      totalTax += taxAmt;

      if (isIntraState) {
        cgst += taxAmt / 2;
        sgst += taxAmt / 2;
      } else {
        igst += taxAmt;
      }
    });

    const grandTotal = subtotal - discount + shipping + totalTax;

    document.getElementById('chkSubtotalDisplay').textContent = `₹${subtotal.toFixed(2)}`;
    const discountRow = document.getElementById('chkDiscountRow');
    if (discount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('chkCouponCode').textContent = this.appliedCoupon.code;
      document.getElementById('chkDiscountDisplay').textContent = `-₹${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }

    document.getElementById('chkShippingDisplay').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;

    const taxDetailsEl = document.getElementById('chkTaxDetails');
    if (isIntraState) {
      taxDetailsEl.innerHTML = `
        <div style="display:flex; justify-content:space-between;"><span>CGST (Intra-state):</span> <span>₹${cgst.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>SGST (Intra-state):</span> <span>₹${sgst.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; font-weight:600; color:var(--color-primary);"><span>Total GST:</span> <span>₹${totalTax.toFixed(2)}</span></div>
      `;
    } else {
      taxDetailsEl.innerHTML = `
        <div style="display:flex; justify-content:space-between;"><span>IGST (Inter-state):</span> <span>₹${igst.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; font-weight:600; color:var(--color-primary);"><span>Total GST:</span> <span>₹${totalTax.toFixed(2)}</span></div>
      `;
    }

    document.getElementById('chkGrandTotalDisplay').textContent = `₹${grandTotal.toFixed(2)}`;

    this.latestCheckoutCalc = {
      subtotal,
      discount,
      shipping,
      totalTax,
      cgst,
      sgst,
      igst,
      grandTotal,
      isIntraState
    };
  }

  submitOrder(event) {
    event.preventDefault();
    const btn = document.getElementById('placeOrderSubmitBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Processing Payment Verification...';
    }

    const customer = {
      name: document.getElementById('custName').value.trim(),
      email: document.getElementById('custEmail').value.trim(),
      phone: document.getElementById('custPhone').value.trim(),
      address: document.getElementById('custAddress').value.trim(),
      city: document.getElementById('custCity').value.trim(),
      state: document.getElementById('custState').value,
      postalCode: document.getElementById('custPin').value.trim(),
      country: document.getElementById('custCountry').value
    };

    const calc = this.latestCheckoutCalc;
    const cart = this.storage.getCart();

    const orderPayload = {
      customer,
      items: cart,
      subtotal: calc.subtotal,
      discountAmount: calc.discount,
      couponApplied: this.appliedCoupon ? this.appliedCoupon.code : null,
      shippingCharge: calc.shipping,
      shippingMethod: calc.shipping === 0 ? 'Free Express Delivery' : 'Standard Courier Delivery',
      taxBreakdown: {
        cgst: calc.cgst,
        sgst: calc.sgst,
        igst: calc.igst,
        totalTax: calc.totalTax
      },
      totalAmount: calc.grandTotal,
      paymentStatus: 'Paid',
      paymentMethod: 'Razorpay Test Gateway (Signature Verified)'
    };

    setTimeout(() => {
      try {
        const order = this.storage.createOrder(orderPayload);
        this.closeModal();
        this.showToast(`Order ${order.orderId} placed successfully!`, 'success');
        this.openOrderConfirmationModal(order);
      } catch (err) {
        this.showToast(err.message, 'error');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Place Order & Pay';
        }
      }
    }, 1100);
  }

  openOrderConfirmationModal(order) {
    const modal = document.getElementById('checkoutModal');
    const body = document.getElementById('checkoutModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="padding: 3.5rem 2.2rem; text-align: center;">
        <div style="font-size: 3.8rem; color: var(--color-success); margin-bottom: 1rem;">✓</div>
        <h2 style="font-family: var(--font-heading); font-size: 2.1rem; color: var(--color-primary-dark); margin-bottom: 0.5rem;">
          Thank You for Shopping with Limetree!
        </h2>
        <p style="font-size: 1.02rem; color: var(--color-text-muted); max-width: 540px; margin: 0 auto 1.6rem auto;">
          Your order has been confirmed and verified. We have sent an email confirmation to <strong>${order.customer.email}</strong>.
        </p>

        <div style="background: var(--color-bg-base); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.6rem; max-width: 490px; margin: 0 auto 2.2rem auto; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;">
            <span style="font-size: 0.88rem; color: var(--color-text-muted);">Order Number:</span>
            <span style="font-weight: 700; color: var(--color-primary);">${order.orderId}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;">
            <span style="font-size: 0.88rem; color: var(--color-text-muted);">Tax Invoice Number:</span>
            <span style="font-weight: 600;">${order.invoiceNumber}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;">
            <span style="font-size: 0.88rem; color: var(--color-text-muted);">Amount Paid:</span>
            <span style="font-weight: 700; color: var(--color-primary-dark);">₹${order.totalAmount.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 0.88rem; color: var(--color-text-muted);">Estimated Delivery:</span>
            <span style="font-weight: 600; color: var(--color-success);">Within 3-5 Business Days</span>
          </div>

          <div style="border-top: 1px solid var(--color-border); margin-top: 1rem; padding-top: 1rem;">
            <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin-bottom: 0.65rem;">
              Items In This Order (${order.items.length})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${(order.items || []).map(i => `
                <div style="display: flex; align-items: center; gap: 0.8rem; background: #FFFFFF; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid var(--color-border);">
                  <img src="${i.image}" alt="${i.productName}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;" />
                  <div style="flex: 1; text-align: left;">
                    <div style="font-weight: 600; font-size: 0.86rem; color: var(--color-primary-dark); line-height: 1.2;">${i.productName}</div>
                    <div style="font-size: 0.76rem; color: var(--color-text-muted);">${i.variantLabel} · Qty: ${i.quantity} &times; ₹${i.price}</div>
                  </div>
                  <div style="font-weight: 700; font-size: 0.92rem; color: var(--color-primary);">₹${(i.price * i.quantity).toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="window.limetreeStore.openPrintableInvoice('${order.orderId}')">
            📄 View &amp; Print Official GST Tax Invoice
          </button>
          <a href="orders.html?orderId=${order.orderId}" class="btn btn-secondary">
            📦 Track Shipment in Order History
          </a>
          <button class="btn btn-secondary" onclick="window.limetreeStore.closeModal()">
            Continue Shopping
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  openPrintableInvoice(orderId) {
    const order = this.storage.getOrderById(orderId);
    if (!order) return;

    const settings = this.storage.getSettings();
    const invoiceModal = document.getElementById('invoiceModal');
    const invoiceBody = document.getElementById('invoiceModalBody');
    if (!invoiceModal || !invoiceBody) return;

    invoiceBody.innerHTML = `
      <div id="printableInvoice" style="padding: 2.8rem; background: #FFFFFF; color: #30351F; font-family: var(--font-body); font-size: 0.88rem; line-height: 1.5;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #365314; padding-bottom: 1.3rem; margin-bottom: 1.6rem;">
          <div>
            <h1 style="font-family: var(--font-heading); font-size: 2.2rem; color: #365314; font-weight: 700; margin-bottom: 0.2rem;">LIMETREE</h1>
            <div style="font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #6B8E23;">Multi-Business Lifestyle Collective</div>
            <div style="font-size: 0.82rem; color: #565E3C; margin-top: 0.4rem; max-width: 330px;">
              ${settings.registeredAddress}<br/>
              <strong>GSTIN:</strong> ${settings.gstin} · <strong>State Code:</strong> ${settings.stateCode}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.5rem; font-weight: 700; color: #365314;">TAX INVOICE</div>
            <div style="margin-top: 0.4rem;"><strong>Invoice No:</strong> ${order.invoiceNumber}</div>
            <div><strong>Order ID:</strong> ${order.orderId}</div>
            <div><strong>Date:</strong> ${new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div><strong>Place of Supply:</strong> ${order.customer.state}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.6rem; background: #FFFDF4; border: 1px solid #DDE7B7; padding: 1.3rem; border-radius: 6px;">
          <div>
            <div style="font-weight: 700; text-transform: uppercase; font-size: 0.78rem; color: #365314; margin-bottom: 0.3rem;">Billed To / Consignee:</div>
            <div><strong>${order.customer.name}</strong></div>
            <div>${order.customer.address}</div>
            <div>${order.customer.city}, ${order.customer.state} - ${order.customer.postalCode}</div>
            <div>${order.customer.country}</div>
            <div>Phone: ${order.customer.phone} | Email: ${order.customer.email}</div>
          </div>
          <div>
            <div style="font-weight: 700; text-transform: uppercase; font-size: 0.78rem; color: #365314; margin-bottom: 0.3rem;">Logistics &amp; Payment:</div>
            <div><strong>Carrier:</strong> ${order.carrier}</div>
            <div><strong>Tracking AWB:</strong> ${order.trackingNumber}</div>
            <div><strong>Payment Mode:</strong> ${order.paymentMethod}</div>
            <div><strong>Transaction Ref:</strong> ${order.paymentTransactionId}</div>
            <div><strong>Payment Status:</strong> Paid (Signature Verified)</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.6rem;">
          <thead>
            <tr style="background: #EDF3D8; color: #365314; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.04em;">
              <th style="padding: 0.65rem 0.8rem; text-align: left; border: 1px solid #DDE7B7;">Item Description</th>
              <th style="padding: 0.65rem 0.8rem; text-align: center; border: 1px solid #DDE7B7;">HSN/SAC</th>
              <th style="padding: 0.65rem 0.8rem; text-align: center; border: 1px solid #DDE7B7;">Qty</th>
              <th style="padding: 0.65rem 0.8rem; text-align: right; border: 1px solid #DDE7B7;">Unit Rate (₹)</th>
              <th style="padding: 0.65rem 0.8rem; text-align: right; border: 1px solid #DDE7B7;">Taxable Val (₹)</th>
              <th style="padding: 0.65rem 0.8rem; text-align: center; border: 1px solid #DDE7B7;">GST Rate</th>
              <th style="padding: 0.65rem 0.8rem; text-align: right; border: 1px solid #DDE7B7;">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(i => `
              <tr style="border-bottom: 1px solid #DDE7B7;">
                <td style="padding: 0.8rem; border: 1px solid #DDE7B7;">
                  <strong>${i.productName}</strong><br/>
                  <span style="font-size: 0.74rem; color: #565E3C;">${i.variantLabel} | SKU: ${i.sku}</span>
                </td>
                <td style="padding: 0.8rem; text-align: center; border: 1px solid #DDE7B7;">${i.hsnCode}</td>
                <td style="padding: 0.8rem; text-align: center; border: 1px solid #DDE7B7;">${i.quantity}</td>
                <td style="padding: 0.8rem; text-align: right; border: 1px solid #DDE7B7;">${i.price.toFixed(2)}</td>
                <td style="padding: 0.8rem; text-align: right; border: 1px solid #DDE7B7;">${(i.price * i.quantity).toFixed(2)}</td>
                <td style="padding: 0.8rem; text-align: center; border: 1px solid #DDE7B7;">${i.gstRate}%</td>
                <td style="padding: 0.8rem; text-align: right; border: 1px solid #DDE7B7;">${(i.price * i.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 2rem;">
          <div style="width: 330px; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span> <span>₹${order.subtotal.toFixed(2)}</span></div>
            ${order.discountAmount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: #365314;"><span>Discount (${order.couponApplied || 'Coupon'}):</span> <span>-₹${order.discountAmount.toFixed(2)}</span></div>
            ` : ''}
            <div style="display: flex; justify-content: space-between;"><span>Shipping &amp; Handling:</span> <span>${order.shippingCharge === 0 ? 'FREE' : '₹' + order.shippingCharge.toFixed(2)}</span></div>
            ${order.taxBreakdown.cgst > 0 ? `
              <div style="display: flex; justify-content: space-between;"><span>CGST:</span> <span>₹${order.taxBreakdown.cgst.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>SGST:</span> <span>₹${order.taxBreakdown.sgst.toFixed(2)}</span></div>
            ` : `
              <div style="display: flex; justify-content: space-between;"><span>IGST:</span> <span>₹${order.taxBreakdown.igst.toFixed(2)}</span></div>
            `}
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; color: #365314; border-top: 2px solid #365314; padding-top: 0.5rem; margin-top: 0.4rem;">
              <span>Total Invoice Amount:</span> <span>₹${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #DDE7B7; padding-top: 1.6rem; margin-top: 1.6rem;">
          <div style="font-size: 0.75rem; color: #565E3C; max-width: 390px;">
            This is a computer-generated tax invoice issued in accordance with GST Rules. Goods once sold are subject to Limetree 7-day verified return policy.
          </div>
          <div style="text-align: right;">
            <div style="font-family: var(--font-heading); font-size: 1.15rem; color: #365314; font-weight: 700;">For LIMETREE RETAIL</div>
            <div style="height: 45px; display: flex; align-items: center; justify-content: flex-end; font-family: cursive; font-size: 1.2rem; color: #365314;">
              Authorized Signatory
            </div>
            <div style="font-size: 0.74rem; color: #565E3C;">Authorised Signatory</div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
          <button class="btn btn-secondary" onclick="window.limetreeStore.closeModal()">Close</button>
          <button class="btn btn-primary" onclick="window.print()">🖨 Print / Save as PDF</button>
        </div>
      </div>
    `;

    invoiceModal.classList.add('active');
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span style="font-weight: 700;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (!window.limetreeStore) {
    window.limetreeStore = new LimetreeStorefront();
  }
});

if (typeof document !== 'undefined' && (document.readyState === 'complete' || document.readyState === 'interactive')) {
  if (!window.limetreeStore) {
    window.limetreeStore = new LimetreeStorefront();
  }
}
