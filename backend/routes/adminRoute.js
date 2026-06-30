const express = require("express");
const productController = require("../controllers/AdminController");
const { productRouter } = require("./productRoute");

const adminRoute = express.Router();

adminRoute.post("/addproducts",          productController.getAddProducts);
adminRoute.delete("/deleteproduct/:id",  productController.deleteProduct);
adminRoute.put("/updateproduct/:id",     productController.updateProduct);
adminRoute.use("/products",              productRouter);

exports.adminRoute = adminRoute;