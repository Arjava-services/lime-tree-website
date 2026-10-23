/**
 * LIMETREE - Premium Cinematic Interaction & Animation Engine
 * Pure Vanilla JavaScript (ES6+).
 * 
 * Capabilities:
 * 1. IntersectionObserver scroll reveals with heading-first orchestration.
 * 2. Staggered sequence reveal for product grids and catalog updates.
 * 3. Hardware-accelerated passive scroll parallax for hero & showcase visuals.
 * 4. Sticky storytelling for artisan craft showcases (non-blocking).
 * 5. Smooth brand transitions and micro-interactions.
 * 6. Accessibility & prefers-reduced-motion compliance.
 */

(function () {
  'use strict';

  // Check user motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class LimetreeAnimations {
    constructor() {
      this.revealObserver = null;
      this.parallaxObserver = null;
      this.parallaxElements = [];
      this.visibleElements = new Set();
      this.parallaxTicking = false;
      this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      this.init();
    }

    init() {
      this.injectProgressBar();
      this.initPageEntrance();
      this.initScrollReveal();
      this.initScrollParallax();
      this.initHeaderScroll();
      this.initHeroParallax();
      this.initStickyStorytelling();
      this.initPageTransitions();
      this.initDynamicObserver();
      this.initMobileMenu();
      this.initModalBackButton();
    }

    // ==================== 1-SECOND LUXURY BRAND SPLASH (FIRST VISIT ONLY) ====================
    injectBrandSplash() {
      // Check if website was already opened in this session
      try {
        if (sessionStorage.getItem('limetree_site_opened')) {
          return;
        }
      } catch (e) {
        // Fallback if sessionStorage is restricted
      }

      // Only show on home page entry, never on individual subpages
      const currentPath = (window.location.pathname || '').toLowerCase();
      const isHome = currentPath === '' || currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/index') || !currentPath.includes('.html');
      if (!isHome) {
        return;
      }

      // Mark as opened so it NEVER shows again when navigating between pages
      try {
        sessionStorage.setItem('limetree_site_opened', 'true');
      } catch (e) {}

      if (document.getElementById('limetreeBrandSplash')) return;

      const createSplash = () => {
        if (!document.body || document.getElementById('limetreeBrandSplash')) return;
        const splash = document.createElement('div');
        splash.id = 'limetreeBrandSplash';
        splash.className = 'brand-splash-overlay';
        splash.setAttribute('role', 'dialog');
        splash.setAttribute('aria-label', 'LIMETREE Entrance');
        splash.innerHTML = `
          <div class="brand-splash-card">
            <img src="assets/logo-transparent.png" alt="LIMETREE - Three Brands One Destination" class="brand-splash-logo-img" />
            <div class="brand-splash-progress-track">
              <div class="brand-splash-progress-bar"></div>
            </div>
            <div class="brand-splash-subtitle">Lifestyle Collective · Three Brands · One Destination</div>
          </div>
        `;

        const dismiss = () => {
          splash.classList.add('fade-out');
          setTimeout(() => {
            if (splash.parentNode) splash.remove();
          }, 380);
        };

        splash.addEventListener('click', dismiss);
        splash.addEventListener('touchstart', dismiss, { passive: true });

        document.body.prepend(splash);
        // Stays for 1 second, then smoothly unveils the page
        setTimeout(dismiss, 1000);
      };

      if (document.body) {
        createSplash();
      } else {
        document.addEventListener('DOMContentLoaded', createSplash);
      }
    }

    // ==================== TOP NAVIGATION PROGRESS BAR ====================
    injectProgressBar() {
      if (!document.getElementById('pageTransitionBar')) {
        const bar = document.createElement('div');
        bar.id = 'pageTransitionBar';
        document.body.appendChild(bar);
      }
    }

    startPageTransition() {
      const bar = document.getElementById('pageTransitionBar');
      if (bar) {
        bar.classList.remove('finished');
        bar.classList.add('active');
      }
    }

    finishPageTransition() {
      const bar = document.getElementById('pageTransitionBar');
      if (bar) {
        bar.classList.remove('active');
        bar.classList.add('finished');
        setTimeout(() => {
          bar.classList.remove('finished');
        }, 300);
      }
    }

    initPageEntrance() {
      document.body.classList.add('page-loaded');
      this.finishPageTransition();
    }

    // ==================== CINEMATIC SCROLL REVEAL (IntersectionObserver) ====================
    initScrollReveal() {
      if (prefersReducedMotion) {
        document.querySelectorAll(
          '.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-stagger, .product-card, .section-header, .video-showcase-container, .newsletter-section, .site-footer, .order-card'
        ).forEach(el => el.classList.add('is-revealed'));
        return;
      }

      document.body.classList.add('scroll-animate-ready');

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      };

      this.revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;

            // Handle Stagger Sequence Container
            if (target.classList.contains('reveal-stagger')) {
              Array.from(target.children).forEach((child, idx) => {
                if (!child.style.getPropertyValue('--stagger-i')) {
                  child.style.setProperty('--stagger-i', idx % 12);
                }
              });
            }

            // Reveal and unobserve so animation never replays unnecessarily
            target.classList.add('is-revealed');
            observer.unobserve(target);
          }
        });
      }, observerOptions);

      this.observeElements();
    }

    observeElements(container = document) {
      if (!this.revealObserver) return;

      const selector = '.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-stagger, .product-card, .section-header, .video-showcase-container, .newsletter-section, .site-footer, .order-card';
      const targets = container.querySelectorAll(selector);

      targets.forEach((el, idx) => {
        if (!el.classList.contains('is-revealed')) {
          if (el.classList.contains('product-card') && !el.style.getPropertyValue('--stagger-i')) {
            el.style.setProperty('--stagger-i', idx % 8);
          }
          if (
            !el.classList.contains('reveal-fade') &&
            !el.classList.contains('reveal-slide-up') &&
            !el.classList.contains('reveal-slide-left') &&
            !el.classList.contains('reveal-slide-right') &&
            !el.classList.contains('reveal-scale') &&
            !el.classList.contains('reveal-stagger')
          ) {
            el.classList.add('reveal-slide-up');
          }
          this.revealObserver.observe(el);
        }
      });
    }

    // ==================== PREMIUM UNIVERSAL SCROLL & HOVER PARALLAX ENGINE ====================
    initScrollParallax() {
      if (prefersReducedMotion) return;

      // IntersectionObserver: Track elements entering/leaving near-viewport margin
      // This guarantees zero overhead on off-screen elements for 60/120fps fluid scrolling
      this.parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.visibleElements.add(entry.target);
          } else {
            this.visibleElements.delete(entry.target);
          }
        });
        this.requestParallaxUpdate();
      }, {
        root: null,
        rootMargin: '120px 0px 120px 0px',
        threshold: 0
      });

      // Passive scroll listener with requestAnimationFrame debounce
      window.addEventListener('scroll', () => {
        this.requestParallaxUpdate();
      }, { passive: true });

      // Resize listener to recalculate bounds
      window.addEventListener('resize', () => {
        this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
        this.requestParallaxUpdate();
      }, { passive: true });

      // Initial discovery of parallax elements on page load
      this.refreshParallax();
    }

    requestParallaxUpdate() {
      if (prefersReducedMotion || this.parallaxTicking) return;
      this.parallaxTicking = true;
      window.requestAnimationFrame(() => this.updateParallax());
    }

    refreshParallax() {
      if (prefersReducedMotion || !this.parallaxObserver) return;

      // 1. Decorative background elements across all pages
      const decoSelector = '[data-parallax], .nature-leaf-corner, .card-arch-img, .card-badge-circle, .brand-parallax-deco, .nature-hero-logo-art, .video-parallax';
      document.querySelectorAll(decoSelector).forEach(el => {
        this.parallaxObserver.observe(el);
      });

      // 2. Homepage brand cards (arch portals & floating badges)
      document.querySelectorAll('.nature-brand-card').forEach(card => {
        this.parallaxObserver.observe(card);
        this.bindHomepageBrandCardHover(card);
      });

      // 3. All brand product cards (Riyaa Trends clothing, Glow Home candles, Earkart jewellery)
      document.querySelectorAll('.product-card').forEach(card => {
        this.parallaxObserver.observe(card);
        this.bindProductCardHover(card);
      });

      // 4. Modal detail gallery (if open)
      this.bindModalParallax();

      // Trigger one layout update frame
      this.requestParallaxUpdate();
    }

    // Desktop hover parallax on product cards across all 3 brands
    bindProductCardHover(card) {
      if (this.isTouch || prefersReducedMotion) return;
      if (card._hasParallaxHoverBound) return;
      card._hasParallaxHoverBound = true;

      const img = card.querySelector('.product-image-container img');
      if (!img) return;

      let isHovering = false;
      let hoverTicking = false;

      const onMouseMove = (e) => {
        if (!isHovering) isHovering = true;
        if (hoverTicking) return;
        hoverTicking = true;

        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            hoverTicking = false;
            return;
          }
          // Normalized relative offset from card center (-0.5 to +0.5)
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          // Subtle, elegant movement (+/- 4px to +/- 5px max)
          const hx = (relX * 9).toFixed(1);
          const hy = (relY * 9).toFixed(1);

          img.style.setProperty('--hover-x', `${hx}px`);
          img.style.setProperty('--hover-y', `${hy}px`);
          hoverTicking = false;
        });
      };

      const onMouseLeave = () => {
        isHovering = false;
        hoverTicking = false;
        img.style.setProperty('--hover-x', '0px');
        img.style.setProperty('--hover-y', '0px');
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    // Desktop hover parallax on homepage brand arch portals & badges
    bindHomepageBrandCardHover(card) {
      if (this.isTouch || prefersReducedMotion) return;
      if (card._hasParallaxHoverBound) return;
      card._hasParallaxHoverBound = true;

      const archImg = card.querySelector('.card-arch-img');
      const badge = card.querySelector('.card-badge-circle');
      if (!archImg && !badge) return;

      let hoverTicking = false;

      const onMouseMove = (e) => {
        if (hoverTicking) return;
        hoverTicking = true;

        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            hoverTicking = false;
            return;
          }
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          if (archImg) {
            archImg.style.setProperty('--arch-hover-x', `${(relX * 8).toFixed(1)}px`);
            archImg.style.setProperty('--arch-hover-y', `${(relY * 8).toFixed(1)}px`);
          }
          if (badge) {
            badge.style.setProperty('--badge-hover-x', `${(relX * 6).toFixed(1)}px`);
            badge.style.setProperty('--badge-hover-y', `${(relY * 6).toFixed(1)}px`);
          }
          hoverTicking = false;
        });
      };

      const onMouseLeave = () => {
        hoverTicking = false;
        if (archImg) {
          archImg.style.setProperty('--arch-hover-x', '0px');
          archImg.style.setProperty('--arch-hover-y', '0px');
        }
        if (badge) {
          badge.style.setProperty('--badge-hover-x', '0px');
          badge.style.setProperty('--badge-hover-y', '0px');
        }
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }

    // Modal product detail image parallax & tactile cursor tracking
    bindModalParallax() {
      if (prefersReducedMotion) return;
      const modalImg = document.getElementById('modalMainImg');
      if (!modalImg) return;
      const modalWrap = modalImg.closest('.modal-gallery-wrap') || modalImg.parentElement;
      if (!modalWrap || modalWrap._hasParallaxHoverBound) return;
      modalWrap._hasParallaxHoverBound = true;

      if (!this.isTouch) {
        let hoverTicking = false;
        modalWrap.addEventListener('mousemove', (e) => {
          if (hoverTicking) return;
          hoverTicking = true;
          window.requestAnimationFrame(() => {
            const rect = modalWrap.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
              hoverTicking = false;
              return;
            }
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            modalImg.style.setProperty('--hover-x', `${(relX * 10).toFixed(1)}px`);
            modalImg.style.setProperty('--hover-y', `${(relY * 10).toFixed(1)}px`);
            hoverTicking = false;
          });
        }, { passive: true });

        modalWrap.addEventListener('mouseleave', () => {
          hoverTicking = false;
          modalImg.style.setProperty('--hover-x', '0px');
          modalImg.style.setProperty('--hover-y', '0px');
        }, { passive: true });
      }
    }

    // Ultra-smooth, hardware-accelerated scroll update loop
    updateParallax() {
      if (prefersReducedMotion || window.innerWidth < 768) {
        this.parallaxTicking = false;
        return;
      }

      const winHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      this.visibleElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Skip elements completely off-screen
        if (rect.bottom < -60 || rect.top > winHeight + 60) return;

        // Progress: 0 when top is at bottom of viewport, 1 when bottom is at top of viewport
        const progress = (winHeight - rect.top) / (winHeight + rect.height);
        const centered = progress - 0.5; // -0.5 (bottom entrance) to +0.5 (top exit)

        // 1. Product cards (Riyaa Trends, Glow Home, Earkart)
        if (el.classList.contains('product-card')) {
          const img = el.querySelector('.product-image-container img');
          if (img) {
            // Gentle travel without distorting crop or layout: +/-11px on desktop, +/-5px on mobile
            const maxTravel = isMobile ? -10 : -22;
            const offsetY = (centered * maxTravel).toFixed(1);
            img.style.setProperty('--parallax-y', `${offsetY}px`);
          }
          return;
        }

        // 2. Homepage brand cards
        if (el.classList.contains('nature-brand-card')) {
          const archImg = el.querySelector('.card-arch-img');
          const badge = el.querySelector('.card-badge-circle');
          if (archImg) {
            const archOffset = (centered * (isMobile ? -8 : -16)).toFixed(1);
            archImg.style.setProperty('--arch-scroll-y', `${archOffset}px`);
          }
          if (badge) {
            const badgeOffset = (centered * (isMobile ? 8 : 16)).toFixed(1);
            badge.style.setProperty('--parallax-y', `${badgeOffset}px`);
          }
          return;
        }

        // 3. Decorative background elements ([data-parallax], leaves, etc.)
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || -0.15;
        // Travel range tailored to speed factor: desktop ~ 60px max, mobile ~ 28px max
        const baseTravel = isMobile ? 32 : 64;
        const offsetY = (centered * baseTravel * speed).toFixed(1);
        el.style.setProperty('--parallax-y', `${offsetY}px`);
      });

      this.parallaxTicking = false;
    }

    // ==================== STICKY STORYTELLING ENGINE ====================
    initStickyStorytelling() {
      const steps = document.querySelectorAll('.sticky-story-step');
      if (steps.length === 0 || prefersReducedMotion) return;

      const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            steps.forEach(s => s.classList.remove('active'));
            entry.target.classList.add('active');
          }
        });
      }, {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.2
      });

      steps.forEach(step => storyObserver.observe(step));
    }

    // ==================== STICKY HEADER ELEVATION ====================
    initHeaderScroll() {
      const header = document.querySelector('.site-header');
      if (!header) return;

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (window.scrollY > 20) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // ==================== 3D TILT FOR FLOATING HERO CARDS ====================
    initHeroParallax() {
      if (prefersReducedMotion || window.innerWidth < 992) return;

      const hero = document.querySelector('.hero-section');
      const floatingCard = document.querySelector('.hero-floating-card');
      if (!hero || !floatingCard) return;

      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = (y / (rect.height / 2)) * -5;
        const tiltY = (x / (rect.width / 2)) * 5;
        floatingCard.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      });

      hero.addEventListener('mouseleave', () => {
        floatingCard.style.transform = '';
      });
    }

    // ==================== BRAND PAGE NAVIGATION TRANSITIONS ====================
    initPageTransitions() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Internal html navigation
        if (href.endsWith('.html') && !href.startsWith('http') && !link.target && !e.ctrlKey && !e.metaKey) {
          this.startPageTransition();
        }
      });
    }

    // ==================== DYNAMIC CATALOG OBSERVER ====================
    initDynamicObserver() {
      window.addEventListener('limetree:products-updated', () => {
        setTimeout(() => {
          this.observeElements();
          this.refreshParallax();
        }, 50);
      });
    }

    // ==================== MOBILE MENU & DRAWER NAVIGATION ====================
    initMobileMenu() {
      // Ensure drawer markup exists in DOM if not already present
      this.ensureMobileNavDrawer();

      // Open drawer on toggle click
      document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#mobileMenuToggleBtn');
        if (toggleBtn) {
          e.preventDefault();
          this.openMobileMenu();
          return;
        }

        const closeBtn = e.target.closest('#mobileNavDrawerCloseBtn') || e.target.closest('#mobileNavDrawerOverlay');
        if (closeBtn) {
          e.preventDefault();
          this.closeMobileMenu();
          return;
        }

        // Close on clicking any link inside drawer (smooth navigation)
        const drawerLink = e.target.closest('#mobileNavDrawer a, .drawer-menu-item a, .drawer-back-action, .drawer-logo');
        if (drawerLink) {
          this.closeMobileMenu();
        }
      });

      // Escape key to close drawer
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
    }

    ensureMobileNavDrawer() {
      if (document.getElementById('mobileNavDrawer')) return;

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const isSubpage = currentPage !== 'index.html' && currentPage !== '';

      const overlay = document.createElement('div');
      overlay.id = 'mobileNavDrawerOverlay';
      overlay.className = 'mobile-nav-drawer-overlay';

      const drawer = document.createElement('aside');
      drawer.id = 'mobileNavDrawer';
      drawer.className = 'mobile-nav-drawer';
      drawer.setAttribute('aria-label', 'Mobile Navigation Drawer');

      drawer.innerHTML = `
        <div class="drawer-header">
          <a href="index.html" class="drawer-logo" aria-label="Limetree Home">
            <img src="assets/logo-transparent.png" alt="LIMETREE" style="height: 48px; width: auto;" />
          </a>
          <button class="drawer-close-btn" id="mobileNavDrawerCloseBtn" aria-label="Close Navigation Menu">&times;</button>
        </div>
        <div class="drawer-body">
          ${isSubpage ? `
            <a href="index.html" class="drawer-back-action">
              <span style="font-size: 1.15rem;">&larr;</span>
              <span>Back to Main Store (Home)</span>
            </a>
          ` : ''}

          <div class="drawer-section-heading">Browse Collective</div>
          <ul class="drawer-menu-list">
            <li class="drawer-menu-item">
              <a href="index.html" class="${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">
                <span class="drawer-menu-icon">🏠</span>
                <span>Home</span>
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="riyaa-trends.html" class="${currentPage === 'riyaa-trends.html' ? 'active' : ''}">
                <span class="drawer-menu-icon">👗</span>
                <span>Riyaa Trends (Fashion)</span>
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="glow-home.html" class="${currentPage === 'glow-home.html' ? 'active' : ''}">
                <span class="drawer-menu-icon">🕯️</span>
                <span>Glow Home (Candles)</span>
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="earkart.html" class="${currentPage === 'earkart.html' ? 'active' : ''}">
                <span class="drawer-menu-icon">✨</span>
                <span>Earkart (Jewellery)</span>
              </a>
            </li>
          </ul>

          <div class="drawer-section-heading">Customer Concierge</div>
          <ul class="drawer-menu-list">
            <li class="drawer-menu-item">
              <a href="orders.html" class="${currentPage === 'orders.html' ? 'active' : ''}">
                <span class="drawer-menu-icon">📦</span>
                <span>My Orders &amp; Purchase History</span>
                <span class="drawer-badge" id="drawerOrdersBadge" style="display: none;">0</span>
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="#" onclick="if(window.limetreeStore){window.limetreeStore.showToast('Select a brand to explore saved wishlist items.', 'info');}return false;">
                <span class="drawer-menu-icon">🤍</span>
                <span>Saved Wishlist</span>
                <span class="drawer-badge" id="drawerWishlistBadge" style="display: none;">0</span>
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="#" onclick="if(window.limetreeStore){window.limetreeStore.openCart();}return false;">
                <span class="drawer-menu-icon">🛍️</span>
                <span>Shopping Bag (Cart)</span>
                <span class="drawer-badge" id="drawerCartBadge" style="display: none;">0</span>
              </a>
            </li>
          </ul>

          <div class="drawer-helpline-card">
            <div class="drawer-helpline-title">📞 Customer Care Helpline</div>
            <div class="drawer-helpline-desc">Available Mon – Sat, 9:00 AM – 8:00 PM IST</div>
            <div class="drawer-helpline-buttons">
              <a href="tel:+918049201800" class="btn btn-primary btn-sm drawer-call-btn">
                📞 Call +91 80 4920 1800
              </a>
              <a href="https://wa.me/919876543210?text=Hello%20Limetree%20Concierge,%20I%20need%20assistance%20with%20my%20order." target="_blank" rel="noopener" class="btn btn-secondary btn-sm drawer-wa-btn">
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: 0.25rem;">LIMETREE Collective</div>
          <div>7-Day Easy Returns · Free Shipping above ₹999</div>
        </div>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(drawer);
    }

    openMobileMenu() {
      const drawer = document.getElementById('mobileNavDrawer');
      const overlay = document.getElementById('mobileNavDrawerOverlay');
      if (!drawer || !overlay) return;

      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      try {
        window.history.pushState({ limetreeDrawerOpen: true }, '');
      } catch (e) {}
    }

    closeMobileMenu() {
      const drawer = document.getElementById('mobileNavDrawer');
      const overlay = document.getElementById('mobileNavDrawerOverlay');
      if (drawer) drawer.classList.remove('active');
      if (overlay) overlay.classList.remove('active');

      const quickView = document.getElementById('quickViewModal');
      const cart = document.getElementById('cartDrawer');
      if ((!quickView || !quickView.classList.contains('active')) && (!cart || !cart.classList.contains('active'))) {
        document.body.style.overflow = '';
      }
    }

    // ==================== PHONE & DESKTOP BACK BUTTON INTEGRATION ====================
    initModalBackButton() {
      window.addEventListener('popstate', (e) => {
        // If mobile nav drawer is open, close it
        const drawer = document.getElementById('mobileNavDrawer');
        if (drawer && drawer.classList.contains('active')) {
          this.closeMobileMenu();
          return;
        }

        // If product quick view is open, close it
        const quickView = document.getElementById('quickViewModal');
        if (quickView && quickView.classList.contains('active')) {
          if (window.limetreeStore) window.limetreeStore.closeModal();
          else {
            quickView.classList.remove('active');
            document.body.style.overflow = '';
          }
          return;
        }

        // If cart drawer is open, close it
        const cart = document.getElementById('cartDrawer');
        if (cart && cart.classList.contains('active')) {
          if (window.limetreeStore) window.limetreeStore.closeCart();
          else {
            cart.classList.remove('active');
            const overlay = document.getElementById('cartOverlay');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
          }
          return;
        }
      });
    }

    // Button micro-interaction trigger
    pulseButton(btn) {
      if (!btn) return;
      btn.classList.add('btn-pulse');
      setTimeout(() => btn.classList.remove('btn-pulse'), 450);
    }

    // Wishlist heart pop trigger
    popHeart(heartBtn) {
      if (!heartBtn) return;
      heartBtn.classList.add('heart-pop');
      setTimeout(() => heartBtn.classList.remove('heart-pop'), 450);
    }
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.limetreeAnimations = new LimetreeAnimations();
    });
  } else {
    window.limetreeAnimations = new LimetreeAnimations();
  }
})();
