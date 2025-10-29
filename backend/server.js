require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Product = require('./models/Product');

const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');

    // Fetch products once and store in DB if not already present
    const count = await Product.countDocuments();
    if (count === 0) {
      const res = await axios.get(process.env.FAKESTORE_URL);
      const products = res.data.map(p => ({
        name: p.title,
        price: p.price,
        image: p.image,
        description: p.description
      }));
      await Product.insertMany(products);
      console.log('🛒 Fake Store products imported');
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
