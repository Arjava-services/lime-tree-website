/**
 * LIMETREE - Central Storage & State Management Engine
 * Handles persistent database storage, atomic stock updates, LIFO inventory valuation,
 * cart, orders, returns, and audit trails.
 */

const STORAGE_KEYS = {
  PRODUCTS: 'limetree_products_v10',
  ORDERS: 'limetree_orders_v2',
  CART: 'limetree_cart_v2',
  WISHLIST: 'limetree_wishlist_v2',
  SETTINGS: 'limetree_settings_v2',
  INVENTORY_BATCHES: 'limetree_inventory_batches_v5',
  AUDIT_LOGS: 'limetree_audit_logs_v2',
  RETURNS: 'limetree_returns_v2'
};

class LimetreeStorage {
  constructor() {
    this.init();
  }

  init() {
    let validProducts = false;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        const hasRiyaa = parsed.some(p => p.businessId === 'riyaa-trends');
        const hasGlow = parsed.some(p => p.businessId === 'glow-home');
        const hasEarkart = parsed.some(p => p.businessId === 'earkart');
        const hasUnsplash = parsed.some(p => (p.images || []).some(img => typeof img === 'string' && img.includes('unsplash')));
        if (hasRiyaa && hasGlow && hasEarkart && parsed.length >= 40 && !hasUnsplash) {
          validProducts = true;
        }
      }
    } catch (e) {
      validProducts = false;
    }

    if (!validProducts) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(window.INITIAL_PRODUCTS || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(window.INITIAL_ORDERS || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(window.INITIAL_SETTINGS || {}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INVENTORY_BATCHES)) {
      localStorage.setItem(STORAGE_KEYS.INVENTORY_BATCHES, JSON.stringify(window.INITIAL_INVENTORY_BATCHES || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      const initialLogs = [
        {
          id: 'log-001',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          action: 'SYSTEM_INIT',
          details: 'Initialized curated catalog with 18 handcrafted SKUs across Riyaa Trends, Glow Home, and Earkart.'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(initialLogs));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RETURNS)) {
      localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify([]));
    }
  }

  // ==================== PRODUCTS ====================
  getProducts(filter = {}) {
    try {
      let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
      if (!products || products.length === 0) {
        products = window.INITIAL_PRODUCTS || [];
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      }
      const settings = this.getSettings();

      if (settings.hideOutOfStock && !filter.includeOutOfStock) {
        products = products.filter(p => {
          const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
          return totalStock > 0 && p.status === 'active';
        });
      }

      if (filter.businessId && filter.businessId !== 'all') {
        products = products.filter(p => p.businessId === filter.businessId);
      }
      if (filter.category) {
        const catRaw = filter.category.toLowerCase().trim();
        const catNorm = catRaw.replace(/[\s-_]+/g, '');
        const words = catRaw.split(/[\s-_]+/).filter(w => w.length > 2);
        products = products.filter(p => {
          const pCat = (p.category || '').toLowerCase();
          const pName = (p.name || '').toLowerCase();
          const pNorm = (pCat + ' ' + pName).replace(/[\s-_]+/g, '');
          if (pNorm.includes(catNorm) || catNorm.includes(pNorm)) return true;
          return words.some(w => pCat.includes(w) || pName.includes(w));
        });
      }
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase().trim();
        products = products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.sku && p.sku.toLowerCase().includes(query)) ||
          (p.variants && p.variants.some(v => v.sku && v.sku.toLowerCase().includes(query)))
        );
      }
      if (filter.minPrice !== undefined && filter.minPrice !== null) {
        products = products.filter(p => (p.salePrice || p.basePrice) >= filter.minPrice);
      }
      if (filter.maxPrice !== undefined && filter.maxPrice !== null) {
        products = products.filter(p => (p.salePrice || p.basePrice) <= filter.maxPrice);
      }
      if (filter.inStockOnly) {
        products = products.filter(p => (p.variants || []).some(v => v.stock > 0));
      }

      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'price-low':
            products.sort((a, b) => (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice));
            break;
          case 'price-high':
            products.sort((a, b) => (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice));
            break;
          case 'rating':
            products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case 'newest':
          default:
            break;
        }
      }

      return products;
    } catch (e) {
      console.error('Error fetching products from storage:', e);
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts({ includeOutOfStock: true });
    return products.find(p => p.id === id);
  }

  saveProduct(productData) {
    const products = this.getProducts({ includeOutOfStock: true });
    const existingIndex = products.findIndex(p => p.id === productData.id);

    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...productData, updatedAt: new Date().toISOString() };
      this.logAudit('PRODUCT_UPDATE', `Product ${productData.name} (${productData.id}) updated.`);
    } else {
      if (!productData.id) productData.id = 'prod-' + Date.now();
      productData.createdAt = new Date().toISOString();
      productData.updatedAt = new Date().toISOString();
      products.unshift(productData);
      this.logAudit('PRODUCT_CREATE', `New product created: ${productData.name} under ${productData.businessId}.`);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.emitEvent('limetree:products-updated');
    return productData;
  }

  deleteProduct(productId) {
    let products = this.getProducts({ includeOutOfStock: true });
    const target = products.find(p => p.id === productId);
    products = products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.logAudit('PRODUCT_DELETE', `Product deleted: ${target ? target.name : productId}`);
    this.emitEvent('limetree:products-updated');
    return true;
  }

  // ==================== INVENTORY & ATOMIC UPDATES ====================
  updateVariantStock(productId, variantId, newStock, reason = 'Manual Inventory Adjustment') {
    const products = this.getProducts({ includeOutOfStock: true });
    const product = products.find(p => p.id === productId);
    if (!product) return false;

    const variant = (product.variants || []).find(v => v.id === variantId);
    if (!variant) return false;

    const oldStock = variant.stock;
    const diff = newStock - oldStock;
    variant.stock = Math.max(0, parseInt(newStock, 10));

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.logAudit('STOCK_ADJUSTMENT', `SKU ${variant.sku}: Stock changed from ${oldStock} to ${variant.stock} (${diff >= 0 ? '+' : ''}${diff}). Reason: ${reason}`);

    if (diff > 0) {
      this.addInventoryBatch({
        sku: variant.sku,
        quantity: diff,
        costPerUnit: Math.round((variant.price || product.basePrice) * 0.45),
        supplier: 'Direct Inventory Inward'
      });
    }

    this.emitEvent('limetree:inventory-updated');
    return true;
  }

  // ==================== LIFO INVENTORY VALUATION ENGINE ====================
  getInventoryBatches() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY_BATCHES) || '[]');
  }

  addInventoryBatch(batchData) {
    const batches = this.getInventoryBatches();
    const newBatch = {
      batchId: 'BATCH-' + Date.now(),
      receivedDate: new Date().toISOString(),
      sku: batchData.sku,
      costPerUnit: batchData.costPerUnit || 320,
      quantityReceived: batchData.quantity,
      quantityRemaining: batchData.quantity,
      supplier: batchData.supplier || 'Standard Purchase Inward'
    };
    batches.push(newBatch);
    localStorage.setItem(STORAGE_KEYS.INVENTORY_BATCHES, JSON.stringify(batches));
    return newBatch;
  }

  deductLIFOStock(sku, quantityToDeduct) {
    const batches = this.getInventoryBatches();
    const skuBatches = batches
      .filter(b => b.sku === sku && b.quantityRemaining > 0)
      .sort((a, b) => new Date(b.receivedDate) - new Date(a.receivedDate));

    let remainingToDeduct = quantityToDeduct;
    let totalCogs = 0;
    const allocations = [];

    for (const batch of skuBatches) {
      if (remainingToDeduct <= 0) break;
      const take = Math.min(batch.quantityRemaining, remainingToDeduct);
      batch.quantityRemaining -= take;
      remainingToDeduct -= take;
      totalCogs += take * batch.costPerUnit;
      allocations.push({
        batchId: batch.batchId,
        unitsTaken: take,
        unitCost: batch.costPerUnit,
        receivedDate: batch.receivedDate
      });
    }

    localStorage.setItem(STORAGE_KEYS.INVENTORY_BATCHES, JSON.stringify(batches));
    return {
      sku,
      quantityDeducted: quantityToDeduct - remainingToDeduct,
      totalCogs,
      allocations
    };
  }

  getLIFOCostingReport() {
    const batches = this.getInventoryBatches();
    let totalValuation = 0;
    let totalRemainingUnits = 0;
    const batchSummary = [];

    batches.forEach(b => {
      const val = b.quantityRemaining * b.costPerUnit;
      totalValuation += val;
      totalRemainingUnits += b.quantityRemaining;
      batchSummary.push({
        ...b,
        valuation: val
      });
    });

    return {
      method: 'LIFO (Last In, First Out)',
      totalValuation,
      totalRemainingUnits,
      batches: batchSummary
    };
  }

  // ==================== CART & WISHLIST ====================
  getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
  }

  addToCart(item) {
    const cart = this.getCart();
    const product = this.getProductById(item.productId);
    if (!product) throw new Error('Product not found.');

    const variant = (product.variants || []).find(v => v.id === item.variantId);
    if (!variant) throw new Error('Variant not found.');

    if (variant.stock <= 0) {
      throw new Error('Sorry, this variant is currently out of stock.');
    }

    const existingIndex = cart.findIndex(c => c.productId === item.productId && c.variantId === item.variantId);

    if (existingIndex >= 0) {
      const currentQty = cart[existingIndex].quantity;
      const requestedQty = currentQty + (item.quantity || 1);
      if (requestedQty > variant.stock) {
        throw new Error(`Only ${variant.stock} units available in stock for this variant.`);
      }
      cart[existingIndex].quantity = requestedQty;
    } else {
      if ((item.quantity || 1) > variant.stock) {
        throw new Error(`Only ${variant.stock} units available in stock.`);
      }
      cart.push({
        productId: product.id,
        businessId: product.businessId,
        productName: product.name,
        variantId: variant.id,
        variantLabel: this.formatVariantLabel(product.businessId, variant),
        sku: variant.sku,
        price: variant.price || product.salePrice || product.basePrice,
        image: product.images && product.images[0] ? product.images[0] : '',
        quantity: item.quantity || 1,
        hsnCode: product.hsnCode || '000000',
        gstRate: (window.LIMETREE_BUSINESSES[product.businessId] || {}).gstRate || 18
      });
    }

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitEvent('limetree:cart-updated');
    return cart;
  }

  updateCartQuantity(productId, variantId, newQuantity) {
    const cart = this.getCart();
    const item = cart.find(c => c.productId === productId && c.variantId === variantId);
    if (!item) return cart;

    if (newQuantity <= 0) {
      return this.removeFromCart(productId, variantId);
    }

    const product = this.getProductById(productId);
    const variant = (product.variants || []).find(v => v.id === variantId);

    if (variant && newQuantity > variant.stock) {
      throw new Error(`Cannot add more than available stock (${variant.stock} available).`);
    }

    item.quantity = newQuantity;
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitEvent('limetree:cart-updated');
    return cart;
  }

  removeFromCart(productId, variantId) {
    let cart = this.getCart();
    cart = cart.filter(c => !(c.productId === productId && c.variantId === variantId));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitEvent('limetree:cart-updated');
    return cart;
  }

  clearCart() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    this.emitEvent('limetree:cart-updated');
  }

  formatVariantLabel(businessId, variant) {
    if (businessId === 'riyaa-trends') {
      return `Size: ${variant.size} | Colour: ${variant.color}`;
    } else if (businessId === 'glow-home') {
      return `Fragrance: ${variant.fragrance} | Size: ${variant.size}`;
    } else if (businessId === 'earkart') {
      return `Material: ${variant.material} | Colour: ${variant.color}`;
    }
    return variant.sku || 'Standard';
  }

  getWishlist() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || '[]');
  }

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    this.emitEvent('limetree:wishlist-updated');
    return wishlist.includes(productId);
  }

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  }

  // ==================== ORDERS & CHECKOUT ====================
  getOrders(filter = {}) {
    let orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    if (filter.orderId) {
      orders = orders.filter(o => o.orderId.toLowerCase() === filter.orderId.toLowerCase().trim());
    }
    if (filter.email) {
      orders = orders.filter(o => o.customer.email.toLowerCase() === filter.email.toLowerCase().trim());
    }
    if (filter.businessId) {
      orders = orders.filter(o => o.items.some(i => i.businessId === filter.businessId));
    }
    if (filter.fulfillmentStatus) {
      orders = orders.filter(o => o.fulfillmentStatus === filter.fulfillmentStatus);
    }
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    return orders;
  }

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.orderId === orderId);
  }

  createOrder(orderPayload) {
    const products = this.getProducts({ includeOutOfStock: true });

    // Inventory check
    for (const item of orderPayload.items) {
      const prod = products.find(p => p.id === item.productId);
      if (!prod) throw new Error(`Product ${item.productName} no longer exists.`);
      const variant = (prod.variants || []).find(v => v.id === item.variantId);
      if (!variant) throw new Error(`Variant for ${item.productName} no longer exists.`);
      if (variant.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productName} (${variant.sku}). Available: ${variant.stock}.`);
      }
    }

    // Atomic deduction and LIFO calculation
    const lifoAllocations = [];
    for (const item of orderPayload.items) {
      const prod = products.find(p => p.id === item.productId);
      const variant = (prod.variants || []).find(v => v.id === item.variantId);
      variant.stock -= item.quantity;

      const lifoResult = this.deductLIFOStock(variant.sku, item.quantity);
      lifoAllocations.push(lifoResult);

      this.logAudit('ORDER_STOCK_DEDUCT', `Deducted ${item.quantity} units from SKU ${variant.sku}. New stock: ${variant.stock}. LIFO COGS: ₹${lifoResult.totalCogs}`);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    const currentOrders = this.getOrders();
    const nextSeq = 8800 + currentOrders.length + 1;
    const orderId = `LT-2026-${nextSeq}`;
    const invoiceNumber = `LT/2026-27/00${nextSeq - 8700}`;

    const newOrder = {
      orderId,
      invoiceNumber,
      date: new Date().toISOString(),
      customer: orderPayload.customer,
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      discountAmount: orderPayload.discountAmount || 0,
      couponApplied: orderPayload.couponApplied || null,
      shippingCharge: orderPayload.shippingCharge || 0,
      shippingMethod: orderPayload.shippingMethod || 'Standard Delivery',
      taxBreakdown: orderPayload.taxBreakdown,
      totalAmount: orderPayload.totalAmount,
      paymentStatus: orderPayload.paymentStatus || 'Paid',
      paymentMethod: orderPayload.paymentMethod || 'Razorpay Test Gateway',
      paymentTransactionId: orderPayload.paymentTransactionId || ('pay_Rzp' + Math.floor(1000000000 + Math.random() * 9000000000)),
      fulfillmentStatus: 'Confirmed',
      trackingNumber: 'DEL-' + Math.floor(1000000000 + Math.random() * 9000000000),
      carrier: 'Delhivery Surface Logistics',
      trackingUrl: 'https://www.delhivery.com',
      lifoAllocations,
      statusHistory: [
        { status: 'Order Placed', timestamp: new Date().toISOString(), note: 'Order placed by customer.' },
        { status: 'Payment Confirmed', timestamp: new Date().toISOString(), note: 'Payment verified via secure test gateway.' }
      ]
    };

    currentOrders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(currentOrders));
    this.clearCart();

    this.logAudit('ORDER_CREATED', `Order ${orderId} created for ${orderPayload.customer.name} (₹${orderPayload.totalAmount}).`);
    this.emitEvent('limetree:orders-updated');
    this.emitEvent('limetree:inventory-updated');

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus, trackingNumber = '', carrier = '', notes = '') {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return false;

    order.fulfillmentStatus = newStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (carrier) order.carrier = carrier;

    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: notes || `Order status updated to ${newStatus}.`
    });

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.logAudit('ORDER_STATUS_UPDATE', `Order ${orderId} updated to ${newStatus}.`);
    this.emitEvent('limetree:orders-updated');
    return order;
  }

  cancelOrder(orderId, reason = 'Customer requested cancellation', restockItems = true) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return false;

    order.fulfillmentStatus = 'Cancelled';
    order.paymentStatus = 'Refund Initiated';
    order.statusHistory.push({
      status: 'Cancelled',
      timestamp: new Date().toISOString(),
      note: `Cancelled. Reason: ${reason}`
    });

    if (restockItems) {
      const products = this.getProducts({ includeOutOfStock: true });
      order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
          const variant = (prod.variants || []).find(v => v.id === item.variantId);
          if (variant) {
            variant.stock += item.quantity;
            this.logAudit('STOCK_RESTORE', `Restored ${item.quantity} units to SKU ${variant.sku} from cancelled order ${orderId}.`);
          }
        }
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      this.emitEvent('limetree:inventory-updated');
    }

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.logAudit('ORDER_CANCELLED', `Order ${orderId} cancelled. Restock: ${restockItems}`);
    this.emitEvent('limetree:orders-updated');
    return order;
  }

  // ==================== RETURNS & REFUNDS ====================
  getReturns() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RETURNS) || '[]');
  }

  createReturnRequest(returnData) {
    const returns = this.getReturns();
    const order = this.getOrderById(returnData.orderId);
    if (!order) throw new Error('Order not found.');

    const returnRequest = {
      returnId: 'RET-' + Date.now(),
      orderId: returnData.orderId,
      customerEmail: order.customer.email,
      customerName: order.customer.name,
      createdAt: new Date().toISOString(),
      reason: returnData.reason,
      details: returnData.details || '',
      items: returnData.items,
      status: 'Pending Review',
      refundAmount: returnData.refundAmount || order.totalAmount
    };

    returns.unshift(returnRequest);
    localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(returns));
    this.logAudit('RETURN_REQUESTED', `Return request ${returnRequest.returnId} filed for Order ${returnData.orderId}.`);
    this.emitEvent('limetree:returns-updated');
    return returnRequest;
  }

  updateReturnStatus(returnId, newStatus, restock = false, adminNotes = '') {
    const returns = this.getReturns();
    const ret = returns.find(r => r.returnId === returnId);
    if (!ret) return false;

    ret.status = newStatus;
    ret.adminNotes = adminNotes;
    ret.resolvedAt = new Date().toISOString();

    if (newStatus === 'Approved' || newStatus === 'Refunded') {
      if (restock && ret.items) {
        const products = this.getProducts({ includeOutOfStock: true });
        ret.items.forEach(item => {
          const prod = products.find(p => p.id === item.productId);
          if (prod) {
            const variant = (prod.variants || []).find(v => v.id === item.variantId);
            if (variant) variant.stock += (item.quantity || 1);
          }
        });
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        this.emitEvent('limetree:inventory-updated');
      }
    }

    localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(returns));
    this.logAudit('RETURN_STATUS_UPDATE', `Return ${returnId} set to ${newStatus}. Restocked: ${restock}`);
    this.emitEvent('limetree:returns-updated');
    return ret;
  }

  // ==================== SETTINGS & AUDIT ====================
  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify(window.INITIAL_SETTINGS || {}));
  }

  saveSettings(newSettings) {
    const merged = { ...this.getSettings(), ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
    this.logAudit('SETTINGS_UPDATE', 'Admin updated system settings.');
    this.emitEvent('limetree:settings-updated');
    return merged;
  }

  getAuditLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS) || '[]');
  }

  logAudit(action, details) {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      action,
      details
    });
    if (logs.length > 200) logs.pop();
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs));
  }

  emitEvent(eventName, detail = {}) {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  }
}

const storageInstance = new LimetreeStorage();

if (typeof window !== 'undefined') {
  window.limetreeStorage = storageInstance;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LimetreeStorage;
}
