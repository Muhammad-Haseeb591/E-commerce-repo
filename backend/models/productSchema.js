const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: { type: Number, required: true },
  // price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: [String], required: true },
  oldPrice: { type: Number, default: null },
  color: { type: String, default: null },
  bg: { type: String, default: null },
  discount: { type: String, default: null },
  rating: { type: Number, default: 0 },
  sizes: { type: [sizeSchema], required: true },
  category: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

// Optional: prevent duplicate sizes
productSchema.path("sizes").validate(function (sizes) {
  const sizeList = sizes.map(s => s.size);
  return sizeList.length === new Set(sizeList).size;
}, "Duplicate sizes are not allowed");
module.exports = mongoose.model("Product", productSchema);



