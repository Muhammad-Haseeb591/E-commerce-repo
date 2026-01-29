const express = require("express");
const productController = require("../controllers/ProductController");
const productRouter = express.Router();

productRouter.post("/addproducts", productController.getAddProducts);
productRouter.get("/getproducts",productController.fetchAllProducts)

exports.productRouter = productRouter;