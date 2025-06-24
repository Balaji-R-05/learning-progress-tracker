import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
