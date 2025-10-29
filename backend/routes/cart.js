const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Middleware: get user id from .env (mock)
const USER_ID = process.env.MOCK_USER_ID;

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find({ userId: USER_ID }).populate('product');
    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let item = await CartItem.findOne({ userId: USER_ID, product: productId });
    if (item) {
      item.qty += qty;
    } else {
      item = new CartItem({ userId: USER_ID, product: productId, qty });
    }
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// PATCH /api/cart/:id
router.patch('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty <= 0) return res.status(400).json({ error: 'Quantity must be > 0' });

    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

module.exports = router;
