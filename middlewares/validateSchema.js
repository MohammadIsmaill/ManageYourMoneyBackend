const {paymentSchema,debtSchema,earningSchema,userSchema} = require('../validation/schemas')
const ExpressError = require('../utils/ExpressError')


module.exports.validatePayment = (req,res,next)=>{
    const {error} = paymentSchema.validate(req.body)
    if(error){
        const msg = error.details.map((e1)=>e1.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next()
    }
}

module.exports.validateEarning = (req,res,next)=>{
    const {error} = earningSchema.validate(req.body)
    if(error){
        const msg = error.details.map((e1)=>e1.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next()
    }
}


module.exports.validateDebt = (req,res,next)=>{
    const {error} = debtSchema.validate(req.body)
    if(error){
        const msg = error.details.map((e1)=>e1.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next()
    }
}

module.exports.validateUser = (req,res,next)=>{
    const {error} = userSchema.validate(req.body)
    if(error){
        const msg = error.details.map((e1)=>e1.message).join(',')
        throw new ExpressError(msg,400)
    }else{
        next();
    }
}