import { Discussion, StudyGroup, Achievement } from '../models/Community.js';
import User from '../models/User.js';

// @desc    Get all discussions
// @route   GET /api/community/discussions
// @access  Public
export const getDiscussions = async (req, res) => {
  try {
    const { subject, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (subject) filter.subject = subject;

    const discussions = await Discussion.find(filter)
      .populate('author', 'name avatar')
      .populate('replies.author', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ isPinned: -1, createdAt: -1 });

    const total = await Discussion.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: discussions.length,
      total,
      data: discussions
    });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single discussion
// @route   GET /api/community/discussions/:id
// @access  Public
export const getDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('replies.author', 'name avatar');

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    // Increment views
    discussion.views += 1;
    await discussion.save();

    res.status(200).json({
      success: true,
      data: discussion
    });
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create discussion
// @route   POST /api/community/discussions
// @access  Private
export const createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create({
      ...req.body,
      author: req.user.id
    });

    await discussion.populate('author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Discussion created successfully',
      data: discussion
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update discussion
// @route   PUT /api/community/discussions/:id
// @access  Private
export const updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this discussion'
      });
    }

    Object.assign(discussion, req.body);
    await discussion.save();

    res.status(200).json({
      success: true,
      message: 'Discussion updated successfully',
      data: discussion
    });
  } catch (error) {
    console.error('Update discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete discussion
// @route   DELETE /api/community/discussions/:id
// @access  Private
export const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    // Check if user is author or admin
    if (discussion.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this discussion'
      });
    }

    await discussion.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Discussion deleted successfully'
    });
  } catch (error) {
    console.error('Delete discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add reply to discussion
// @route   POST /api/community/discussions/:id/reply
// @access  Private
export const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    if (discussion.isClosed) {
      return res.status(400).json({
        success: false,
        message: 'Discussion is closed for replies'
      });
    }

    discussion.replies.push({
      content,
      author: req.user.id
    });

    await discussion.save();
    await discussion.populate('replies.author', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Reply added successfully',
      data: discussion.replies[discussion.replies.length - 1]
    });
  } catch (error) {
    console.error('Add reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like discussion
// @route   POST /api/community/discussions/:id/like
// @access  Private
export const likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: 'Discussion not found'
      });
    }

    const likeIndex = discussion.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      // Unlike
      discussion.likes.splice(likeIndex, 1);
    } else {
      // Like
      discussion.likes.push(req.user.id);
    }

    await discussion.save();

    res.status(200).json({
      success: true,
      message: likeIndex > -1 ? 'Discussion unliked' : 'Discussion liked',
      data: { likes: discussion.likes.length }
    });
  } catch (error) {
    console.error('Like discussion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get study groups
// @route   GET /api/community/study-groups
// @access  Public
export const getStudyGroups = async (req, res) => {
  try {
    const { subject, page = 1, limit = 10 } = req.query;
    
    let filter = { isActive: true };
    if (subject) filter.subject = subject;

    const studyGroups = await StudyGroup.find(filter)
      .populate('creator', 'name avatar')
      .populate('members.user', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await StudyGroup.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: studyGroups.length,
      total,
      data: studyGroups
    });
  } catch (error) {
    console.error('Get study groups error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create study group
// @route   POST /api/community/study-groups
// @access  Private
export const createStudyGroup = async (req, res) => {
  try {
    const studyGroup = await StudyGroup.create({
      ...req.body,
      creator: req.user.id,
      members: [{
        user: req.user.id,
        role: 'admin'
      }]
    });

    await studyGroup.populate('creator', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Study group created successfully',
      data: studyGroup
    });
  } catch (error) {
    console.error('Create study group error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Join study group
// @route   POST /api/community/study-groups/:id/join
// @access  Private
export const joinStudyGroup = async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({
        success: false,
        message: 'Study group not found'
      });
    }

    // Check if already a member
    const isMember = studyGroup.members.some(
      member => member.user.toString() === req.user.id
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'Already a member of this group'
      });
    }

    // Check if group is full
    if (studyGroup.members.length >= studyGroup.maxMembers) {
      return res.status(400).json({
        success: false,
        message: 'Study group is full'
      });
    }

    studyGroup.members.push({
      user: req.user.id
    });

    await studyGroup.save();

    res.status(200).json({
      success: true,
      message: 'Joined study group successfully'
    });
  } catch (error) {
    console.error('Join study group error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Leave study group
// @route   POST /api/community/study-groups/:id/leave
// @access  Private
export const leaveStudyGroup = async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);

    if (!studyGroup) {
      return res.status(404).json({
        success: false,
        message: 'Study group not found'
      });
    }

    // Remove member
    studyGroup.members = studyGroup.members.filter(
      member => member.user.toString() !== req.user.id
    );

    await studyGroup.save();

    res.status(200).json({
      success: true,
      message: 'Left study group successfully'
    });
  } catch (error) {
    console.error('Leave study group error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get achievements
// @route   GET /api/community/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find()
      .populate('earnedBy.user', 'name avatar')
      .sort({ rarity: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user achievements
// @route   GET /api/community/achievements/user
// @access  Private
export const getUserAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({
      'earnedBy.user': req.user.id
    });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    console.error('Get user achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};