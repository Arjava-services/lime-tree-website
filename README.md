# LIMETREE — Premium Multi-Business E-Commerce Platform

A production-oriented, responsive multi-business lifestyle retail platform uniting three distinct artisan houses under one unified shopping experience:

1. **Riyaa Trends** — Modern Apparel & Fashion (Heavyweight organic cotton t-shirts, tailored French terry trackpants, utility cargo shorts with size/color variants and SKU tracking).
2. **Glow Home** — Artisan Scented Candles & Home Fragrance (100% natural soy & coconut wax, lead-free cotton & crackling wood wicks, fragrance notes, 150g–400g jar sizes).
3. **Earkart** — Fine Fashion Jewellery (Hypoallergenic 18K gold vermeil, 925 sterling silver, cultured freshwater pearls, emerald CZ studs and huggies).

---

## 🎨 Strict Color Palette & Luxury Design System

Complies strictly with the defined design system:
- **Primary:** Deep Luxurious Forest Green (`#133E2B` / `#0E291C`)
- **Secondary:** Clean Crisp White (`#FFFFFF`)
- **Background:** Soft Ivory / Warm Neutral Cream (`#FAF8F5`)
- **Accent:** Subtle Lavender (`#8E7DBE`) & Muted Sage (`#6B8E7D`)
- **Text:** Deep Charcoal / Near-Black (`#181C1A`)
- **Borders & Dividers:** Refined Soft Grey (`#E2E6E3`)
- **Strict Rule:** **Zero brown, chocolate, tan, or coffee tones anywhere.**
- **Typography:** *Playfair Display* (Editorial luxury headings) + *Plus Jakarta Sans* (Crisp modern body).

---

## 🚀 How to Run the Website

You can run Limetree in either of two ways:

### Method 1: Using Node.js Server (Recommended for Full REST API)
1. Open terminal in the project directory:
   ```bash
   cd Limetree
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   - **Storefront:** [http://localhost:3000](http://localhost:3000)
   - **Riyaa Trends Boutique:** [http://localhost:3000/riyaa-trends.html](http://localhost:3000/riyaa-trends.html)
   - **Glow Home Boutique:** [http://localhost:3000/glow-home.html](http://localhost:3000/glow-home.html)
   - **Earkart Boutique:** [http://localhost:3000/earkart.html](http://localhost:3000/earkart.html)
   - **Track Orders & Returns:** [http://localhost:3000/orders.html](http://localhost:3000/orders.html)
   - **Executive Admin Dashboard:** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

### Method 2: Zero-Dependency Browser / VS Code Live Server
Because the frontend is built entirely using **pure HTML5, CSS3, and modern Vanilla JavaScript (ES6+)**, you can run it completely standalone without Node.js:
1. Open this workspace in **VS Code**.
2. Right-click on `index.html` and choose **"Open with Live Server"** (or double-click `index.html` directly to open in Chrome/Edge/Firefox/Safari).
3. The built-in client-side storage engine (`js/storage.js`) automatically initializes sample data, cart, stock tracking, and orders in browser persistent storage.

---

## 🛠️ Complete Feature Matrix

### 1. Storefront & Navigation
- **Announcement Bar:** Dismissible promotional bar with active discount codes.
- **Sticky Glassmorphic Header:** Wordmark branding, responsive navigation, live product search with instant dropdown preview, live wishlist badge, and live animated shopping bag counter.
- **Hero Showcase:** Luxury editorial presentation with lifestyle visuals and quick-action buttons.
- **Three Business Showcase Hubs:** Dedicated cards with tailored photography and direct boutique links for *Riyaa Trends*, *Glow Home*, and *Earkart*.
- **Dynamic Catalog Explorer:** Multi-facet filtering by brand, category, in-stock toggle, and price/rating sorting.
- **Responsive Product Cards:** Hover image scaling, brand badge, discount pill, wishlist heart toggle, variant summary, and quick-view overlay.

### 2. Product Details & Business-Specific Variant Selection
- **Interactive Quick-View Modal:** High-resolution multi-angle image gallery with thumbnail clicks.
- **Strict Attribute Separation:**
  - *Riyaa Trends:* Size selector (S, M, L, XL, XXL) + Color variants (Deep Forest Green, Ivory White, Muted Sage).
  - *Glow Home:* Fragrance blend + Jar Size (150g 30h burn, 250g 50h burn, 400g 3-wick).
  - *Earkart:* Metal purity (18K Gold Vermeil, 925 Sterling Silver) + Stone/Color finish.
- **Live Variant Pricing & SKU:** Prices and stock update dynamically as variants are selected.
- **Live Stock Alerts:** Real-time stock status (*In Stock*, *Only X left*, *Sold Out*).

### 3. Shopping Bag & Checkout Flow
- **Slide-Over Cart Drawer:** Real-time item count, quantity increment/decrement with stock limit validation, and remove actions.
- **Free Shipping Meter:** Dynamic progress bar showing how much more to add to unlock free express delivery.
- **Discount Engine:** Validates promo codes (`LIMETREE10` for 10% off, `FESTIVE20` for 20% off).
- **Checkout Modal:**
  - Customer shipping details with PIN code and country validation.
  - Domestic & International shipping calculation.
  - **Itemized GST Tax Calculation:** Automatically breaks down into **CGST + SGST** (Intra-state) or **IGST** (Inter-state) based on delivery state vs registered location.
  - **Razorpay Test Payment Gateway:** Verified test mode simulator with HMAC signature generation simulation.

### 4. Official GST Tax Invoice Generator
- Automatic generation of sequential Invoice Numbers (e.g. `LT/2026-27/00143`).
- Itemized breakdown of HSN/SAC codes, taxable amounts, GST rates, CGST, SGST, IGST, buyer details, and seller GSTIN (`33AABCL1234F1Z8`).
- **One-Click Printable Format:** Click "Print / Save as PDF" (`window.print()`) formatted cleanly for A4 paper.

### 5. Order Tracking & 7-Day Returns Portal (`orders.html`)
- Order lookup by Order ID + Email.
- Visual fulfillment progress stepper (*Confirmed → Packed → Shipped → Delivered*).
- Courier partner and AWB tracking links.
- Customer 7-day verified return request form with reason classification and photo/packaging condition statement.

### 6. Comprehensive Executive Admin Dashboard (`admin.html`)
- **Overview:** Gross store revenue, order volume, catalog SKUs, out-of-stock alerts, and multi-business revenue share breakdown.
- **Product Management:** Add/edit products with dynamic variant builder, SKU codes, prices, images, and descriptions.
- **Bulk CSV Product Upload Engine:**
  - **Download CSV Template:** Download pre-formatted CSV template.
  - **Drag-and-Drop Parser:** Validates required columns, business IDs, and detects duplicate SKUs against existing inventory.
  - **Preview Table & Error Report:** Shows valid rows and highlights specific errors on invalid rows before committing to the database.
- **Inventory & Stock Tracking:**
  - Variant-level stock overview.
  - Low stock warnings (< 5 units).
  - Stock In / Stock Out adjustment modal with **mandatory audit reason** (*Purchase Inward, Damaged Goods, Cycle Audit, Return Restock*).
  - **"Hide Sold-Out Items from Storefront"** toggle setting.
- **LIFO (Last In, First Out) Inventory Valuation:**
  - Auditable inventory costing engine.
  - Batch inward tracking (*Batch ID, Date, SKU, Inward Cost, Received vs Remaining Units*).
  - Calculates LIFO ending inventory valuation and Cost of Goods Sold (COGS) without affecting customer retail prices.
- **Order Fulfillment Pipeline:**
  - Status updates (*Confirmed, Packed, Shipped, Delivered, Cancelled*).
  - Courier partner assignment and tracking number entry.
  - Order cancellation with automatic inventory restocking option.
  - Instant Tax Invoice viewing and printing.
- **Returns & Refunds Center:** Review customer return requests, approve/reject, initiate refund status, and restock inventory.
- **Sales & Depletion Reports:** Ranked product depletion table and CSV export button.
- **GST & Shipping Settings:** Editable legal entity name, GSTIN, registered address, free shipping threshold, and courier charges.
- **Email Notifications Center:** Previews of automated customer emails with dynamic order variables.
- **Security & Audit Logs:** Immutable chronological log of all stock changes, pricing edits, and order events.

---

## 📁 File Structure

```
Limetree/
├── index.html                 # Unified Luxury Storefront
├── riyaa-trends.html          # Dedicated Boutique for Riyaa Trends (Fashion)
├── glow-home.html             # Dedicated Boutique for Glow Home (Candles)
├── earkart.html               # Dedicated Boutique for Earkart (Jewellery)
├── orders.html                # Customer Order Tracking & 7-Day Return Portal
├── admin.html                 # Complete Executive Admin Dashboard
├── style.css                  # Master Storefront Design System (Tokens, Animations)
├── admin.css                  # Enterprise Admin Dashboard Stylesheet
├── server.js                  # Express REST API Server (Optional backend)
├── package.json               # Node.js project manifest (express, cors)
├── README.md                  # Complete documentation
└── js/
    ├── data.js                # Seed catalog across 3 businesses, HSN codes, batches
    ├── storage.js             # Central State Engine (Persistence, Atomic Stock, LIFO, Orders)
    ├── store.js               # Storefront Logic (Search, Filters, Cart, Checkout, Invoices)
    └── admin.js               # Admin Engine (Metrics, Bulk CSV, Inventory, Reports)
```

---

## 🔒 Security & Quality Assurance

- **Zero Framework Bloat:** Crafted purely in semantic HTML5, modern CSS3, and ES6+ JavaScript.
- **Strict Color Compliance:** Fully avoids brown/tan palettes, utilizing deep forest green, clean white, ivory cream, charcoal, and subtle sage/lavender.
- **Sensitive Credential Protection:** Zero hardcoded payment secrets or API keys. Clear test-mode indicators prevent fraudulent live claims.
- **Accessibility & Responsiveness:** Fluid layouts tested across desktop, tablet, and mobile breakpoints.
#   l i m e - t r e e - w e b s i t e  
 #   l i m e - t r e e - w e b s i t e  
 