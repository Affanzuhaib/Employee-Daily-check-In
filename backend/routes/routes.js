const express = require('express')
const router = express.Router()
const {getgoals,setgoal,updategoal,deletegoal} =require('../controller/controllers')

router.route('/').get(getgoals).post(setgoal)
router.route('/:id').delete(deletegoal).put(updategoal)


module.exports = router