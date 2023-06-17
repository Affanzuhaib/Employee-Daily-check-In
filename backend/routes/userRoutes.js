const express = require('express');
const router = express.Router();
const {
  registeremployee,
  loginUser,
  getMe,
  getAllEmployees,
  getWorksById,
} = require('../controller/userController');
const { protect, Adminprotect } = require('../middleware/authmiddleware');

router.post('/register', Adminprotect, registeremployee);
router.get('/employees', Adminprotect, getAllEmployees);
router.get('/works/:userId', Adminprotect, getWorksById);
router.post('/', loginUser);
router.post('/me', protect, getMe);

module.exports = router;
