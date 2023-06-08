const mongoose = require('mongoose')


const WorkSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    desc:{
        type: String,
        require: [true, 'please add some description']
    },
    task:{
        type: String,
        require: true,
        enum:["Break","Meeting","Work"]
    }
},{
    timestamps: true,
})


module.exports = mongoose.model('Goal', WorkSchema)