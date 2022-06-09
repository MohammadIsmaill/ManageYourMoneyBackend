const ExpressError = require("../utils/ExpressError")
const User = require('../models/User')
module.exports.isUserEmailUnique = async (req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(user){
        throw new ExpressError('Someone has registered using this email',400)
    }
    next()
}