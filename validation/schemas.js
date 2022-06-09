const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')


const extension = (joi) => ({
    type:'string',
    base:joi.string(),
    messages:{
        'string.escapeHTML':'{{#label}} must not include HTML',
    },
    rules:{
        escapeHTML:{
            validate(value,helpers){
                const clean = sanitizeHtml(value,{
                    allowedTags:[],
                    allowedAttributes:{},
                })
                if(clean !== value)
                    return helpers.error('string.escapeHTML',{value})
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension)

module.exports.debtSchema = Joi.object({
    name:Joi.string().required().escapeHTML(),
    price:Joi.string().required().escapeHTML(),
    date:Joi.string().required().escapeHTML(),
})

module.exports.earningSchema = Joi.object({
    name:Joi.string().required().escapeHTML(),
    price:Joi.string().required().escapeHTML(),
    date:Joi.string().required().escapeHTML()
})


module.exports.paymentSchema = Joi.object({
    name:Joi.string().required().escapeHTML(),
    price:Joi.string().required().escapeHTML(),
    date:Joi.string().required().escapeHTML()
})

module.exports.userSchema = Joi.object({
    name:Joi.string().escapeHTML(),
    email:Joi.string().required().escapeHTML(),
    password:Joi.string().required().escapeHTML()
})