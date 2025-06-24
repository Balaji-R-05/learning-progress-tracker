import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.put('/profile', protect, upload.single('avatar'), updateProfile);

export default router;