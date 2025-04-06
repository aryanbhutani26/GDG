const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendation.controller');
const auth = require('../middleware/auth.middleware');

// All routes are protected
router.use(auth);

router.get('/', recommendationController.getAllRecommendations);
router.post('/', recommendationController.createRecommendation);
router.delete('/:id', recommendationController.deleteRecommendation);

module.exports = router;