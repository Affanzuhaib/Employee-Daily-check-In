const asyncHandler = require('express-async-handler');

const Work = require('../Model/workmodel');
const User = require('../Model/usermodel');

//@desc     Get works
//@route    GET /api/works
//@access   private
const getworks = asyncHandler(async (req, res) => {
  try {
    const works = await Work.find({ user: req.user.id });

    res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ message: error || 'server error' });
  }
});

//@desc     set goals
//@route    POST /api/goals
//@access   private
const setwork = asyncHandler(async (req, res) => {
  try {
    const { desc, task, start_time, start_date, time_taken } = req.body;

    if (!desc || !task || !start_time || !start_date || !time_taken) {
      return res.status(400).json({ message: 'Please add all field' });
    }

    const work = await Work.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ message: error || 'server error' });
  }
});

//@desc     update goal
//@route    PUT /api/goals/id
//@access   private
const updatework = asyncHandler(async (req, res) => {
  try {
    const goal = await Work.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Work not found');
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedWork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc     delete goal
// @route    delete /api/goals/id
// @access   private
const deletework = asyncHandler(async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      res.status(400);
      throw new Error('Work not found');
    }

    await work.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
  getworks,
  setwork,
  updatework,
  deletework,
};
