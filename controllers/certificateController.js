const PDFDocument = require('pdfkit');
const Course = require('../models/Course');
const User = require('../models/User');

exports.generateCertificate = async (req, res) => {
  const { courseId } = req.params;
  const user = await User.findById(req.user._id).populate('enrollments.course');

  const enrollment = user.enrollments.find(e => e.course._id.toString() === courseId);
  if (!enrollment) return res.status(404).json({ message: "Not enrolled" });

  const completed = enrollment.completedModules.length;
  const total = enrollment.course.modules.length;

  if (completed < total) {
    return res.status(400).json({ message: "Course not yet completed" });
  }

  // Create PDF
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=certificate.pdf`);
  doc.pipe(res);

  doc.fontSize(20).text("Course Completion Certificate", { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`This certifies that ${user.name} has successfully completed the course: ${enrollment.course.title}`);
  doc.text(`Date: ${new Date().toDateString()}`);
  doc.end();
};
