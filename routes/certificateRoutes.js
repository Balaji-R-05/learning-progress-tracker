import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { generateCertificate } from '../controllers/certificateController.js';

const router = express.Router();

router.get('/certificate/:courseId', protect, generateCertificate);

export default router;
