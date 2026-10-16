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
      this.parallaxElements = [];
      this.parallaxTicking = false;
      this.init();
    }

    init() {
      this.injectBrandSplash();
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
          '.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-stagger, .product-card.reveal-card, .section-header'
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

      const selector = '.reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-stagger, .product-card.reveal-card, .section-header';
      const targets = container.querySelectorAll(selector);

      targets.forEach((el, idx) => {
        if (!el.classList.contains('is-revealed')) {
          if (el.classList.contains('reveal-card') && !el.style.getPropertyValue('--stagger-i')) {
            el.style.setProperty('--stagger-i', idx % 8);
          }
          this.revealObserver.observe(el);
        }
      });
    }

    // ==================== SUBTLE SCROLL PARALLAX ====================
    initScrollParallax() {
      if (prefersReducedMotion || window.innerWidth < 768) return;

      const elements = document.querySelectorAll(
        '.hero-main-img, .editorial-showcase-img, [data-parallax]'
      );
      if (elements.length === 0) return;

      this.parallaxElements = Array.from(elements);

      const updateParallax = () => {
        const winHeight = window.innerHeight;
        this.parallaxElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > -50 && rect.top < winHeight + 50) {
            // Normalized progress from 0 (bottom of viewport) to 1 (top of viewport)
            const progress = (winHeight - rect.top) / (winHeight + rect.height);
            // Gentle shift between -16px and +16px
            const offset = (progress - 0.5) * 32;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          }
        });
        this.parallaxTicking = false;
      };

      window.addEventListener('scroll', () => {
        if (!this.parallaxTicking) {
          window.requestAnimationFrame(updateParallax);
          this.parallaxTicking = true;
        }
      }, { passive: true });

      // Run once on load
      window.requestAnimationFrame(updateParallax);
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
        setTimeout(() => this.observeElements(), 50);
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
        const drawerLink = e.target.closest('.drawer-menu-item a, .drawer-back-action');
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
                <span>All Houses (Home)</span>
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
              </a>
            </li>
            <li class="drawer-menu-item">
              <a href="#" onclick="if(window.limetreeStore){window.limetreeStore.openCart();}return false;">
                <span class="drawer-menu-icon">🛍️</span>
                <span>Shopping Bag</span>
              </a>
            </li>
          </ul>
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
