const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
        },
        payments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Payment'
            }
        ],
        debts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Debt'
            }
        ],
        earnings:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Earning'
            }
        ]
    }
)
module.exports = mongoose.model('User',userSchema)