const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const { AppError } = require('../middleware/error');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: user
    });
  } catch (err) {
    next(err);
  }
}; 

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({
    status: 'success',
    data: user
  });
};

module.exports = { login, register, getMe }