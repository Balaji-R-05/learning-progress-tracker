import Course from '../models/Course.js';

// Create course (Admin only)
export const createCourse = async (req, res) => {
  const { title, description, modules } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Missing title or description" });
  }

  try {
    const course = await Course.create({ title, description, modules });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all courses (Public)
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update course (Admin only)
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, modules } = req.body;

  if (!title && !description && !modules) {
    return res.status(400).json({ success: false, message: "At least one field is required for update" });
  }

  try {
    const course = await Course.findByIdAndUpdate(id, { title, description, modules }, { new: true });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete course (Admin only)
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
