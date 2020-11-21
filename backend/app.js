const express = require('express')
const userRouter = require('./routers/user.js')
const accountRouter = require('./routers/account.js')
const transactionRouter = require('./routers/transaction.js')
const path = require('path');
require('./db/mongoose')
const app = express()
const host = 'localhost'
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(accountRouter)
app.use(transactionRouter)


app.use(express.static(path.resolve(__dirname,'..','frontend/build')));

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

