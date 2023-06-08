const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../Model/usermodel')


const protect = asyncHandler(async(req,res,next)=>{
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token= req.headers.authorization.split(' ')[1]

            //verifytoken
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //get user from the token
            req.user = await user.findById(decoded.id).select('-password')

            next()

        }catch(error){
            console.log(error)
            return res.status(403).json({message: 'Not authorized'})
        }
    }

    if (!token){
        return res.status(403).json({message: 'Not authorized,No token'})
    }
})

const Adminprotect = asyncHandler(async(req,res,next)=>{
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token= req.headers.authorization.split(' ')[1]

            //verifytoken
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //get user from the token
            req.user = await user.findById(decoded.id).select('-password')
            console.log(req.user)
            if (req.user.role!=='Admin'){
                return res.status(403).json({message: 'Not authorized,Contact Admin'})
            }
            next()

        }catch(error){
            console.log(error)
            return res.status(403).json({message: 'Not authorized'})
        }
    }

    if (!token){
        return res.status(403).json({message: 'Not authorized,No token'})
    }
})


module.exports = {protect, Adminprotect}

