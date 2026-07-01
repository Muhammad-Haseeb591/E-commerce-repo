const Order = require("../models/Order");

// ==========================
// Create Order
// ==========================
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, email } = req.body;

    const order = await Order.create({
      userId: req.userId || null,
      email,
      items,
      totalAmount,
      shippingAddress,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// Get Logged In User Orders
// ==========================
exports.getOrders = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};