const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    costForTwo: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    cuisines: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
