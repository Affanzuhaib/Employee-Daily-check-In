const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'pleas add a name']
    },
    email:{
        type: String,
        required: [true, 'pleas add a email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'pleas add a password']
    },
    contact:{
        type: Number,
        required: [true, 'pleas add contact Number']
    },
    department:{
        type: String,
        required: [true, 'please add department']
    },
    joining_date:{
        type: String,
        required: [true, 'pleas add joining date']
    },
    role: {
        type: String,
        required: true,
        enum:["Admin","Employee"]
    },
    // name:{
    //     type: String,
    //     required: [true, 'pleas add a name']
    // }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)