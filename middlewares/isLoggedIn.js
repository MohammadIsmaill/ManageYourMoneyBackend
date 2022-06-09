const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ExpressError = require('../utils/ExpressError')


module.exports.isLoggedIn = async(req,res,next)=>{
    console.log('request')
    let token


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            throw new ExpressError('Not authorized',401)
        }
    }
}