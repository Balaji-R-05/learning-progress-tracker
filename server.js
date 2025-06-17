const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// // Middleware
app.use(cors());
app.use(express.json());

// Routes
// Authentication Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Course Routes
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

// Enrollment Routes
const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/api/user', enrollmentRoutes);


// Swagger Routes
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Certificate Routes
const certificateRoutes = require('./routes/certificateRoutes');
app.use('/api', certificateRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('✅ DevifyX API is running!');
});

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });