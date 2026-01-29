const Product  = require("../models/productSchema")
exports.getAddProducts = async (req, res) => {
    try {
        const {
          name,
          description,
          images,  // Array of image URLs
          price,
          oldPrice,
          color,
          bg,
          discount,
          rating,
          sizes,
          category,
        } = req.body;
          // Validation - Check if images array has at least 1 image
        if (!images || images.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'At least one image is required'
          });
        }
        console.log("Request Body:", req.body);
        const product = new Product({name,images,description,oldPrice,color,bg,discount,rating,sizes,category,createdAt})
        const savDbProduct =await product.save()
        console.log(savDbProduct,"product added successfully")
    }catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Failed to add products"
        });
      }
}  
exports.fetchAllProducts = async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json({
          success: true,
          count: products.length,
          products
        });
      } catch (error) {
        console.error(error);
        res.status(404).json({
          success: false,
          message: "Failed to fetch products"
        });
      }
}
