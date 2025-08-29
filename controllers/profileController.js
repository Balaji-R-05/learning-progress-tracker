import User from '../models/User.js';
import multer from 'multer';

// Config storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}-${file.originalname}`);
  }
});
export const upload = multer({ storage });

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {};
    if (bio) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile. Please try again later.',
      error: err.message
    });
  }
};
