const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addToFavourite,
  removeFromFavourite,
  toggleFavourite,
  getFavourites,
} = require('../controllers/AddToFavouriteController');

router.post('/toggle/:productId', protect, toggleFavourite);
router.post('/:productId', protect, addToFavourite);
router.delete('/:productId', protect, removeFromFavourite);
router.get('/', protect, getFavourites);

module.exports = router;