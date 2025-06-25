import express from 'express';
import {
  getDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  likeDiscussion,
  getStudyGroups,
  createStudyGroup,
  joinStudyGroup,
  leaveStudyGroup,
  getAchievements,
  getUserAchievements
} from '../controllers/communityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/discussions', getDiscussions);
router.get('/discussions/:id', getDiscussion);
router.get('/study-groups', getStudyGroups);
router.get('/achievements', getAchievements);

// Protected routes
router.use(protect);

// Discussion routes
router.post('/discussions', createDiscussion);
router.put('/discussions/:id', updateDiscussion);
router.delete('/discussions/:id', deleteDiscussion);
router.post('/discussions/:id/reply', addReply);
router.post('/discussions/:id/like', likeDiscussion);

// Study group routes
router.post('/study-groups', createStudyGroup);
router.post('/study-groups/:id/join', joinStudyGroup);
router.post('/study-groups/:id/leave', leaveStudyGroup);

// Achievement routes
router.get('/achievements/user', getUserAchievements);

export default router;