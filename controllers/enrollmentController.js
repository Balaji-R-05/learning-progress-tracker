const User = require('../models/User');
const Course = require('../models/Course');
const sendEmail = require('../utils/sendEmail');

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if already enrolled
    const alreadyEnrolled = user.enrollments.some(
      (enr) => enr.course.toString() === courseId
    );
    if (alreadyEnrolled)
      return res.status(400).json({ message: "Already enrolled in this course" });

    // Enroll the user
    user.enrollments.push({ course: courseId });
    await user.save();

    // Optional: send email
    try {
      await sendEmail(
        user.email,
        "Course Enrollment Successful",
        `Hi ${user.name},\n\nYou've successfully enrolled in the course: ${course.title}.`
      );
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    res.status(200).json({
      message: "Enrolled successfully",
      course: {
        id: course._id,
        title: course.title,
        description: course.description
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update progress (add a completed module)
exports.updateProgress = async (req, res) => {
  const { courseId, module } = req.body;
  const user = await User.findById(req.user._id);

  const enrollment = user.enrollments.find((enr) => enr.course.toString() === courseId);
  if (!enrollment) return res.status(404).json({ message: "Not enrolled in this course" });

  if (!enrollment.completedModules.includes(module)) {
    enrollment.completedModules.push(module);
    await user.save();
  }

  res.status(200).json({ message: "Progress updated" });
};

// Get course progress
exports.getProgress = async (req, res) => {
  const { courseId } = req.params;
  const user = await User.findById(req.user._id).populate('enrollments.course');

  const enrollment = user.enrollments.find((enr) => enr.course._id.toString() === courseId);
  if (!enrollment) return res.status(404).json({ message: "Not enrolled" });

  const totalModules = enrollment.course.modules.length;
  const completedModules = enrollment.completedModules.length;
  const progress = totalModules === 0 ? 0 : Math.floor((completedModules / totalModules) * 100);

  res.status(200).json({
    course: enrollment.course.title,
    completedModules,
    totalModules,
    progress: `${progress}%`
  });
};
