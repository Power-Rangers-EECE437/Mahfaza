const mongoose = require('mongoose')
const accountScheme = mongoose.Schema({
   owner:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
   },
   balance:{
       type:Number,
       required:true

   }
},{timestamps:true})
const Account = mongoose.model('Account',accountScheme)
module.exports = Account