const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const auth = require('../middleware/auth.middleware');

// All routes are protected
router.use(auth);

router.get('/', progressController.getAllProgress);
router.get('/:moduleId', progressController.getModuleProgress);
router.post('/:moduleId', progressController.updateProgress);

module.exports = router;