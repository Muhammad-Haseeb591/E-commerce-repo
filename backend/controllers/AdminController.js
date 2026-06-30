const Product = require("../models/AdminProductSchema");

// ── 1. Add Product ───────────────────────────────
exports.getAddProducts = async (req, res) => {
  try {
    const {
      name, description, images,
      price, oldPrice, color, bg,
      discount, rating, sizes,
      category, stock, status,
    } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const product = new Product({
      name, description, images,
      price, oldPrice, color, bg,
      discount, rating, sizes,
      category, stock, status,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });

  } catch (error) {
    console.error("Add error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// ── 2. Fetch All Products ────────────────────────
exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ── 3. Fetch Single Product by ID ───────────────
exports.fetchProductDetailsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, product });

  } catch (error) {
    console.error("Detail error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── 4. Delete Product ────────────────────────────
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted!",
      product: deleted,
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── 5. Update Product ────────────────────────────
exports.updateProduct = async (req, res) => {
  try {
    const {
      name, description, images,
      price, oldPrice, color, bg,
      discount, rating, sizes,
      category, stock, status,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name, description, images,
        price, oldPrice, color, bg,
        discount, rating, sizes,
        category, stock, status,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated!",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};