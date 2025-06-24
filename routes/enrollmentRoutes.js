import express from 'express';
import {
  enrollInCourse,
  updateProgress,
  getProgress
} from '../controllers/enrollmentController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/enroll', protect, enrollInCourse);
router.put('/progress', protect, updateProgress);
router.get('/progress/:courseId', protect, getProgress);

export default router;