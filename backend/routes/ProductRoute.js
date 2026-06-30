const express = require("express")
const productController = require("../controllers/AdminController");
const productRouter = express.Router();
// productRouter.post("/getproducts/:id",productController.fetchProductDetailsById)
productRouter.get("/getproducts",productController.fetchAllProducts)
productRouter.get("/getproducts/:id",productController.fetchProductDetailsById)

exports.productRouter = productRouter;