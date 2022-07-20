const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ExpressError = require('../utils/ExpressError')

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
const authenticateUser = async (enteredPassword,realPassword)=>{
    return await bcrypt.compare(enteredPassword,realPassword)
}

const hashPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword;
}
const loginUser = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    
    if(user && authenticateUser(password,user.password)){
        return res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    
    throw new ExpressError('Invalid credentials',400)

}

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body)

    const user = new User({name,email,password:await hashPassword(password)})
    await User.init()
    await user.save()
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }

    throw new ExpressError('Error',500)
   
    
}

module.exports = {
    loginUser,
    registerUser
}