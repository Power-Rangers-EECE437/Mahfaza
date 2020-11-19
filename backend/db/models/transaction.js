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
    note:{
        type:String
    },
    date:{
        type:Date
    },
    account:{ //I guess we can get the currency from here?
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Account'
    }
})
const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction