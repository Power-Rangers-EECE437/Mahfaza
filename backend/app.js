const express = require('express')
const userRouter = require('./routers/user.js')
const accountRouter = require('./routers/account.js')
const transactionRouter = require('./routers/transaction.js')
const path = require('path');
const Transaction = require('./db/models/transaction.js')
const Trend = require('./db/models/trend.js')
require('./db/mongoose')
const app = express()
const host = 'localhost'
const port = 3000
const schedule = require('node-schedule')

app.use(express.json())
app.use(userRouter)
app.use(accountRouter)
app.use(transactionRouter)
app.use(express.static(path.resolve(__dirname,'..','frontend/build')));

const dailyTrend = schedule.scheduleJob({second:24}, async function(){
    try {
      const end = new Date()
      const start = new Date(end.getTime() - 60000) 
      console.log(start)
      console.log(end)
      const trends = await Transaction.find({"date":{"$gte":start,"$lte":end}})
      let sum = 0
      trends.forEach(trend=>{
        sum += trend.amount
      })
      let average = sum/trends.length
      if(average){
          const trend = new Trend({average})
          await trend.save()
      }
      else{
          const trend = new Trend({average:0})
          await trend.save()
      }
      console.log(trends)
    } catch (error) {
        console.log(error)
    } 
});

//TODO: make a directory for schedulars and send this schedular there as a fucntion
//make the correct trend api routes
app.get('/', async function(req, res) { //by default refer to login?
    if (req.header('Authorization'))
    {
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = jwt.verify(token,'signature')
        const user = await User.findOne({_id:decodedToken._id,'tokens.token':token})
        if(!user)
        { //if user is not logged in redirect to login page
            res.sendFile(path.resolve(__dirname,'..','frontend/build','index.html'));
        }
        else
        { //else redirect to dashboard
            res.sendFile(path.resolve(__dirname,'..','frontend/build','index.html'));
        }
    }
    else
    { //else redirect to sign in
        res.redirect("/login");
        // res.sendFile(path.resolve(__dirname,'..','frontend/build','index.html'));
    }

});


app.listen(port,console.log(`Listening on ${host}:${port}`))

