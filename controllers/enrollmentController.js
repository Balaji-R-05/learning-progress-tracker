import User from '../models/User.js';
import Course from '../models/Course.js';
import sendEmail from '../utils/sendEmail.js';

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ success: false, message: "Course ID is required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const alreadyEnrolled = user.enrollments.some(
      (enr) => enr.course.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" });
    }

    user.enrollments.push({ course: courseId });
    await user.save();

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
      success: true,
      message: "Enrolled successfully",
      data: {
        course: {
          id: course._id,
          title: course.title,
          description: course.description
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update course progress
export const updateProgress = async (req, res) => {
  const { courseId, module } = req.body;

  if (!courseId || !module) {
    return res.status(400).json({ success: false, message: "Course ID and module name are required" });
  }

  try {
    const user = await User.findById(req.user._id);
    const enrollment = user.enrollments.find((enr) => enr.course.toString() === courseId);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Not enrolled in this course" });
    }

    if (!enrollment.completedModules.includes(module)) {
      enrollment.completedModules.push(module);
      await user.save();
    }

    res.status(200).json({ success: true, message: "Progress updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get course progress
export const getProgress = async (req, res) => {
  const { courseId } = req.params;

  try {
    const user = await User.findById(req.user._id).populate('enrollments.course');
    const enrollment = user.enrollments.find((enr) => enr.course._id.toString() === courseId);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Not enrolled in this course" });
    }

    const totalModules = enrollment.course.modules.length;
    const completedModules = enrollment.completedModules.length;
    const progress = totalModules === 0 ? 0 : Math.floor((completedModules / totalModules) * 100);

    res.status(200).json({
      success: true,
      data: {
        course: enrollment.course.title,
        completedModules,
        totalModules,
        progress: `${progress}%`
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
