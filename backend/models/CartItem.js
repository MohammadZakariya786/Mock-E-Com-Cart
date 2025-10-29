const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  qty: { type: Number, default: 1 }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
