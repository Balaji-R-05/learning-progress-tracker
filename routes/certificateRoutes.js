const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { generateCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.get('/certificate/:courseId', protect, generateCertificate);

module.exports = router;
