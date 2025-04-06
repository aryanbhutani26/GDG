const User = require('../models/user.model');

exports.getGoals = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.savingsGoals);
};

exports.addGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;
  const user = await User.findById(req.user.id);
  user.savingsGoals.push({ name, targetAmount, deadline });
  await user.save();
  
   // Get the last goal added (Mongoose adds it in order)
   const addedGoal = user.savingsGoals[user.savingsGoals.length - 1];

   res.status(201).json({ newGoal: addedGoal });
};

exports.updateGoal = async (req, res) => {
  const { goalId } = req.params;
  const updates = req.body;

  const user = await User.findById(req.user.id);
  const goal = user.savingsGoals.id(goalId);
  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  Object.assign(goal, updates);
  await user.save();
  res.json({ updatedGoal: goal });

};

// goalController.js
exports.deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const goal = user.savingsGoals.id(goalId);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // Remove the goal subdocument
    goal.deleteOne();
    await user.save();

    res.json({ message: 'Goal deleted successfully', goalId });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

