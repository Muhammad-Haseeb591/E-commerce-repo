const router = require("express").Router();
const { getCart, saveCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/save", protect, saveCart);

module.exports = router;