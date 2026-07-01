const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  email: String,
  items: [],
  totalAmount: Number,
  shippingAddress: Object,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);