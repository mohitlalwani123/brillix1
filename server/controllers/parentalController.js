import ParentalControl from '../models/ParentalControl.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';

// @desc    Get parental controls
// @route   GET /api/parental/:childId
// @access  Private (Parent/Student)
export const getParentalControls = async (req, res) => {
  try {
    const { childId } = req.params;

    let controls = await ParentalControl.findOne({
      childId,
      parentId: req.user.role === 'parent' ? req.user.id : undefined
    });

    if (!controls) {
      // Create default controls
      controls = await ParentalControl.create({
        parentId: req.user.role === 'parent' ? req.user.id : undefined,
        childId
      });
    }

    res.status(200).json({
      success: true,
      data: controls
    });
  } catch (error) {
    console.error('Get parental controls error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update parental controls
// @route   PUT /api/parental/:childId
// @access  Private (Parent)
export const updateParentalControls = async (req, res) => {
  try {
    const { childId } = req.params;

    const controls = await ParentalControl.findOneAndUpdate(
      { childId, parentId: req.user.id },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Parental controls updated successfully',
      data: controls
    });
  } catch (error) {
    console.error('Update parental controls error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get child progress
// @route   GET /api/parental/:childId/progress
// @access  Private (Parent/Student)
export const getChildProgress = async (req, res) => {
  try {
    const { childId } = req.params;

    const progress = await Progress.find({ userId: childId })
      .sort({ lastAccessed: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    });
  } catch (error) {
    console.error('Get child progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get child activity
// @route   GET /api/parental/:childId/activity
// @access  Private (Parent/Student)
export const getChildActivity = async (req, res) => {
  try {
    const { childId } = req.params;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const progress = await Progress.find({
      userId: childId,
      lastAccessed: { $gte: startDate }
    }).sort({ lastAccessed: -1 });

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get child activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Set time controls
// @route   PUT /api/parental/:childId/time-controls
// @access  Private (Parent)
export const setTimeControls = async (req, res) => {
  try {
    const { childId } = req.params;

    const controls = await ParentalControl.findOneAndUpdate(
      { childId, parentId: req.user.id },
      { timeControls: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Time controls updated successfully',
      data: controls.timeControls
    });
  } catch (error) {
    console.error('Set time controls error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Set content filters
// @route   PUT /api/parental/:childId/content-filters
// @access  Private (Parent)
export const setContentFilters = async (req, res) => {
  try {
    const { childId } = req.params;

    const controls = await ParentalControl.findOneAndUpdate(
      { childId, parentId: req.user.id },
      { contentFilters: req.body },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Content filters updated successfully',
      data: controls.contentFilters
    });
  } catch (error) {
    console.error('Set content filters error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get session logs
// @route   GET /api/parental/:childId/session-logs
// @access  Private (Parent/Student)
export const getSessionLogs = async (req, res) => {
  try {
    const { childId } = req.params;
    const { days = 30 } = req.query;

    const controls = await ParentalControl.findOne({
      childId,
      parentId: req.user.role === 'parent' ? req.user.id : undefined
    });

    if (!controls) {
      return res.status(404).json({
        success: false,
        message: 'Parental controls not found'
      });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sessionLogs = controls.sessionLogs.filter(
      log => log.date >= startDate
    );

    res.status(200).json({
      success: true,
      count: sessionLogs.length,
      data: sessionLogs
    });
  } catch (error) {
    console.error('Get session logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};