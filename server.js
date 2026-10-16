const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Paths
const dataDir = path.join(__dirname, 'data');
const productsFile = path.join(dataDir, 'products.json');
const ordersFile = path.join(dataDir, 'orders.json');
const reviewsFile = path.join(dataDir, 'reviews.json');
const messagesFile = path.join(dataDir, 'messages.json');
const usersFile = path.join(dataDir, 'users.json');

// Helper to read JSON safely
function readJSON(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
}

// Helper to write JSON safely
function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// Initialize seed data if needed
if (!fs.existsSync(ordersFile)) writeJSON(ordersFile, []);
if (!fs.existsSync(messagesFile)) writeJSON(messagesFile, []);
if (!fs.existsSync(reviewsFile)) writeJSON(reviewsFile, []);
if (!fs.existsSync(usersFile)) {
  writeJSON(usersFile, [
    {
      id: "user-1",
      name: "Alex Morgan",
      email: "alex@example.com",
      password: "password123",
      joined: "2026-01-15",
      ordersCount: 2
    }
  ]);
}

// ==========================================
// API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'LimeTree Marketplace', time: new Date() });
});

// GET /api/products
app.get('/api/products', (req, res) => {
  let products = readJSON(productsFile, []);
  const { category, brand, subcategory, search, sort, minPrice, maxPrice, featured } = req.query;

  // Filter by category
  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by brand
  if (brand && brand !== 'All') {
    products = products.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase() || 
      p.brandSlug.toLowerCase() === brand.toLowerCase()
    );
  }

  // Filter by subcategory
  if (subcategory && subcategory !== 'All') {
    products = products.filter(p => p.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  // Search filter
  if (search) {
    const q = search.toLowerCase().trim();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.fragrance && p.fragrance.toLowerCase().includes(q)) ||
      (p.material && p.material.toLowerCase().includes(q))
    );
  }

  // Price range
  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  // Featured
  if (featured === 'true') {
    products = products.filter(p => p.featured);
  }

  // Sorting
  if (sort) {
    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // default featured / bestselling
        break;
    }
  }

  res.json({
    total: products.length,
    products
  });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const products = readJSON(productsFile, []);
  const product = products.find(p => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// GET /api/categories
app.get('/api/categories', (req, res) => {
  res.json([
    {
      id: "clothing",
      name: "Clothing",
      brand: "Riyaa Trends",
      tagline: "Effortless Everyday Streetwear & Loungewear",
      subcategories: ["T-shirts", "Shorts", "Track Pants"],
      image: "images/riyaa_trends_cat.jpg",
      itemCount: 6
    },
    {
      id: "candles",
      name: "Scented Candles",
      brand: "Glow Home",
      tagline: "Hand-Poured Soy Aromatherapy & Cozy Ambiance",
      subcategories: ["Floral & Calming", "Citrus & Uplifting", "Woody & Sensual", "Gourmand & Warm"],
      image: "images/glow_home_cat.jpg",
      itemCount: 6
    },
    {
      id: "studs",
      name: "Studs & Jewelry",
      brand: "Earkart",
      tagline: "Hypoallergenic Fine Gemstones & Modern Geometrics",
      subcategories: ["Solitaire & Classic", "Vintage & Statement", "Pearls & Organic", "Minimalist Geometric"],
      image: "images/earkart_cat.jpg",
      itemCount: 6
    }
  ]);
});

// POST /api/orders
app.post('/api/orders', (req, res) => {
  const { customer, items, shipping, payment, totals, discountCode } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  if (!customer || !customer.email || !customer.name || !customer.address) {
    return res.status(400).json({ error: 'Missing required customer information' });
  }

  const orderId = 'LT-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const deliveryDate = new Date(now.getTime() + (shipping && shipping.method === 'express' ? 2 : 4) * 24 * 60 * 60 * 1000);

  const newOrder = {
    orderId,
    createdAt: now.toISOString(),
    estimatedDelivery: deliveryDate.toDateString(),
    status: 'Confirmed',
    customer,
    items,
    shipping,
    payment: {
      method: payment.method || 'credit-card',
      last4: payment.last4 || '4242'
    },
    totals,
    discountCode: discountCode || null
  };

  const orders = readJSON(ordersFile, []);
  orders.unshift(newOrder);
  writeJSON(ordersFile, orders);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// GET /api/orders
app.get('/api/orders', (req, res) => {
  const { email } = req.query;
  let orders = readJSON(ordersFile, []);
  if (email) {
    orders = orders.filter(o => o.customer && o.customer.email.toLowerCase() === email.toLowerCase());
  }
  res.json({ orders });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readJSON(usersFile, []);
  const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      joined: user.joined
    },
    token: 'limetree-token-' + Date.now()
  });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const users = readJSON(usersFile, []);
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const newUser = {
    id: 'user-' + (users.length + 1),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
    joined: new Date().toISOString().split('T')[0],
    ordersCount: 0
  };

  users.push(newUser);
  writeJSON(usersFile, users);

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      joined: newUser.joined
    },
    token: 'limetree-token-' + Date.now()
  });
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, department } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const messages = readJSON(messagesFile, []);
  const newMsg = {
    id: 'msg-' + Date.now(),
    name,
    email,
    subject: subject || 'General Inquiry',
    department: department || 'Customer Support',
    message,
    receivedAt: new Date().toISOString()
  };

  messages.push(newMsg);
  writeJSON(messagesFile, messages);

  res.json({
    success: true,
    message: 'Thank you for reaching out to LimeTree. Our team will respond within 24 hours!'
  });
});

// POST /api/newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  res.json({
    success: true,
    message: 'Welcome to the LimeTree community! Your 10% coupon code is LIMETREE10',
    coupon: 'LIMETREE10',
    discount: '10%'
  });
});

// POST /api/reviews
app.post('/api/reviews', (req, res) => {
  const { productId, author, rating, title, comment } = req.body;
  if (!productId || !author || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required review fields' });
  }

  const reviews = readJSON(reviewsFile, []);
  const newReview = {
    id: 'rev-' + Date.now(),
    productId,
    author,
    rating: parseInt(rating),
    title: title || 'Verified Purchase Review',
    comment,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    verified: true
  };

  reviews.unshift(newReview);
  writeJSON(reviewsFile, reviews);

  // Recalculate product rating
  const products = readJSON(productsFile, []);
  const product = products.find(p => p.id === productId);
  if (product) {
    const prodReviews = reviews.filter(r => r.productId === productId);
    const sum = prodReviews.reduce((acc, r) => acc + r.rating, 0);
    product.rating = parseFloat((sum / prodReviews.length).toFixed(1));
    product.reviewCount = prodReviews.length;
    writeJSON(productsFile, products);
  }

  res.status(201).json({
    success: true,
    review: newReview
  });
});

// GET /api/reviews/:productId
app.get('/api/reviews/:productId', (req, res) => {
  const reviews = readJSON(reviewsFile, []);
  const prodReviews = reviews.filter(r => r.productId === req.params.productId);
  res.json({ reviews: prodReviews });
});

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🌿 LimeTree Marketplace server running at http://localhost:${PORT}`);
  console.log(`Stores: Riyaa Trends (Clothing) | Glow Home (Candles) | Earkart (Studs)`);
});
