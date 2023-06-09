const asyncHandler = require('express-async-handler');

const Goal = require('../Model/workmodel');
const User = require('../Model/usermodel');

//@desc     Get goals
//@route    GET /api/goals
//@access   private
const getgoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

//@desc     set goals
//@route    POST /api/goals
//@access   private
const setgoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//@desc     update goal
//@route    PUT /api/goals/id
//@access   private
const updategoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error('user not found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedGoal);
});

//@desc     delete goal
//@route    delete /api/goals/id
//@access   private
// const deletegoal = asyncHandler(async(req, res) =>{
//     const goal = await Goal.findById(req.params.id)

//     if (!goal){
//         res.status(400)
//         throw new Error('Goal not found')
//     }

//     await goal.remove()

//     res.status(200).json({id: req.params.id })
// })

// const deletegoal = async (req, res) => {
//   // const goal = await Goal.findById(req.params.id);
//   // const user = await User.findById(req.user.id);

//   // //check for user
//   // if (!user){
//   //     res.status(401)
//   //     throw new Error('user not found')
//   // }

//   // if (goal.user.toString() !== user.id){
//   //     res.status(401)
//   //     throw new Error('User not authorized')
//   // }

//   try {
//     await Goal.findByIdAndDelete(req.params.id);
//     res.status(200).json({ id: req.params.id });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  getgoals,
  setgoal,
  updategoal,
};
