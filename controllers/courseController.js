const Course = require('../models/Course');

// Create course (Admin)
exports.createCourse = async (req, res) => {
  const { title, description, modules } = req.body;
  try {
    const course = await Course.create({ title, description, modules });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses (Public)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course (Admin)
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course (Admin)
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
