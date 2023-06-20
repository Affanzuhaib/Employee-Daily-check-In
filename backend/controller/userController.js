const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Model/usermodel');
const Work = require('../Model/workmodel');

//@desc Register new user
//@route POST /api/users
//@access Private
const registeremployee = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, contact, department, joining_date, role } = req.body;

    if (!name || !email || !password || !contact || !department || !joining_date || !role) {
      return res.status(400).json({ message: 'please add all fields' });
    }
    //check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'user exists' });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.contact,
        department: user.department,
        joining_date: user.joining_date,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    res.json({ message: 'Register User' });
  } catch (error) {
    return res.status(500).json({ message: error || 'server error' });
  }
});

//@desc Authentication a user
//@route POST /api/users/login
//@access Private
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact: user.contact,
        department: user.department,
        joining_date: user.joining_date,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: error || 'server error' });
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: 'Employee' });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error || 'server error' });
  }
});

const getMe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have a User model and req.user contains the authenticated user

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { _id, name, email } = user;

    res.status(200).json({
      id: _id,
      name,
      email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

const getWorksById = asyncHandler(async (req, res) => {
  try {
    const works = await Work.find({ user: req.params.userId });

    res.status(200).json(works);
  } catch (error) {
    console.error(error); // Log the error message to the console
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
};

module.exports = {
  registeremployee,
  loginUser,
  getAllEmployees,
  getMe,
  getWorksById,
};
