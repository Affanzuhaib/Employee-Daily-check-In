const express = require('express')
const router = express.Router()
const { registeremployee,
    loginUser,
    getMe,
} = require('../controller/userController')
const {protect, Adminprotect} = require('../middleware/authmiddleware')

router.post('/register',Adminprotect ,registeremployee)
router.post('/', loginUser)
router.post('/me',protect, getMe)

module.exports = router