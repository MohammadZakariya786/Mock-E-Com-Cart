const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Receipt = require('../models/Receipt');

const USER_ID = process.env.MOCK_USER_ID;

// POST /api/checkout
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

    const items = await CartItem.find({ userId: USER_ID }).populate('product');
    if (!items.length) return res.status(400).json({ error: 'Cart is empty' });

    const receiptItems = items.map(i => ({
      productId: i.product._id,
      name: i.product.name,
      price: i.product.price,
      qty: i.qty
    }));

    const total = receiptItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const receipt = new Receipt({
      userId: USER_ID,
      items: receiptItems,
      total,
      customerName: name,
      customerEmail: email
    });

    await receipt.save();
    await CartItem.deleteMany({ userId: USER_ID });

    res.json({ message: 'Checkout successful', receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
