const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: {
    type: String,
    required: true,
  },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
