const mongoose = require('mongoose')
const trendSchema = new mongoose.Schema({
    average:{
        required:true,
        type:Number
    },
},{
    timestamps:true
})

const Trend = mongoose.model('Trend',trendSchema)
module.exports = Trend