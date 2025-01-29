const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000, // 1 hour
  max: process.env.RATE_LIMIT_MAX || 1000,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after an hour'
  }
});

module.exports = apiLimiter;