import express from 'express';
import {
  getParentalControls,
  updateParentalControls,
  getChildProgress,
  getChildActivity,
  setTimeControls,
  setContentFilters,
  getSessionLogs
} from '../controllers/parentalController.js';
import { protect, parentalAuth } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Parental control routes
router.get('/:childId', parentalAuth, getParentalControls);
router.put('/:childId', parentalAuth, updateParentalControls);
router.get('/:childId/progress', parentalAuth, getChildProgress);
router.get('/:childId/activity', parentalAuth, getChildActivity);
router.put('/:childId/time-controls', parentalAuth, setTimeControls);
router.put('/:childId/content-filters', parentalAuth, setContentFilters);
router.get('/:childId/session-logs', parentalAuth, getSessionLogs);

export default router;