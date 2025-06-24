import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getCourses);

// Admin-only routes
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

export default router;