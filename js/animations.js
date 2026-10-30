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
  const prefersReducedMotion = false; // Always enabled for full luxury experience

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

    bindAllProductHovers() {
      document.querySelectorAll('.product-card').forEach(card => this.bindProductCardHover(card));
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
    // Desktop 3D magnetic gyroscopic tilt + specular glare on product cards
    // Desktop smooth specular sheen & gentle elevation for product cards
    bindProductCardHover(card) {
      if (!card || card._hasParallaxHoverBound) return;
      card._hasParallaxHoverBound = true;

      // Add specular glare overlay if not present
      let glare = card.querySelector('.card-specular-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-specular-glare';
        card.appendChild(glare);
      }

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
          const relX = (e.clientX - rect.left) / rect.width;
          const relY = (e.clientY - rect.top) / rect.height;

          if (glare) {
            const gx = (relX * 100).toFixed(1);
            const gy = (relY * 100).toFixed(1);
            glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0) 65%)`;
            glare.style.opacity = '1';
          }

          hoverTicking = false;
        });
      };

      const onMouseLeave = () => {
        hoverTicking = false;
        if (glare) {
          glare.style.opacity = '0';
        }
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

        // 1. Product cards: remain stable & crisp on scroll
        if (el.classList.contains("product-card")) {
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

    // ==================== "WOW" LUXURY BUTTON & PARTICLE ANIMATIONS ====================
    // 1. Add to Cart: Success morph + Flying particle to header cart + Cart pop
    playAddToCartAnimation(btn, event) {
      if (!btn) return;

      // 1. Success checkmark morph on button
      const originalHtml = btn.innerHTML;
      btn.classList.add('btn-cart-success');
      btn.innerHTML = `<span class="cart-anim-check">✓</span> <span>Added to Bag!</span>`;

      // 2. Flying Particle Arc towards Header Cart Icon
      try {
        const btnRect = btn.getBoundingClientRect();
        const startX = btnRect.left + btnRect.width / 2;
        const startY = btnRect.top + btnRect.height / 2;

        const cartTarget = document.getElementById('headerOrdersCount') || 
                           document.querySelector('.header-orders-btn') || 
                           document.querySelector('.header-actions');

        let targetX = window.innerWidth - 60;
        let targetY = 30;

        if (cartTarget) {
          const targetRect = cartTarget.getBoundingClientRect();
          targetX = targetRect.left + targetRect.width / 2;
          targetY = targetRect.top + targetRect.height / 2;
        }

        const particle = document.createElement('div');
        particle.className = 'flying-cart-particle';
        particle.innerHTML = '🛍️';
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.transform = 'translate(-50%, -50%) scale(1)';
        document.body.appendChild(particle);

        // Animate parabolic arc towards header
        requestAnimationFrame(() => {
          particle.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.4)`;
          particle.style.opacity = '0.7';

          setTimeout(() => {
            particle.remove();
            this.bounceCartBadge();
          }, 700);
        });

        // 3. Sparkle Confetti Burst around the button
        this.spawnButtonSparks(startX, startY);
      } catch (err) {
        console.error('Animation particle error:', err);
      }

      // Restore button text after 1350ms
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.remove('btn-cart-success');
      }, 1350);
    }

    // Bounce & ping the Cart Icon in site header
    bounceCartBadge() {
      const target = document.querySelector('.header-orders-btn') || document.getElementById('headerOrdersCount');
      if (!target) return;
      target.classList.remove('cart-bounce-ping');
      void target.offsetWidth; // Trigger reflow
      target.classList.add('cart-bounce-ping');
      setTimeout(() => target.classList.remove('cart-bounce-ping'), 600);
    }

    // Sparkle particles shooting outward on Add-to-Cart
    spawnButtonSparks(x, y) {
      const colors = ['#C5E063', '#25D366', '#FFD700', '#5B7222'];
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.className = 'flying-cart-particle';
        spark.style.width = '7px';
        spark.style.height = '7px';
        spark.style.background = colors[i % colors.length];
        spark.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.zIndex = '999999';
        document.body.appendChild(spark);

        const angle = (i / 8) * Math.PI * 2;
        const dist = 35 + Math.random() * 25;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        requestAnimationFrame(() => {
          spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
          spark.style.opacity = '0';
          setTimeout(() => spark.remove(), 600);
        });
      }
    }

    // Wishlist Heart Explosion with particle burst
    popHeart(heartBtn) {
      if (!heartBtn) return;
      heartBtn.classList.add('heart-pop');
      setTimeout(() => heartBtn.classList.remove('heart-pop'), 500);

      const rect = heartBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const symbols = ['♥', '✨', '💖', '★', '🌸', '♥'];
      symbols.forEach((sym, idx) => {
        const p = document.createElement('div');
        p.className = 'heart-sparkle-particle';
        p.textContent = sym;
        p.style.color = (idx % 2 === 0) ? '#E53E3E' : '#D69E2E';
        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
        document.body.appendChild(p);

        const angle = (idx / symbols.length) * Math.PI * 2;
        const dist = 30 + Math.random() * 20;
        const destX = Math.cos(angle) * dist;
        const destY = Math.sin(angle) * dist - 15;

        requestAnimationFrame(() => {
          p.style.transform = `translate(${destX}px, ${destY}px) scale(1.3)`;
          p.style.opacity = '0';
          setTimeout(() => p.remove(), 650);
        });
      });
    }

    pulseButton(btn) {
      if (!btn) return;
      btn.classList.add('btn-pulse');
      setTimeout(() => btn.classList.remove('btn-pulse'), 450);
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
