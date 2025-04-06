const Progress = require('../models/progress.model');

/**
 * Get all progress for a user
 */
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id });
    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

/**
 * Get progress for a specific module
 */
exports.getModuleProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ 
      userId: req.user._id, 
      moduleId: req.params.moduleId 
    });
    
    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }
    
    res.json(progress);
  } catch (error) {
    console.error('Get module progress error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

/**
 * Update progress for a module
 */
exports.updateProgress = async (req, res) => {
  try {
    const { completed, score, timeSpent } = req.body;
    
    // Find existing progress or create new one
    let progress = await Progress.findOne({ 
      userId: req.user._id, 
      moduleId: req.params.moduleId 
    });
    
    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        moduleId: req.params.moduleId
      });
    }
    
    // Update fields
    if (completed !== undefined) progress.completed = completed;
    if (score !== undefined) progress.score = score;
    if (timeSpent !== undefined) progress.timeSpent += timeSpent; // Add to existing time
    progress.lastAccessed = Date.now();
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};