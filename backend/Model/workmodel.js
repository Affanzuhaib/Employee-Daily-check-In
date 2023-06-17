const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    desc: {
      type: String,
      require: [true, 'please add some description'],
    },
    task: {
      type: String,
      require: true,
      enum: ['Break', 'Meeting', 'Work'],
    },
    start_time: {
      type: String,
      require: true,
    },
    start_date: {
      type: String,
      require: true,
    },
    time_taken: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Work', WorkSchema);
