const express = require('express');
const {
  enrollInCourse,
  updateProgress,
  getProgress
} = require('../controllers/enrollmentController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/enroll', protect, enrollInCourse);
router.put('/progress', protect, updateProgress);
router.get('/progress/:courseId', protect, getProgress);

module.exports = router;
