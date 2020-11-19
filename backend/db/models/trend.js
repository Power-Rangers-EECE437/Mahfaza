const mongoose = require('mongoose')
const trendSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        maxlength:120,
        trim:true
    },
    percentageChange:{ //too simplistic
        type:Number,
        required:true,
    }
})

const Trend = mongoose.model('Trend',trendSchema)
module.exports = Trend