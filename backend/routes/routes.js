const express = require('express');
const router = express.Router();
const { getworks, setwork, updatework, deletework } = require('../controller/controllers');

const { protect } = require('../middleware/authmiddleware');

router.route('/').get(protect, getworks).post(protect, setwork);
router.route('/:id').delete(protect,deletework).put(protect, updatework);

module.exports = router;