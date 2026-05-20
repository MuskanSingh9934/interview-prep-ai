import Interview from '../models/Interview.js';

/**
 * @desc    Get interview results history
 * @route   GET /api/results
 * @access  Public
 */
export const getResults = async (req, res) => {
  try {
    const history = await Interview.find({ completed: true }).sort({ createdAt: -1 });
    
    res.json({
      completed: true,
      results: history
    });
  } catch (error) {
    console.error('Error retrieving results:', error);
    res.status(500).json({ error: 'Failed to retrieve interview results history' });
  }
};
