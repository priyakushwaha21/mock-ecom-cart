const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Seed products (if empty)
db.init();

app.get('/api/products', async (req, res) => {
  const products = await db.getProducts();
  res.json(products);
});

app.get('/api/cart', async (req, res) => {
  const cart = await db.getCart();
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

app.post('/api/cart', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });
  try {
    const item = await db.addToCart(productId, qty);
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  const id = req.params.id;
  await db.removeFromCart(id);
  res.json({ success: true });
});

app.post('/api/checkout', async (req, res) => {
  const { name, email } = req.body;
  const cart = await db.getCart();
  if (!cart.length) return res.status(400).json({ error: 'Cart empty' });
  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const receipt = { id: nanoid(8), name, email, total, timestamp: new Date().toISOString(), items: cart };
  // Clear cart
  await db.clearCart();
  res.json(receipt);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on', PORT));
