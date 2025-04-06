const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/savings-goals.controller');

router.use(auth);

router.get('/', getGoals);
router.post('/', addGoal);
router.put('/:goalId', updateGoal);
router.delete('/:goalId', deleteGoal);

module.exports = router;
