const express = require('express');
const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route
router.get('/', getCourses);

// Admin-only routes
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

module.exports = router;
