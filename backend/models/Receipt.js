const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  userId: String,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    qty: Number
  }],
  total: Number,
  customerName: String,
  customerEmail: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
