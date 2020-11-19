const mongoose = require('mongoose')
const accountSchema = mongoose.Schema({
   owner:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
   },
   balance:{
       type:Number,
       required:true

   },
   name:{
       type:String,
       required:true
   },
   currency:{
       type:String,
       required:true
   }
},{timestamps:true})
accountSchema.virtual('transactions',{
    ref:'Transaction',
    localField:'_id',
    foreignField:'owner'
})
const Account = mongoose.model('Account',accountSchema)
module.exports = Account