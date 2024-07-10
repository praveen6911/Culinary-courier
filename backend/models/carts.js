const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true 
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
