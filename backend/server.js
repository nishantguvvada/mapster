const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const apiLimiter = require('./config/rateLimiter');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/error');

const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Rate limiting
app.use('/api', apiLimiter);

// Connect database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/maps', require('./routes/mapRoutes'));
app.use('/api/geocode', require('./routes/geocodeRoutes'));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 