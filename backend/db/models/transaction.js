const mongoose = require('mongoose')
const transactionSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    categrory:{
        type:String
    },
    merchant:{
        type:String
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Account'
    }
})
const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction