/**
 * LIMETREE - Executive Admin Dashboard Controller
 * Full-featured store management: Catalog CRUD, Bulk CSV Import/Export,
 * LIFO Inventory Valuation, Order Fulfillment, Returns Management, and Reports.
 */

class LimetreeAdmin {
  constructor() {
    this.currentTab = 'overview';
    this.csvPreviewRows = [];
    this.editingProductId = null;
    this.adjustingVariant = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindNavigation();
      this.bindEventListeners();
      this.renderCurrentTab();
      this.updateTopbarMetrics();

      // Listen to storage events for real-time synchronization
      window.addEventListener('limetree:products-updated', () => {
        if (this.currentTab === 'products' || this.currentTab === 'overview' || this.currentTab === 'inventory') {
          this.renderCurrentTab();
        }
      });
      window.addEventListener('limetree:orders-updated', () => {
        if (this.currentTab === 'orders' || this.currentTab === 'overview' || this.currentTab === 'reports') {
          this.renderCurrentTab();
        }
      });
      window.addEventListener('limetree:inventory-updated', () => {
        if (this.currentTab === 'inventory' || this.currentTab === 'overview') {
          this.renderCurrentTab();
        }
      });
      window.addEventListener('limetree:returns-updated', () => {
        if (this.currentTab === 'returns' || this.currentTab === 'overview') {
          this.renderCurrentTab();
        }
      });
    });
  }

  bindNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        if (tab) {
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          this.switchTab(tab);
        }
      });
    });

    const mobileToggle = document.getElementById('adminSidebarToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('.admin-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      });
    }
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    const tabPanes = document.querySelectorAll('.admin-tab-pane');
    tabPanes.forEach(pane => {
      pane.style.display = pane.id === `${tabName}Tab` ? 'block' : 'none';
    });

    const tabTitleEl = document.getElementById('adminCurrentTabTitle');
    if (tabTitleEl) {
      const titles = {
        overview: 'Executive Overview',
        products: 'Product Catalog Management',
        'bulk-upload': 'Bulk CSV Product Ingestion',
        inventory: 'Inventory & LIFO Cost Valuation',
        orders: 'Orders & Fulfillment Tracking',
        returns: 'Customer Return & Refund Concierge',
        reports: 'Financial & Sales Analytics',
        settings: 'Store Configuration & Tax Settings'
      };
      tabTitleEl.textContent = titles[tabName] || 'Dashboard';
    }

    this.renderCurrentTab();
  }

  renderCurrentTab() {
    switch (this.currentTab) {
      case 'overview':
        this.renderOverview();
        break;
      case 'products':
        this.renderProducts();
        break;
      case 'bulk-upload':
        this.renderBulkUpload();
        break;
      case 'inventory':
        this.renderInventory();
        break;
      case 'orders':
        this.renderOrders();
        break;
      case 'returns':
        this.renderReturns();
        break;
      case 'reports':
        this.renderReports();
        break;
      case 'settings':
        this.renderSettings();
        break;
    }
  }

  updateTopbarMetrics() {
    const orders = window.limetreeStorage.getOrders();
    const pendingOrders = orders.filter(o => o.fulfillmentStatus === 'Confirmed' || o.fulfillmentStatus === 'Processing').length;
    const pendingBadge = document.getElementById('pendingOrdersBadge');
    if (pendingBadge) {
      if (pendingOrders > 0) {
        pendingBadge.textContent = `${pendingOrders} Pending`;
        pendingBadge.style.display = 'inline-block';
      } else {
        pendingBadge.style.display = 'none';
      }
    }
  }

  // ==================== OVERVIEW TAB ====================
  renderOverview() {
    const products = window.limetreeStorage.getProducts({ includeOutOfStock: true });
    const orders = window.limetreeStorage.getOrders();
    const returns = window.limetreeStorage.getReturns();
    const lifoReport = window.limetreeStorage.getLIFOCostingReport();

    // Calculate revenue
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Calculate total stock units
    let totalStockUnits = 0;
    let lowStockCount = 0;
    products.forEach(p => {
      (p.variants || []).forEach(v => {
        totalStockUnits += (v.stock || 0);
        if (v.stock > 0 && v.stock <= 5) lowStockCount++;
      });
    });

    // Populate metric values
    const revEl = document.getElementById('metricTotalRevenue');
    if (revEl) revEl.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;

    const ordersEl = document.getElementById('metricTotalOrders');
    if (ordersEl) ordersEl.textContent = orders.length;

    const unitsEl = document.getElementById('metricTotalUnits');
    if (unitsEl) unitsEl.textContent = `${totalStockUnits.toLocaleString('en-IN')} units`;

    const lifoEl = document.getElementById('metricLifoValuation');
    if (lifoEl) lifoEl.textContent = `₹${lifoReport.totalValuation.toLocaleString('en-IN')}`;

    // Recent orders table
    const recentOrdersTbody = document.getElementById('overviewRecentOrdersTbody');
    if (recentOrdersTbody) {
      const recent = orders.slice(0, 5);
      if (recent.length === 0) {
        recentOrdersTbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 2rem; color: var(--color-text-muted);">No orders recorded yet.</td></tr>`;
      } else {
        recentOrdersTbody.innerHTML = recent.map(o => `
          <tr>
            <td><strong>${o.orderId}</strong></td>
            <td>${new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
            <td>${o.customer.name}</td>
            <td><strong>₹${o.totalAmount.toLocaleString('en-IN')}</strong></td>
            <td><span class="status-pill status-${o.fulfillmentStatus.toLowerCase()}">${o.fulfillmentStatus}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="window.limetreeAdmin.viewOrderInvoice('${o.orderId}')">Invoice</button>
            </td>
          </tr>
        `).join('');
      }
    }

    // Low stock alerts list
    const lowStockList = document.getElementById('overviewLowStockList');
    if (lowStockList) {
      const lowStockItems = [];
      products.forEach(p => {
        (p.variants || []).forEach(v => {
          if (v.stock <= 5) {
            lowStockItems.push({
              productName: p.name,
              businessId: p.businessId,
              sku: v.sku,
              stock: v.stock,
              productId: p.id,
              variantId: v.id
            });
          }
        });
      });

      if (lowStockItems.length === 0) {
        lowStockList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--color-success); font-weight: 500;">✓ All items are adequately stocked above threshold.</div>`;
      } else {
        lowStockList.innerHTML = lowStockItems.slice(0, 6).map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.2rem; border-bottom: 1px solid var(--color-border-subtle);">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">${item.productName}</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted);">SKU: ${item.sku} · ${this.getBusinessBadge(item.businessId)}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <span class="badge ${item.stock === 0 ? 'badge-danger' : 'badge-warning'}" style="font-size: 0.75rem;">
                ${item.stock === 0 ? 'OUT OF STOCK' : `${item.stock} left`}
              </span>
              <button class="btn btn-primary btn-sm" onclick="window.limetreeAdmin.openStockAdjustmentModal('${item.productId}', '${item.variantId}')">
                Restock
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // ==================== PRODUCT CATALOG TAB ====================
  renderProducts() {
    const filterBusiness = document.getElementById('adminProductFilterBusiness')?.value || 'all';
    const searchQuery = (document.getElementById('adminProductSearch')?.value || '').toLowerCase().trim();

    let products = window.limetreeStorage.getProducts({ includeOutOfStock: true });

    if (filterBusiness !== 'all') {
      products = products.filter(p => p.businessId === filterBusiness);
    }
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        (p.variants && p.variants.some(v => v.sku.toLowerCase().includes(searchQuery)))
      );
    }

    const tbody = document.getElementById('adminProductsTbody');
    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 3rem; color: var(--color-text-muted);">No products match your filter criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = products.map(p => {
      const totalStock = (p.variants || []).reduce((sum, v) => sum + (v.stock || 0), 0);
      const primaryImg = p.images && p.images[0] ? p.images[0] : (p.businessId === 'glow-home' ? 'assets/glow-home/IMG_20260816_171236.jpg' : p.businessId === 'earkart' ? 'assets/earkart/earkart-daisy-pair-original.jpg' : 'assets/riyaa-trends/IMG-20260222-WA0041.jpg');

      return `
        <tr>
          <td>
            <img src="${primaryImg}" alt="${p.name}" class="table-product-thumb" loading="lazy" />
          </td>
          <td>
            <div style="font-weight: 600; color: var(--color-primary-dark);">${p.name}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">ID: ${p.id} · HSN: ${p.hsnCode || 'N/A'}</div>
          </td>
          <td>${this.getBusinessBadge(p.businessId)}</td>
          <td><span style="text-transform: capitalize;">${p.category}</span></td>
          <td>
            <div><strong>₹${(p.salePrice || p.basePrice).toLocaleString('en-IN')}</strong></div>
            ${p.salePrice ? `<div style="font-size: 0.75rem; color: var(--color-text-light); text-decoration: line-through;">₹${p.basePrice.toLocaleString('en-IN')}</div>` : ''}
          </td>
          <td>
            <div style="font-weight: 600; ${totalStock === 0 ? 'color: var(--color-danger);' : totalStock <= 5 ? 'color: var(--color-warning);' : 'color: var(--color-success);'}">
              ${totalStock} in stock
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">${variantCount} variant${variantCount > 1 ? 's' : ''}</div>
          </td>
          <td>
            <span class="status-pill ${p.status === 'active' ? 'status-active' : 'status-archived'}">
              ${p.status || 'active'}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-sm" onclick="window.limetreeAdmin.openEditProductModal('${p.id}')" title="Edit Product">
                ✏️ Edit
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.limetreeAdmin.openStockAdjustmentModal('${p.id}')" title="Adjust Variant Stock">
                📦 Stock
              </button>
              <button class="btn btn-sm" style="color: var(--color-danger); border: 1px solid var(--color-border);" onclick="window.limetreeAdmin.deleteProductConfirm('${p.id}')" title="Delete Product">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  getBusinessBadge(businessId) {
    if (businessId === 'riyaa-trends') {
      return `<span style="font-size: 0.72rem; font-weight: 700; background: var(--color-primary-subtle); color: var(--color-primary); padding: 0.2rem 0.5rem; border-radius: 4px;">Riyaa Trends</span>`;
    } else if (businessId === 'glow-home') {
      return `<span style="font-size: 0.72rem; font-weight: 700; background: var(--color-accent-lavender-light); color: var(--color-accent-lavender); padding: 0.2rem 0.5rem; border-radius: 4px;">Glow Home</span>`;
    } else if (businessId === 'earkart') {
      return `<span style="font-size: 0.72rem; font-weight: 700; background: var(--color-accent-sage-light); color: var(--color-accent-sage); padding: 0.2rem 0.5rem; border-radius: 4px;">Earkart</span>`;
    }
    return `<span style="font-size: 0.72rem;">${businessId}</span>`;
  }

  // ==================== PRODUCT CRUD MODAL ====================
  openNewProductModal() {
    this.editingProductId = null;
    const modalTitle = document.getElementById('productFormModalTitle');
    if (modalTitle) modalTitle.textContent = 'Add New Artisan Product';

    // Reset form fields
    document.getElementById('productFormBusiness').value = 'riyaa-trends';
    document.getElementById('productFormName').value = '';
    document.getElementById('productFormCategory').value = 't-shirts';
    document.getElementById('productFormBasePrice').value = '999';
    document.getElementById('productFormSalePrice').value = '';
    document.getElementById('productFormHsn').value = '610910';
    document.getElementById('productFormRating').value = '4.8';
    document.getElementById('productFormImages').value = 'assets/riyaa-trends/IMG-20260222-WA0041.jpg';
    document.getElementById('productFormStatus').value = 'active';

    this.renderVariantFieldsForBusiness('riyaa-trends');
    this.openModal('productFormModal');
  }

  openEditProductModal(productId) {
    const product = window.limetreeStorage.getProductById(productId);
    if (!product) return;

    this.editingProductId = productId;
    const modalTitle = document.getElementById('productFormModalTitle');
    if (modalTitle) modalTitle.textContent = `Edit Product: ${product.name}`;

    document.getElementById('productFormBusiness').value = product.businessId;
    document.getElementById('productFormName').value = product.name;
    document.getElementById('productFormCategory').value = product.category;
    document.getElementById('productFormBasePrice').value = product.basePrice;
    document.getElementById('productFormSalePrice').value = product.salePrice || '';
    document.getElementById('productFormHsn').value = product.hsnCode || '';
    document.getElementById('productFormRating').value = product.rating || '4.8';
    document.getElementById('productFormDescription').value = product.description || '';
    document.getElementById('productFormImages').value = (product.images || []).join('\n');
    document.getElementById('productFormStatus').value = product.status || 'active';

    this.renderVariantFieldsFromProduct(product);
    this.openModal('productFormModal');
  }

  renderVariantFieldsForBusiness(businessId) {
    const container = document.getElementById('productFormVariantsContainer');
    if (!container) return;

    if (businessId === 'riyaa-trends') {
      container.innerHTML = `
        <div class="variant-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="text" class="form-control var-sku" placeholder="SKU (e.g. RT-TSH-S-GRN)" value="RT-${Date.now().toString().slice(-4)}-S" />
          <input type="text" class="form-control var-size" placeholder="Size (e.g. S, M, L)" value="S" />
          <input type="text" class="form-control var-color" placeholder="Colour (e.g. Forest Green)" value="Forest Green" />
          <input type="number" class="form-control var-stock" placeholder="Stock" value="25" />
          <input type="number" class="form-control var-price" placeholder="Price (₹)" value="999" />
        </div>
      `;
    } else if (businessId === 'glow-home') {
      container.innerHTML = `
        <div class="variant-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="text" class="form-control var-sku" placeholder="SKU (e.g. GH-CND-LAV-M)" value="GH-${Date.now().toString().slice(-4)}-M" />
          <input type="text" class="form-control var-fragrance" placeholder="Fragrance (e.g. French Lavender)" value="French Lavender" />
          <input type="text" class="form-control var-size" placeholder="Size (e.g. 220g Jar)" value="220g Jar" />
          <input type="number" class="form-control var-stock" placeholder="Stock" value="20" />
          <input type="number" class="form-control var-price" placeholder="Price (₹)" value="1299" />
        </div>
      `;
    } else if (businessId === 'earkart') {
      container.innerHTML = `
        <div class="variant-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
          <input type="text" class="form-control var-sku" placeholder="SKU (e.g. EK-STUD-GLD)" value="EK-${Date.now().toString().slice(-4)}-GLD" />
          <input type="text" class="form-control var-material" placeholder="Material (e.g. 18K Gold Vermeil)" value="18K Gold Vermeil" />
          <input type="text" class="form-control var-color" placeholder="Finish (e.g. Warm Gold)" value="Warm Gold" />
          <input type="number" class="form-control var-stock" placeholder="Stock" value="15" />
          <input type="number" class="form-control var-price" placeholder="Price (₹)" value="1899" />
        </div>
      `;
    }
  }

  renderVariantFieldsFromProduct(product) {
    const container = document.getElementById('productFormVariantsContainer');
    if (!container) return;

    if (!product.variants || product.variants.length === 0) {
      this.renderVariantFieldsForBusiness(product.businessId);
      return;
    }

    container.innerHTML = product.variants.map((v, i) => {
      if (product.businessId === 'riyaa-trends') {
        return `
          <div class="variant-row" data-var-id="${v.id}" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <input type="text" class="form-control var-sku" placeholder="SKU" value="${v.sku || ''}" />
            <input type="text" class="form-control var-size" placeholder="Size" value="${v.size || ''}" />
            <input type="text" class="form-control var-color" placeholder="Colour" value="${v.color || ''}" />
            <input type="number" class="form-control var-stock" placeholder="Stock" value="${v.stock !== undefined ? v.stock : 10}" />
            <input type="number" class="form-control var-price" placeholder="Price (₹)" value="${v.price || product.basePrice}" />
          </div>
        `;
      } else if (product.businessId === 'glow-home') {
        return `
          <div class="variant-row" data-var-id="${v.id}" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <input type="text" class="form-control var-sku" placeholder="SKU" value="${v.sku || ''}" />
            <input type="text" class="form-control var-fragrance" placeholder="Fragrance" value="${v.fragrance || ''}" />
            <input type="text" class="form-control var-size" placeholder="Size" value="${v.size || ''}" />
            <input type="number" class="form-control var-stock" placeholder="Stock" value="${v.stock !== undefined ? v.stock : 10}" />
            <input type="number" class="form-control var-price" placeholder="Price (₹)" value="${v.price || product.basePrice}" />
          </div>
        `;
      } else {
        return `
          <div class="variant-row" data-var-id="${v.id}" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
            <input type="text" class="form-control var-sku" placeholder="SKU" value="${v.sku || ''}" />
            <input type="text" class="form-control var-material" placeholder="Material" value="${v.material || ''}" />
            <input type="text" class="form-control var-color" placeholder="Colour" value="${v.color || ''}" />
            <input type="number" class="form-control var-stock" placeholder="Stock" value="${v.stock !== undefined ? v.stock : 10}" />
            <input type="number" class="form-control var-price" placeholder="Price (₹)" value="${v.price || product.basePrice}" />
          </div>
        `;
      }
    }).join('');
  }

  saveProductFromForm() {
    const businessId = document.getElementById('productFormBusiness').value;
    const name = document.getElementById('productFormName').value.trim();
    const category = document.getElementById('productFormCategory').value.trim();
    const basePrice = parseFloat(document.getElementById('productFormBasePrice').value) || 0;
    const salePriceInput = document.getElementById('productFormSalePrice').value;
    const salePrice = salePriceInput ? parseFloat(salePriceInput) : null;
    const hsnCode = document.getElementById('productFormHsn').value.trim();
    const rating = parseFloat(document.getElementById('productFormRating').value) || 4.8;
    const description = document.getElementById('productFormDescription').value.trim();
    const status = document.getElementById('productFormStatus').value;

    const imagesRaw = document.getElementById('productFormImages').value.trim();
    const images = imagesRaw.split('\n').map(s => s.trim()).filter(Boolean);

    if (!name || !category || basePrice <= 0) {
      this.showToast('Please enter a valid product name, category, and base price.', 'danger');
      return;
    }

    // Extract variants
    const variantRows = document.querySelectorAll('#productFormVariantsContainer .variant-row');
    const variants = [];

    variantRows.forEach((row, idx) => {
      const varId = row.getAttribute('data-var-id') || `var-${Date.now()}-${idx}`;
      const sku = row.querySelector('.var-sku')?.value.trim() || `SKU-${Date.now()}-${idx}`;
      const stock = parseInt(row.querySelector('.var-stock')?.value, 10) || 0;
      const price = parseFloat(row.querySelector('.var-price')?.value) || basePrice;

      const variant = { id: varId, sku, stock, price };

      if (businessId === 'riyaa-trends') {
        variant.size = row.querySelector('.var-size')?.value.trim() || 'M';
        variant.color = row.querySelector('.var-color')?.value.trim() || 'Standard';
      } else if (businessId === 'glow-home') {
        variant.fragrance = row.querySelector('.var-fragrance')?.value.trim() || 'Botanical';
        variant.size = row.querySelector('.var-size')?.value.trim() || 'Standard';
      } else if (businessId === 'earkart') {
        variant.material = row.querySelector('.var-material')?.value.trim() || '18K Vermeil';
        variant.color = row.querySelector('.var-color')?.value.trim() || 'Gold';
      }

      variants.push(variant);
    });

    const productPayload = {
      id: this.editingProductId,
      businessId,
      name,
      category,
      basePrice,
      salePrice,
      hsnCode,
      rating,
      images: images.length > 0 ? images : [businessId === 'glow-home' ? 'assets/glow-home/IMG_20260816_171236.jpg' : businessId === 'earkart' ? 'assets/earkart/earkart-daisy-pair-original.jpg' : 'assets/riyaa-trends/IMG-20260222-WA0041.jpg'],
      variants,
      status
    };

    window.limetreeStorage.saveProduct(productPayload);
    this.closeModal('productFormModal');
    this.showToast(`Product "${name}" saved successfully.`, 'success');
    this.renderProducts();
  }

  deleteProductConfirm(productId) {
    const product = window.limetreeStorage.getProductById(productId);
    if (!product) return;

    if (confirm(`Are you sure you want to permanently remove "${product.name}" from catalog?`)) {
      window.limetreeStorage.deleteProduct(productId);
      this.showToast(`Product "${product.name}" deleted.`, 'info');
      this.renderProducts();
    }
  }

  // ==================== VARIANT STOCK ADJUSTMENT MODAL ====================
  openStockAdjustmentModal(productId, variantId = null) {
    const product = window.limetreeStorage.getProductById(productId);
    if (!product) return;

    const modalTitle = document.getElementById('stockModalTitle');
    if (modalTitle) modalTitle.textContent = `Stock Adjustment: ${product.name}`;

    const container = document.getElementById('stockModalVariantsContainer');
    if (!container) return;

    container.innerHTML = (product.variants || []).map(v => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.8rem; background: var(--color-bg-base); border-radius: var(--radius-sm); margin-bottom: 0.6rem;">
        <div>
          <div style="font-weight: 600;">SKU: ${v.sku}</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">${window.limetreeStorage.formatVariantLabel(product.businessId, v)}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <label style="font-size: 0.78rem; text-transform: uppercase; font-weight: 600;">New Units:</label>
          <input type="number" class="form-control stock-input-field" data-prod-id="${product.id}" data-var-id="${v.id}" value="${v.stock}" min="0" style="width: 90px; text-align: center;" />
        </div>
      </div>
    `).join('');

    document.getElementById('stockAdjustmentReason').value = 'Physical Stock Audit Verification';
    this.openModal('stockAdjustmentModal');
  }

  saveStockAdjustmentFromModal() {
    const reason = document.getElementById('stockAdjustmentReason').value.trim() || 'Inventory Correction';
    const inputs = document.querySelectorAll('#stockModalVariantsContainer .stock-input-field');

    let updatedCount = 0;
    inputs.forEach(input => {
      const prodId = input.getAttribute('data-prod-id');
      const varId = input.getAttribute('data-var-id');
      const newStock = parseInt(input.value, 10);

      if (!isNaN(newStock) && newStock >= 0) {
        window.limetreeStorage.updateVariantStock(prodId, varId, newStock, reason);
        updatedCount++;
      }
    });

    this.closeModal('stockAdjustmentModal');
    this.showToast(`Updated stock for ${updatedCount} variant(s).`, 'success');
    this.renderCurrentTab();
  }

  // ==================== BULK CSV IMPORT ====================
  renderBulkUpload() {
    this.csvPreviewRows = [];
    const previewContainer = document.getElementById('csvPreviewContainer');
    if (previewContainer) previewContainer.style.display = 'none';

    const fileInput = document.getElementById('csvFileInput');
    if (fileInput) fileInput.value = '';
  }

  handleCsvFileSelect(file) {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      this.showToast('Please select a valid .csv file.', 'danger');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      this.parseAndValidateCsv(text);
    };
    reader.readAsText(file);
  }

  parseAndValidateCsv(csvText) {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) {
      this.showToast('CSV file appears empty or missing rows.', 'danger');
      return;
    }

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    const requiredHeaders = ['businessId', 'category', 'name', 'basePrice', 'sku', 'stock'];
    const missing = requiredHeaders.filter(rh => !headers.includes(rh));

    if (missing.length > 0) {
      this.showToast(`CSV is missing mandatory columns: ${missing.join(', ')}`, 'danger');
      return;
    }

    const validBusinesses = ['riyaa-trends', 'glow-home', 'earkart'];
    const existingProducts = window.limetreeStorage.getProducts({ includeOutOfStock: true });
    const existingSkus = new Set();
    existingProducts.forEach(p => (p.variants || []).forEach(v => existingSkus.add(v.sku.toLowerCase())));

    const seenInCsvSkus = new Set();
    const parsedRows = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Simple CSV split (handling quoted comma items)
      const values = this.splitCsvLine(line);
      const rowObj = {};
      headers.forEach((h, idx) => {
        rowObj[h] = values[idx] !== undefined ? values[idx].trim().replace(/^["']|["']$/g, '') : '';
      });

      const errors = [];
      if (!validBusinesses.includes(rowObj.businessId)) {
        errors.push(`Invalid businessId "${rowObj.businessId}". Must be riyaa-trends, glow-home, or earkart.`);
      }
      if (!rowObj.name) errors.push('Product name is required.');
      if (!rowObj.sku) errors.push('SKU is required.');

      const price = parseFloat(rowObj.basePrice);
      if (isNaN(price) || price <= 0) errors.push('Base price must be positive number.');

      const stock = parseInt(rowObj.stock, 10);
      if (isNaN(stock) || stock < 0) errors.push('Stock must be positive integer.');

      // Check duplicates
      const lowerSku = (rowObj.sku || '').toLowerCase();
      if (seenInCsvSkus.has(lowerSku)) {
        errors.push(`Duplicate SKU in CSV: ${rowObj.sku}`);
      } else {
        seenInCsvSkus.add(lowerSku);
      }

      parsedRows.push({
        rowNumber: i + 1,
        data: rowObj,
        isValid: errors.length === 0,
        errors,
        isExistingSku: existingSkus.has(lowerSku)
      });
    }

    this.csvPreviewRows = parsedRows;
    this.renderCsvPreview();
  }

  splitCsvLine(line) {
    const result = [];
    let insideQuote = false;
    let entry = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        result.push(entry);
        entry = '';
      } else {
        entry += char;
      }
    }
    result.push(entry);
    return result;
  }

  renderCsvPreview() {
    const previewContainer = document.getElementById('csvPreviewContainer');
    if (!previewContainer) return;

    previewContainer.style.display = 'block';

    const validCount = this.csvPreviewRows.filter(r => r.isValid).length;
    const invalidCount = this.csvPreviewRows.length - validCount;

    document.getElementById('csvValidCount').textContent = `${validCount} Valid Row${validCount !== 1 ? 's' : ''}`;
    document.getElementById('csvInvalidCount').textContent = `${invalidCount} Invalid Row${invalidCount !== 1 ? 's' : ''}`;

    const tbody = document.getElementById('csvPreviewTbody');
    if (!tbody) return;

    tbody.innerHTML = this.csvPreviewRows.slice(0, 15).map(r => `
      <tr style="${r.isValid ? '' : 'background: rgba(220, 53, 69, 0.05);'}">
        <td>${r.rowNumber}</td>
        <td><strong>${r.data.businessId}</strong></td>
        <td>${r.data.name}</td>
        <td><code>${r.data.sku}</code> ${r.isExistingSku ? '<span class="badge badge-warning" style="font-size: 0.65rem;">Existing SKU</span>' : ''}</td>
        <td>₹${r.data.basePrice}</td>
        <td>${r.data.stock} units</td>
        <td>
          ${r.isValid
            ? '<span class="status-pill status-active">Valid</span>'
            : `<span class="status-pill status-cancelled" title="${r.errors.join('; ')}">Error: ${r.errors[0]}</span>`}
        </td>
      </tr>
    `).join('');

    const importBtn = document.getElementById('csvExecuteImportBtn');
    if (importBtn) {
      importBtn.disabled = validCount === 0;
      importBtn.textContent = `Import ${validCount} Valid Product${validCount !== 1 ? 's' : ''}`;
    }
  }

  executeCsvImport() {
    const validRows = this.csvPreviewRows.filter(r => r.isValid);
    if (validRows.length === 0) return;

    let importedCount = 0;
    validRows.forEach(row => {
      const d = row.data;
      const basePrice = parseFloat(d.basePrice) || 999;
      const salePrice = d.salePrice ? parseFloat(d.salePrice) : null;
      const stock = parseInt(d.stock, 10) || 0;

      // Check if product with same name exists or create new
      const newProduct = {
        id: 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        businessId: d.businessId,
        category: d.category || 'general',
        name: d.name,
        description: d.description || `Handcrafted premium ${d.name} under our ${d.businessId} house.`,
        basePrice,
        salePrice,
        hsnCode: d.hsnCode || '000000',
        images: d.imageUrl ? [d.imageUrl] : [d.businessId === 'glow-home' ? 'assets/glow-home/IMG_20260816_171236.jpg' : d.businessId === 'earkart' ? 'assets/earkart/earkart-daisy-pair-original.jpg' : 'assets/riyaa-trends/IMG-20260222-WA0041.jpg'],
        variants: [
          {
            id: 'var-' + Date.now(),
            sku: d.sku,
            size: d.size || 'Standard',
            color: d.color || 'Standard',
            fragrance: d.fragrance || 'Botanical',
            material: d.material || 'Standard',
            stock,
            price: salePrice || basePrice
          }
        ],
        status: 'active'
      };

      window.limetreeStorage.saveProduct(newProduct);
      importedCount++;
    });

    this.showToast(`Successfully imported ${importedCount} products into LIMETREE catalog.`, 'success');
    this.csvPreviewRows = [];
    document.getElementById('csvPreviewContainer').style.display = 'none';
    this.switchTab('products');
  }

  downloadCsvTemplate() {
    const headers = 'businessId,category,name,description,basePrice,salePrice,sku,size,color,fragrance,material,stock,hsnCode,imageUrl';
    const sampleRows = [
      'riyaa-trends,t-shirts,Heritage Relaxed Cotton Tee,100% Combed 240 GSM organic cotton t-shirt,1299,999,RT-TEE-M-BLK,M,Carbon Black,,,40,610910,assets/riyaa-trends/IMG-20260222-WA0041.jpg',
      'glow-home,scented-candles,French Velvet Lavender Candle,Natural soy wax candle with therapeutic essential oils,1499,1299,GH-CND-LAV-M,,Lavender,French Lavender,,30,340600,assets/glow-home/IMG_20260816_171236.jpg',
      'earkart,pearl-drops,Cascade 18K Pearl Drops,Hypoallergenic freshwater pearl drops with vermeil gold finish,2499,1999,EK-STU-PRL-GLD,,Warm Gold,,18K Gold Vermeil,15,711790,assets/earkart/earkart-baroque-pearls.jpg'
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...sampleRows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'limetree_catalog_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ==================== INVENTORY & LIFO TAB ====================
  renderInventory() {
    const lifoReport = window.limetreeStorage.getLIFOCostingReport();

    const totalValEl = document.getElementById('lifoTotalValuationDisplay');
    if (totalValEl) totalValEl.textContent = `₹${lifoReport.totalValuation.toLocaleString('en-IN')}`;

    const totalUnitsEl = document.getElementById('lifoTotalUnitsDisplay');
    if (totalUnitsEl) totalUnitsEl.textContent = `${lifoReport.totalRemainingUnits.toLocaleString('en-IN')} units`;

    const tbody = document.getElementById('lifoBatchesTbody');
    if (!tbody) return;

    if (lifoReport.batches.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 2rem; color: var(--color-text-muted);">No inventory batches recorded.</td></tr>`;
      return;
    }

    tbody.innerHTML = lifoReport.batches.map(b => `
      <tr>
        <td><code>${b.batchId}</code></td>
        <td>${new Date(b.receivedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
        <td><strong>${b.sku}</strong></td>
        <td>${b.quantityReceived} units</td>
        <td>
          <span style="font-weight: 700; ${b.quantityRemaining === 0 ? 'color: var(--color-danger);' : 'color: var(--color-success);'}">
            ${b.quantityRemaining} remaining
          </span>
        </td>
        <td>₹${b.costPerUnit}</td>
        <td><strong>₹${b.valuation.toLocaleString('en-IN')}</strong></td>
      </tr>
    `).join('');
  }

  // ==================== ORDERS TAB ====================
  renderOrders() {
    const orders = window.limetreeStorage.getOrders();
    const tbody = document.getElementById('adminOrdersTbody');
    if (!tbody) return;

    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 3rem; color: var(--color-text-muted);">No orders found.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td>
          <strong>${o.orderId}</strong>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${o.invoiceNumber}</div>
        </td>
        <td>${new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
        <td>
          <div style="font-weight: 600;">${o.customer.name}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${o.customer.email} · ${o.customer.phone}</div>
        </td>
        <td>
          <strong>₹${o.totalAmount.toLocaleString('en-IN')}</strong>
          <div style="font-size: 0.72rem; color: var(--color-success);">${o.paymentMethod}</div>
        </td>
        <td>
          <select class="form-control" style="font-size: 0.78rem; padding: 0.35rem 0.6rem; font-weight: 600;" onchange="window.limetreeAdmin.updateOrderStatusDirect('${o.orderId}', this.value)">
            <option value="Confirmed" ${o.fulfillmentStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${o.fulfillmentStatus === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.fulfillmentStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.fulfillmentStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.fulfillmentStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div style="font-size: 0.8rem;"><code>${o.trackingNumber || 'Pending'}</code></div>
          <div style="font-size: 0.72rem; color: var(--color-text-muted);">${o.carrier || ''}</div>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="window.limetreeAdmin.viewOrderInvoice('${o.orderId}')">
            📄 Invoice
          </button>
        </td>
      </tr>
    `).join('');
  }

  updateOrderStatusDirect(orderId, newStatus) {
    let tracking = '';
    let carrier = '';
    if (newStatus === 'Shipped') {
      tracking = prompt('Enter logistics tracking number (e.g. DEL-7729104):', 'DEL-' + Math.floor(1000000000 + Math.random() * 9000000000));
      carrier = prompt('Enter logistics carrier:', 'Delhivery Surface Logistics');
    }
    window.limetreeStorage.updateOrderStatus(orderId, newStatus, tracking, carrier);
    this.showToast(`Order ${orderId} updated to ${newStatus}.`, 'success');
  }

  viewOrderInvoice(orderId) {
    const order = window.limetreeStorage.getOrderById(orderId);
    if (!order) return;

    if (window.limetreeStore && typeof window.limetreeStore.showInvoiceModal === 'function') {
      window.limetreeStore.showInvoiceModal(order);
    } else {
      alert(`Invoice ${order.invoiceNumber}\nCustomer: ${order.customer.name}\nTotal: ₹${order.totalAmount}\nStatus: ${order.fulfillmentStatus}`);
    }
  }

  // ==================== RETURNS TAB ====================
  renderReturns() {
    const returns = window.limetreeStorage.getReturns();
    const tbody = document.getElementById('adminReturnsTbody');
    if (!tbody) return;

    if (returns.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 3rem; color: var(--color-text-muted);">No return requests on file. 7-Day return policy active.</td></tr>`;
      return;
    }

    tbody.innerHTML = returns.map(r => `
      <tr>
        <td><code>${r.returnId}</code></td>
        <td>${r.orderId}</td>
        <td>
          <div style="font-weight: 600;">${r.customerName}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${r.customerEmail}</div>
        </td>
        <td>
          <div style="font-weight: 600;">${r.reason}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${r.details || 'No additional note'}</div>
        </td>
        <td><strong>₹${(r.refundAmount || 0).toLocaleString('en-IN')}</strong></td>
        <td><span class="status-pill status-${r.status.toLowerCase().replace(' ', '-')}">${r.status}</span></td>
        <td>
          ${r.status === 'Pending Review' ? `
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-primary btn-sm" onclick="window.limetreeAdmin.resolveReturn('${r.returnId}', 'Approved')">Approve</button>
              <button class="btn btn-secondary btn-sm" onclick="window.limetreeAdmin.resolveReturn('${r.returnId}', 'Refunded')">Refund</button>
              <button class="btn btn-sm" style="color: var(--color-danger);" onclick="window.limetreeAdmin.resolveReturn('${r.returnId}', 'Rejected')">Reject</button>
            </div>
          ` : `
            <span style="font-size: 0.78rem; color: var(--color-text-muted);">Resolved</span>
          `}
        </td>
      </tr>
    `).join('');
  }

  resolveReturn(returnId, status) {
    const restock = confirm(`Do you want to restock returned items back into active inventory?`);
    const notes = prompt(`Admin notes for ${status}:`, `Processed by Limetree Support Concierge`);
    window.limetreeStorage.updateReturnStatus(returnId, status, restock, notes);
    this.showToast(`Return ${returnId} marked as ${status}.`, 'success');
  }

  // ==================== REPORTS & FINANCIALS TAB ====================
  renderReports() {
    const orders = window.limetreeStorage.getOrders();
    const paidOrders = orders.filter(o => o.paymentStatus === 'Paid');

    let riyaaRev = 0, glowRev = 0, earkartRev = 0;
    let cgstTotal = 0, sgstTotal = 0, igstTotal = 0;

    paidOrders.forEach(o => {
      (o.items || []).forEach(item => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        if (item.businessId === 'riyaa-trends') riyaaRev += itemTotal;
        else if (item.businessId === 'glow-home') glowRev += itemTotal;
        else if (item.businessId === 'earkart') earkartRev += itemTotal;
      });

      if (o.taxBreakdown) {
        cgstTotal += (o.taxBreakdown.cgst || 0);
        sgstTotal += (o.taxBreakdown.sgst || 0);
        igstTotal += (o.taxBreakdown.igst || 0);
      }
    });

    document.getElementById('reportRiyaaRevenue').textContent = `₹${riyaaRev.toLocaleString('en-IN')}`;
    document.getElementById('reportGlowRevenue').textContent = `₹${glowRev.toLocaleString('en-IN')}`;
    document.getElementById('reportEarkartRevenue').textContent = `₹${earkartRev.toLocaleString('en-IN')}`;

    document.getElementById('reportCgstTotal').textContent = `₹${cgstTotal.toFixed(2)}`;
    document.getElementById('reportSgstTotal').textContent = `₹${sgstTotal.toFixed(2)}`;
    document.getElementById('reportIgstTotal').textContent = `₹${igstTotal.toFixed(2)}`;

    // Render audit trail logs
    const logs = window.limetreeStorage.getAuditLogs();
    const logsContainer = document.getElementById('adminAuditLogsList');
    if (logsContainer) {
      logsContainer.innerHTML = logs.slice(0, 20).map(l => `
        <div style="padding: 0.65rem 0.85rem; border-bottom: 1px solid var(--color-border-subtle); font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="badge badge-info" style="font-size: 0.65rem; margin-right: 0.5rem;">${l.action}</span>
            <span>${l.details}</span>
          </div>
          <span style="color: var(--color-text-muted); font-size: 0.72rem; white-space: nowrap; margin-left: 1rem;">
            ${new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      `).join('');
    }
  }

  exportOrdersCsv() {
    const orders = window.limetreeStorage.getOrders();
    if (orders.length === 0) {
      this.showToast('No orders available to export.', 'info');
      return;
    }

    const headers = 'OrderId,InvoiceNumber,Date,CustomerName,CustomerEmail,CustomerPhone,TotalAmount,PaymentStatus,FulfillmentStatus,TrackingNumber';
    const rows = orders.map(o => [
      o.orderId,
      o.invoiceNumber,
      `"${o.date}"`,
      `"${o.customer.name}"`,
      `"${o.customer.email}"`,
      `"${o.customer.phone}"`,
      o.totalAmount,
      o.paymentStatus,
      o.fulfillmentStatus,
      `"${o.trackingNumber || ''}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `limetree_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Orders export generated.', 'success');
  }

  // ==================== SETTINGS TAB ====================
  renderSettings() {
    const s = window.limetreeStorage.getSettings();
    document.getElementById('settingStoreName').value = s.storeName || 'LIMETREE Multi-Business Retail Platform';
    document.getElementById('settingGstin').value = s.gstin || '33AAAAA0000A1Z5';
    document.getElementById('settingThreshold').value = s.freeShippingThreshold || 999;
    document.getElementById('settingLowStockThreshold').value = s.lowStockThreshold || 5;
    document.getElementById('settingHideOutOfStock').checked = !!s.hideOutOfStock;
  }

  saveSettingsFromForm() {
    const storeName = document.getElementById('settingStoreName').value.trim();
    const gstin = document.getElementById('settingGstin').value.trim();
    const freeShippingThreshold = parseFloat(document.getElementById('settingThreshold').value) || 999;
    const lowStockThreshold = parseInt(document.getElementById('settingLowStockThreshold').value, 10) || 5;
    const hideOutOfStock = document.getElementById('settingHideOutOfStock').checked;

    window.limetreeStorage.saveSettings({
      storeName,
      gstin,
      freeShippingThreshold,
      lowStockThreshold,
      hideOutOfStock
    });

    this.showToast('Store settings updated successfully.', 'success');
  }

  // ==================== HELPERS & MODALS ====================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  showToast(message, type = 'info') {
    if (window.limetreeStore && typeof window.limetreeStore.showToast === 'function') {
      window.limetreeStore.showToast(message, type);
    } else {
      let toast = document.getElementById('adminToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'adminToast';
        toast.style.position = 'fixed';
        toast.style.bottom = '2rem';
        toast.style.right = '2rem';
        toast.style.padding = '0.85rem 1.4rem';
        toast.style.borderRadius = '8px';
        toast.style.background = '#365314';
        toast.style.color = '#FFFFFF';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '500';
        toast.style.transition = 'all 0.3s ease';
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.style.display = 'block';
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.style.display = 'none', 300);
      }, 3500);
    }
  }

  bindEventListeners() {
    // Business selector in add/edit form change
    const businessSelect = document.getElementById('productFormBusiness');
    if (businessSelect) {
      businessSelect.addEventListener('change', (e) => {
        if (!this.editingProductId) {
          this.renderVariantFieldsForBusiness(e.target.value);
        }
      });
    }

    // CSV File drop zone
    const dropZone = document.getElementById('csvDropZone');
    const fileInput = document.getElementById('csvFileInput');
    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
      dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
          this.handleCsvFileSelect(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleCsvFileSelect(e.target.files[0]);
        }
      });
    }

    // Search and filter in products tab
    const productSearch = document.getElementById('adminProductSearch');
    if (productSearch) {
      productSearch.addEventListener('input', () => this.renderProducts());
    }
    const productFilterBusiness = document.getElementById('adminProductFilterBusiness');
    if (productFilterBusiness) {
      productFilterBusiness.addEventListener('change', () => this.renderProducts());
    }
  }
}

// Global instance
window.limetreeAdmin = new LimetreeAdmin();
