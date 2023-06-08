const express = require('express')
const router = express.Router()
const {getgoals,setgoal,updategoal,deletegoal} =require('../controller/controllers')

const {protect,Adminprotect} = require('../middleware/authmiddleware')

router.route('/').get(protect,getgoals).post(protect,setgoal)
router.route('/:id').delete(Adminprotect,deletegoal).put(Adminprotect,updategoal)


module.exports = router