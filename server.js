/**
 * LIMETREE - Multi-Business Retail Platform Server
 * Node.js Express static server and REST API endpoints.
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets from project root
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'LIMETREE',
    businesses: ['Riyaa Trends', 'Glow Home', 'Earkart'],
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Businesses metadata endpoint
app.get('/api/businesses', (req, res) => {
  res.json({
    'riyaa-trends': {
      id: 'riyaa-trends',
      name: 'Riyaa Trends',
      category: 'Clothing & Fashion',
      gstRate: 5,
      hsnCode: '610910'
    },
    'glow-home': {
      id: 'glow-home',
      name: 'Glow Home',
      category: 'Scented Candles & Home Fragrance',
      gstRate: 18,
      hsnCode: '340600'
    },
    'earkart': {
      id: 'earkart',
      name: 'Earkart',
      category: 'Handcrafted Ear Studs & Jewellery',
      gstRate: 3,
      hsnCode: '711790'
    }
  });
});

// Payment signature verification mock
app.post('/api/payments/verify-signature', (req, res) => {
  const { paymentId, orderId, signature } = req.body;
  // Simulated gateway verification
  res.json({
    verified: true,
    paymentId: paymentId || ('pay_' + Date.now()),
    orderId: orderId || ('order_' + Date.now()),
    status: 'captured',
    gateway: 'Razorpay / Cashfree Secure Simulation'
  });
});

// Fallback to index.html for root or unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  🌿 LIMETREE Multi-Business Platform is LIVE!`);
    console.log(`  Local URL:  http://localhost:${PORT}`);
    console.log(`  Admin URL:  http://localhost:${PORT}/admin.html`);
    console.log(`  Orders:     http://localhost:${PORT}/orders.html`);
    console.log(`====================================================`);
  });
}

module.exports = app;
