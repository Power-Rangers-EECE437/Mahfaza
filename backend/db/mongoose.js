const mongoose = require('mongoose')
const url = `mongodb://localhost:27017/Mahfaza`

mongoose.connect(url,
{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log(e)
})
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex',true)