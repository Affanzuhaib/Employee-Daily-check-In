const asyncHandler = require('express-async-handler')

//@desc     Get goals
//@route    GET /api/goals
//@access   private
const getgoals = asyncHandler(async(req, res) =>{
    res.status(200).json({ message: 'get goals'})
})

//@desc     set goals
//@route    POST /api/goals
//@access   private
const setgoal = asyncHandler(async(req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'set goals'})
})

//@desc     update goal
//@route    PUT /api/goals/id
//@access   private
const updategoal = asyncHandler(async(req, res) =>{
    res.status(200).json({ message: `update goals ${req.params.id}`})
})

//@desc     delete goal
//@route    delete /api/goals/id
//@access   private
const deletegoal = asyncHandler(async(req, res) =>{
    res.status(200).json({ message: `delete goals ${req.params.id}`})
})

module.exports = {
    getgoals,setgoal,updategoal,deletegoal
}