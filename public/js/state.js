// LimeTree Reactive State Manager
class Store {
  constructor() {
    this.subscribers = new Set();
    
    // Load persisted state
    this.cart = this.loadStorage('limetree_cart', []);
    this.wishlist = this.loadStorage('limetree_wishlist', []);
    this.user = this.loadStorage('limetree_user', {
      id: "demo-user",
      name: "Alex Morgan",
      email: "alex@example.com",
      isLoggedIn: true,
      address: {
        street: "742 Evergreen Terrace",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        phone: "+1 (555) 349-2910"
      }
    });
    this.orders = this.loadStorage('limetree_orders', [
      {
        orderId: "LT-829104",
        createdAt: "2026-10-12T09:30:00Z",
        status: "Delivered",
        estimatedDelivery: "Oct 15, 2026",
        items: [
          {
            id: "GH-001",
            name: "French Lavender & Golden Amber Soy Candle",
            brand: "Glow Home",
            price: 28.00,
            quantity: 1,
            image: "images/glow_candle_lavender.jpg"
          },
          {
            id: "RT-001",
            name: "Kids Organic Cotton Embroidered Sun Tee",
            brand: "Riyaa Trends Kids",
            size: "4-5Y",
            color: "Pastel Sage",
            price: 24.00,
            quantity: 1,
            image: "images/kids_tee_sage.jpg"
          }
        ],
        totals: {
          subtotal: 52.00,
          shipping: 0.00,
          discount: 5.20,
          total: 46.80
        }
      }
    ]);
    
    this.activeCoupon = this.loadStorage('limetree_coupon', null);
    this.currentView = 'home';
    this.activeProductId = null;
    this.searchQuery = '';
    this.filterSubcategory = 'All';
    this.filterBrand = 'All';
    this.sortOption = 'default';
    this.maxPrice = 100;
  }

  loadStorage(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Error loading localStorage key: ${key}`, e);
      return fallback;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(`Error saving localStorage key: ${key}`, e);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(event, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(event, payload);
      } catch (err) {
        console.error('Subscriber error:', err);
      }
    });
  }

  // Cart operations
  addToCart(product, options = {}) {
    const {
      size = product.sizes ? product.sizes[0] : null,
      color = product.colors ? product.colors[0].name : null,
      quantity = 1
    } = options;

    const cartKey = `${product.id}_${size || 'none'}_${color || 'none'}`;
    const existing = this.cart.find(item => item.cartKey === cartKey);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        cartKey,
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        origPrice: product.origPrice,
        image: product.image,
        size,
        color,
        quantity
      });
    }

    this.saveStorage('limetree_cart', this.cart);
    this.notify('cart_updated', { cart: this.cart, added: product });
  }

  updateCartQuantity(cartKey, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(cartKey);
      return;
    }

    const item = this.cart.find(i => i.cartKey === cartKey);
    if (item) {
      item.quantity = quantity;
      this.saveStorage('limetree_cart', this.cart);
      this.notify('cart_updated', { cart: this.cart });
    }
  }

  removeFromCart(cartKey) {
    this.cart = this.cart.filter(item => item.cartKey !== cartKey);
    this.saveStorage('limetree_cart', this.cart);
    this.notify('cart_updated', { cart: this.cart });
  }

  clearCart() {
    this.cart = [];
    this.activeCoupon = null;
    this.saveStorage('limetree_cart', this.cart);
    this.saveStorage('limetree_coupon', null);
    this.notify('cart_updated', { cart: this.cart });
  }

  applyCoupon(code) {
    const trimmed = (code || '').trim().toUpperCase();
    if (COUPONS[trimmed]) {
      this.activeCoupon = { code: trimmed, ...COUPONS[trimmed] };
      this.saveStorage('limetree_coupon', this.activeCoupon);
      this.notify('coupon_applied', { coupon: this.activeCoupon });
      return { success: true, coupon: this.activeCoupon };
    }
    return { success: false, message: "Invalid promo code. Try LIMETREE10 or WELCOME20" };
  }

  removeCoupon() {
    this.activeCoupon = null;
    this.saveStorage('limetree_coupon', null);
    this.notify('coupon_removed', null);
  }

  getCartTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (this.activeCoupon) {
      if (this.activeCoupon.type === 'percent') {
        discount = subtotal * this.activeCoupon.discount;
      } else if (this.activeCoupon.type === 'fixed') {
        if (!this.activeCoupon.minSpend || subtotal >= this.activeCoupon.minSpend) {
          discount = this.activeCoupon.discount;
        }
      }
    }

    // Free shipping threshold: $50 or coupon
    const freeShipping = (subtotal >= 50 && subtotal > 0) || (this.activeCoupon && this.activeCoupon.freeShipping);
    const shipping = subtotal > 0 ? (freeShipping ? 0 : 5.00) : 0;
    const estTax = subtotal > 0 ? (subtotal - discount) * 0.08 : 0;
    const total = Math.max(0, (subtotal - discount) + shipping + estTax);
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      discount,
      shipping,
      freeShipping,
      awayFromFreeShipping: Math.max(0, 50 - subtotal),
      tax: estTax,
      total,
      totalItems
    };
  }

  // Wishlist operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.saveStorage('limetree_wishlist', this.wishlist);
    this.notify('wishlist_updated', { wishlist: this.wishlist, productId, added });
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // Auth operations
  login(user) {
    this.user = { ...user, isLoggedIn: true };
    this.saveStorage('limetree_user', this.user);
    this.notify('auth_updated', { user: this.user });
  }

  logout() {
    this.user = null;
    this.saveStorage('limetree_user', null);
    this.notify('auth_updated', { user: null });
  }

  // Orders
  addOrder(orderData) {
    this.orders.unshift(orderData);
    this.saveStorage('limetree_orders', this.orders);
    this.clearCart();
    this.notify('order_placed', { order: orderData });
    return orderData;
  }

  // Returns & Exchanges
  requestReturn(orderId, returnDetails) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return null;

    const returnId = 'RET-' + Math.floor(100000 + Math.random() * 900000);
    order.status = 'Return Requested';
    order.returnDetails = {
      returnId,
      requestedAt: new Date().toISOString(),
      reason: returnDetails.reason || 'General Return',
      items: returnDetails.items || order.items,
      refundMethod: returnDetails.refundMethod || 'Original Payment Method',
      comments: returnDetails.comments || '',
      returnStatus: 'Pickup Scheduled',
      pickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString(),
      carrier: 'LimeTree Eco Logistics / UPS',
      prepaidLabel: 'LBL-' + order.orderId + '-PREPAID'
    };

    this.saveStorage('limetree_orders', this.orders);
    this.notify('order_return_requested', { order, returnDetails: order.returnDetails });
    return order;
  }

  cancelReturn(orderId) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return null;

    order.status = 'Delivered';
    delete order.returnDetails;
    this.saveStorage('limetree_orders', this.orders);
    this.notify('order_return_cancelled', { order });
    return order;
  }
}

// Global store instance
window.store = new Store();
